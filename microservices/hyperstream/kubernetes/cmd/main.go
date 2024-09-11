package main

import (
	"fmt"
	zmq_connector "github.com/solenopsys/sc-bl-zmq-connector"
	"io/ioutil"
	"k8s.io/client-go/rest"
	"log"
	"net/http"
)

func getProcessing(client *http.Client, config *rest.Config) func(message []byte) []byte {
	return func(message []byte) []byte {
		url := fmt.Sprintf("%s%s", config.Host, string(message))
		log.Println(url)
		resp, err := client.Get(url)
		if err != nil {
			panic(err.Error())
		}
		defer resp.Body.Close()
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}
		return body
	}
}

func processingFunction(client *http.Client, config *rest.Config) func(
	message []byte, functionId uint8) []byte {
	var functions = make(map[uint8]func(message []byte) []byte)
	functions[1] = getProcessing(client, config)
	return func(message []byte, functionId uint8) []byte {
		if executeFunction, ok := functions[functionId]; ok {
			return executeFunction(message)
		} else {
			return []byte("FUNCTION_NOT_IMPLEMENTED")
		}
	}
}

func main() {
	config, err := rest.InClusterConfig()
	if err != nil {
		panic(err.Error())
	}

	clientFor, err := rest.HTTPClientFor(config)
	if err != nil {
		panic(err.Error())
	}

	template := zmq_connector.HsTemplate{Pf: processingFunction(clientFor, config)}
	template.Init()

}
