package main

import (
	"k8s.io/klog/v2"
	"sync"
)

type LoadPool struct {
	numWorkers int
	jobs       chan *Datasheet // jobs input stream
	results    chan *Result    // results output stream
	loader     HttpLoadJob
	saver      Saver
	gate       *Gate
	exit       bool
}

func (h *LoadPool) worker(wg *sync.WaitGroup) {
	for {
		job := <-h.jobs
		klog.Info("START LOAD: ", job)
		data, err := h.loader.Load(job.Url)
		if err != nil {
			klog.Error(err)
		}

		fileSize := len(data)
		fn, err := h.saver.Save(data)

		if err != nil {
			klog.Error(err)
		} else {
			klog.Info("SAVED TO FILE: ", fn)
		}

		h.results <- &Result{Id: job.Id, FileName: fn, FileSize: fileSize}
		if h.exit {
			break
		}
	}
	defer wg.Done()
}

func (h *LoadPool) saveResult() {
	for {
		result := <-h.results
		klog.Info("SAVE RESULT: ", result)
		err := h.gate.PostJob(result)
		if err != nil {
			klog.Error(err)
		} else {
			klog.Info("RESULT SAVED: ", result)
		}
	}
}

func (h *LoadPool) Start() {
	var wg sync.WaitGroup
	klog.Info("Start save result thread")
	go h.saveResult()

	klog.Info("Start workers: ", h.numWorkers)
	for i := 1; i <= h.numWorkers; i++ {
		wg.Add(1)
		go h.worker(&wg)
	}

	wg.Wait()

	close(h.jobs)
	close(h.results)
}
