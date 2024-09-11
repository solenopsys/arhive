package main

import (
	"k8s.io/klog/v2"
	"net/http"
	"os"
	"strconv"
	"time"
)

func main() {
	jobs := make(chan *Datasheet, 100)
	results := make(chan *Result, 100)
	controllerUrl := os.Getenv("CONTROLLER_URL")
	dataDir := os.Getenv("DATA_DIR")
	threads := os.Getenv("THREADS")
	interval := os.Getenv("FEED_PAUSE")

	threadsInt, err := strconv.Atoi(threads)
	intervalInt, err := strconv.Atoi(interval)
	if err != nil {
		klog.Fatal(err)
	}
	client := &http.Client{
		Timeout: time.Second * 5, // Set a timeout of 5 seconds
	}
	gate := &Gate{ApiUrl: controllerUrl, Client: client}

	feeder := Feeder{interval: intervalInt, gate: gate, jobs: jobs}
	go feeder.Start()

	saver := &FileSaver{dataDir}
	loader := &HttpLoadJobImpl{}
	pool := LoadPool{
		numWorkers: threadsInt,
		jobs:       jobs,
		results:    results,
		loader:     loader,
		saver:      saver,
		exit:       false,
		gate:       gate,
	}

	pool.Start()

}
