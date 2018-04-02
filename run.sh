# !/bin/bash

fileName='pre-commit'
filePath=".git/hooks/$fileName"
cp pre-commit "$filePath"

chmod +x "$filePath"

docker-compose down
docker image rm -f tcchelp_app
docker image rm -f tcchelp_angular
docker-compose up $1