# Deploy ipfs-cluster

### sharedSecret 
Generate key:

`export CLUSTER_SECRET=$(od -vN 32 -An -tx1 /dev/urandom | tr -d ' \n')`
`echo $CLUSTER_SECRET`