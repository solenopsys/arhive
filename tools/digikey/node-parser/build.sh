#!/bin/sh

build_push(){
  cd exim
  nerdctl build --platform=${ARCHS} --output type=image,name=${REGISTRY}/${NAME}:latest,push=true .
}

REGISTRY=registry.solenopsys.org
NAME=digikey-parser
ARCHS="amd64"
