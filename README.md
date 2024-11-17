# Subtitle Webapp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Proxy
docker run -d --name envoy -v C:\Users\menge\Desktop\envory\envoy.yaml:/etc/envoy/envoy.yaml -p 8080:8080 envoyproxy/envoy:v1.23-latest

## Proto
protoc --proto_path=./proto chat.proto --js_out=import_style=commonjs:./src/core/grpc/chat --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/core/grpc/chat
