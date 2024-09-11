# Deploy solenopsys spn

### Build image inside kubernetes

kubectl apply -f build/build.yaml

### Build



nerdctl build --platform=amd64  --progress=plain --output type=image,name=registry.solenopsys.org/dp-solechain-spn:latest,push=t
rue .

