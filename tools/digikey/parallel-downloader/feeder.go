package main

import (
	"k8s.io/klog/v2"
	"time"
)

type Feeder struct {
	interval int
	gate     *Gate
	jobs     chan *Datasheet
}

func (f *Feeder) Start() {
	klog.Error("Start feeder")

	for {
		datasheet, err := f.gate.GetJob()
		if err != nil {
			klog.Error(err)
		} else {
			klog.Info("Get job: ", datasheet)
			f.jobs <- datasheet
		}

		time.Sleep(time.Duration(f.interval) * time.Millisecond)
	}
}
