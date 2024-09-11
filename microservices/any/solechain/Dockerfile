FROM --platform=$BUILDPLATFORM  ignitehq/cli

ARG TARGETARCH

WORKDIR /home/tendermint
COPY solechain /

WORKDIR /home/tendermint/solechain

CMD [ "ignite", "chain", "serve" ]

