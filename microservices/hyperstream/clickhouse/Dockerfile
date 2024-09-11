
FROM --platform=$BUILDPLATFORM  golang:buster

ARG TARGETARCH

WORKDIR /app
COPY go.mod ./
COPY go.sum ./
COPY *.go ./

RUN go mod download

COPY cmd ./cmd

RUN GOOS=linux GOARCH=$TARGETARCH go build -o /go-binary  /app/cmd/main.go

CMD [ "/go-binary" ]

