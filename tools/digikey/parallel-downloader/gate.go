package main

import (
	"encoding/json"
	"io"
	"k8s.io/klog/v2"
	"net/http"
	"strconv"
)

type Datasheet struct {
	Id  int
	Url string
}

type Result struct {
	Id       int
	FileName string
	FileSize int
}

type Gate struct {
	ApiUrl string
	Client *http.Client
}

func (g *Gate) GetJob() (*Datasheet, error) {
	getUrl := g.ApiUrl + "/datasheet/get"
	resp, err := g.Client.Get(getUrl)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	// read body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	dh := &Datasheet{}
	err = json.Unmarshal(body, dh)
	return dh, err
}

func (g *Gate) PostJob(result *Result) error {
	url := g.ApiUrl + "/datasheet/update?id=" + strconv.Itoa(result.Id) + "&file_name=" + result.FileName + "&file_size=" + strconv.Itoa(result.FileSize)
	klog.Info("Save file data: ", url)
	_, err := g.Client.Get(url)
	return err
}
