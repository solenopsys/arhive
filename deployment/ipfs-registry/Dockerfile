FROM busybox

ARG TARGETARCH

RUN mkdir /nerdir


RUN if [ "$TARGETARCH" = "arm64" ]; then echo "ARM OK"; fi
RUN if [ "$TARGETARCH" = "arm64" ]; then wget https://github.com/containerd/nerdctl/releases/download/v1.2.0/nerdctl-1.2.0-linux-arm64.tar.gz ; fi
RUN if [ "$TARGETARCH" = "arm64" ]; then tar  -xvf nerdctl-1.2.0-linux-arm64.tar.gz -C /nerdir; fi

RUN if [ "$TARGETARCH" = "amd64" ]; then echo "AMD OK"; fi
RUN if [ "$TARGETARCH" = "amd64" ]; then wget https://github.com/containerd/nerdctl/releases/download/v1.2.0/nerdctl-1.2.0-linux-amd64.tar.gz ; fi
RUN if [ "$TARGETARCH" = "amd64" ]; then tar xzvf nerdctl-1.2.0-linux-amd64.tar.gz -C /nerdir; fi

ENV PATH $PATH:/nerdir
