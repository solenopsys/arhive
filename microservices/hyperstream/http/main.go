package main

import (
	"bytes"
	zmq_connector "github.com/solenopsys/sc-bl-zmq-connector"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"
)

type ProcessingFunc func(client http.Client, path string, message []byte) (*http.Response, error)

func execGet(client http.Client, path string, message []byte) (*http.Response, error) {
	s := string(message)
	return client.Get(path + url.QueryEscape(s))
}

func execPost(client http.Client, path string, message []byte) (*http.Response, error) {
	contentType := os.Getenv("http.post.content-type")
	r := bytes.NewReader(message)
	return client.Post(path, contentType, r)
}

func processingFunction() func(message []byte, functionId uint8) []byte {
	host := os.Getenv("http.Host")
	port := os.Getenv("http.Port")
	uri := os.Getenv("http.URI")

	println("START CLIENT")

	path := "http://" + host + ":" + port + uri

	client := http.Client{
		Timeout: 5 * time.Second,
	}

	var functions = make(map[uint8]ProcessingFunc)
	functions[1] = execGet
	functions[2] = execPost

	return func(message []byte, functionId uint8) []byte {
		s := string(message)
		println("INPUT MESSAGE", s)

		resp, err := functions[functionId](client, path, message)

		if err != nil {
			log.Print(err)
			return []byte("ERROR_CONNECT")
		}

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Print(err)
			return []byte("ERROR_READ")
		}

		defer resp.Body.Close()

		return body
	}
}

func main() {

	template := zmq_connector.HsTemplate{Pf: processingFunction()}
	template.Init()

}
