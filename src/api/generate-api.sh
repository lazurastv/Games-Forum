#!/bin/sh

curl --output openapi.yaml https://forum-graczy.azurewebsites.net/v3/api-docs.yaml
res=$?

if (( $res == 7 ))
then
	echo "Włącz api (backend)"
	exit 1
fi

openapi-generator-cli version
res=$?

if (( $res == 127 ))
then
	echo Nie wykryto generatora klienta, instaluję...
	npm install @openapitools/openapi-generator-cli -g
	openapi-generator-cli version
fi

openapi-generator-cli generate -i openapi.yaml -g typescript-fetch -o api
cp runtime.ts api
rm openapi.yaml
echo Generacja klienta zakończona pomyślnie
exit 0