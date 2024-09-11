package main

import (
	"encoding/json"
	"io"
	"k8s.io/klog/v2"
	"net/http"
	"strconv"
)

type Api struct {
	storage Storage
	port    string
}

func (a *Api) Run() {

	http.HandleFunc("/job/get", a.getPageJob)
	http.HandleFunc("/job/update", a.updatePageJob)
	http.HandleFunc("/data/save", a.savePage)
	http.HandleFunc("/datasheet/get", a.getDatasheet)
	http.HandleFunc("/datasheet/update", a.updateDatasheet)

	klog.Info("Starting server on ", a.port)
	klog.Fatal(http.ListenAndServe(":"+a.port, nil))
}

func (a *Api) getPageJob(w http.ResponseWriter, r *http.Request) {
	klog.Info("Request  page job")

	job, err := a.storage.GetJob()

	if err != nil {
		klog.Error("Page job err:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	} else {
		klog.Info("Page job:", job)
		w.WriteHeader(http.StatusOK)
	}
	w.Header().Set("Content-Type", "application/json")
	klog.Info("Response:", job)
	json.NewEncoder(w).Encode(job)
}

func (a *Api) updatePageJob(w http.ResponseWriter, r *http.Request) {

	id, err := strconv.Atoi(r.URL.Query().Get("id"))
	components, err := strconv.Atoi(r.URL.Query().Get("components"))

	klog.Info("Update job:", id, components)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	err = a.storage.OccupyJob(id, components)
	if err != nil {
		klog.Error("Update job error", http.StatusInternalServerError)
		w.WriteHeader(http.StatusInternalServerError)
		return
	} else {
		klog.Error("Update job ok", id)
		w.WriteHeader(http.StatusOK)
	}
}

func (a *Api) savePage(w http.ResponseWriter, r *http.Request) {

	jobId, err := strconv.Atoi(r.URL.Query().Get("id"))

	start, err := strconv.Atoi(r.URL.Query().Get("start"))
	end, err := strconv.Atoi(r.URL.Query().Get("end"))

	klog.Info("Save data", jobId, start, end)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		klog.Error("Save data error", http.StatusInternalServerError)
		return
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		klog.Fatal(err)
	}
	a.storage.SavePage(jobId, start, end, body)
	w.WriteHeader(http.StatusOK)
}

func (a *Api) getDatasheet(w http.ResponseWriter, r *http.Request) {

	datasheet, err := a.storage.OccupyDatasheet()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(datasheet)
}

func (a *Api) updateDatasheet(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.URL.Query().Get("id"))

	fileName := r.URL.Query().Get("file_name")
	fileSize, err := strconv.Atoi(r.URL.Query().Get("file_size"))

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	a.storage.UpdateDatasheet(id, fileName, fileSize)

}
