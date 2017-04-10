#!/bin/bash

RED='\033[0;31m'
BLUE='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'


echo "${BLUE}GET shelf${NC}"

curl -X GET -H "Content-Type: application/json" -H "Authorization: Basic Z3FtZW5nOlNoOTQyNg==" -H "Cache-Control: no-cache" -H "Postman-Token: 056a3a70-b6cf-ac8e-da17-b27e1c59a2b1" "http://kgrid.med.umich.edu/stack/shelf/" > /dev/null


echo ""
echo "${GREEN}Got shelf${NC}"

echo""
echo "${BLUE}Putting Simvastatin guideline object on shelf${NC}"

curl -X PUT -H "Content-Type: text/plain" -H "Cache-Control: no-cache" -H "Postman-Token: be6953cb-cdeb-e14f-a6db-ff3e9c35a67f" "http://kgrid.med.umich.edu/stack/shelf/ark:/99999/fk4th8sn52"

echo ""
echo "${GREEN}PUT successful${NC}"

echo ""
echo "${BLUE}POST Simvstatin result${NC}"

curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 302a81d8-b9de-e1e7-e0c9-139d5d893d1b" -d '{
	"allele1": "*10", "allele2": "*15"
}' "http://kgrid.med.umich.edu/stack/knowledgeObject/ark:/99999/fk4th8sn52/result" | python -m json.tool

echo ""
echo "${GREEN}POST successful${NC}"

echo ""
echo "${BLUE}PUT CYP2D6 guideline object on shelf${NC}"

curl -X PUT -H "Content-Type: text/plain" -H "Cache-Control: no-cache" -H "Postman-Token: a40f660c-c5bf-3991-a1c8-308d1488c3f7" "http://kgrid.med.umich.edu/stack/shelf/ark:/99999/fk4sn0g47p"

echo ""
echo "${GREEN}PUT successful${NC}"

echo ""
echo "${BLUE}POST CYP2D6 object result${NC}"

curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 744d873a-5c4c-8fa3-eb90-6f81c9658ee3" -d '{
	"allele1": "*1", "allele2": "*1xN"
}' "http://kgrid.med.umich.edu/stack/knowledgeObject/ark:/99999/fk4sn0g47p/result" | python -m json.tool

echo ""
echo "${GREEN}POST successful${NC}"
