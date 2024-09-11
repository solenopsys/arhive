protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto  --ts_proto_out=./ ./packages/data/fl-installer/src/proto/helm-installer/api.proto
protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto  --ts_proto_out=./ ./packages/data/fl-installer/src/proto/helm-lookup/api.proto
