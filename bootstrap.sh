#!/bin/bash

docker run --name=redis -d redis

docker run --name=mongo -d mongo

docker run -it -d \
          --name=node-test \
          -p 8088:80 \
          -v /Users/wangchao/Documents/GitHub/Backend:/root/ \
          --link redis \
          --link mongo \
          node
