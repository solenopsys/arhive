package main

import (
	zmq_connector "github.com/solenopsys/sc-bl-zmq-connector"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"
)

func processingFunction() func(message []byte, functionId uint8) []byte { //todo передалать на grpc или перейти на модуль посредник.
	host := os.Getenv("clickhouse.Host")
	port := os.Getenv("clickhouse.Port")
	//user :=  os.Getenv("clickhouse.User")
	//pass :=  os.Getenv("clickhouse.Password")
	println("START CLIENT")

	path := "http://" + host + ":" + port + "/?query="

	client := http.Client{
		Timeout: 5 * time.Second,
	}

	return func(message []byte, functionId uint8) []byte {
		println("INPUT MESSAGE")

		var p = string(message) + " FORMAT JSON"
		resp, err := client.Get(path + url.QueryEscape(p))
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
