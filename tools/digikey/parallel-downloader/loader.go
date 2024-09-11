package main

import (
	"io"
	"net/http"
	"strings"
)

type HttpLoadJob interface {
	Load(url string) ([]byte, error)
}

type HttpLoadJobImpl struct {
}

func (h *HttpLoadJobImpl) Load(url string) ([]byte, error) {
	var goodUrl string
	if strings.HasPrefix(url, "//") {
		goodUrl = "https:" + url
	} else {
		goodUrl = url
	}
	resp, err := http.Get(goodUrl)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	// read body
	return io.ReadAll(resp.Body)
}
