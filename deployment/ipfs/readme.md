# Deploy ipfs-node

https://docs.ipfs.tech/how-to/run-ipfs-inside-docker/#set-up


ssh -L 5002:localhost:5001 ubuntu@remote_host

## killall
kubectl -n default delete $(kubectl get pods,services,deployments,statefulset,replicationcontrollers,jobs,cronjobs --all-namespaces | grep ipfs | awk '{print $2}')