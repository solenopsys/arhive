#HyperStreams http adapter module for Converged

## Docker
docker build . -t registry.local/hs-http-adapter:latest
docker push registry.local/hs-http-adapter:latest

## Gen sum file
go mod tidy

## Env Vars
zmq.SocketUrl=tcp://*:5556
http.post.content-type
http.Host
http.Port
http.URI
 