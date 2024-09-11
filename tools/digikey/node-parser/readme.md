
# Build
nerdctl build --output type=image,name=registry.solenopsys.org/digikey-parser:latest,push=true .

# Run
kubectl create -f job.yaml

# Run locally
node --require ts-node/register src/index.ts

# Run EKS
aws ecs register-task-definition --family digikey-parser --cli-input-json file://eks-instanse.json


