
import http from "k6/http";

import { check, fail } from "k6";
const params = {headers: {'Content-Type': 'application/json'}};
let hostname = __ENV.HOSTNAME === undefined ? 'localhost:8080' : __ENV.HOSTNAME
let testObjects = [
  {endpoint: "99999/fk4bz6hp15/v0.0.5/dosingrecommendation", input: {"CYP2C19": {"diplotype": "*1/*20", "phenotype": "Ultrarapid metabolizer"}}, gene:"CYP2C19", diplotype: "*1/*20", classification:"Strong"},
  {endpoint: "99999/fk4bz6hp15/v0.0.5/dosingrecommendation", input: {"CYP2C19": {"diplotype": "*1/*8", "phenotype": "Intermediate metabolizer"}}, gene:"CYP2C19", diplotype: "*1/*8", classification:"Moderate"},
  {endpoint: "99999/fk4c83hw23/v0.0.1/dosingrecommendation", input: {"CYP2D6":  {"diplotype": "*1/*3", "phenotype": "Poor metabolizer"}}, gene:"CYP2D6", diplotype: "*1/*3", classification:"No recommendation"},
  {endpoint: "/99999/fk4058s74p/v0.0.1/dosingrecommendation", input: {"HLA-B":  {"diplotype": "*58:01/*1", "phenotype": ""}}, gene:"HLA-B", diplotype: "*58:01/*1", classification:"Strong"},

]

export default function() {

  //Get test data
  let randomtestObject = testObjects[Math.floor(Math.random() * testObjects.length)];

  //construct URL
  const url = `http://${hostname}/`+randomtestObject.endpoint;

  //Call endpoint with input data
  let response = http.post(url,JSON.stringify(randomtestObject.input), params);

  //Check Response
  check(response, {
    'is status 200': (r) => r.status === 200,
    "diplotype" : (r) => JSON.parse(r.body).result.genes[randomtestObject.gene].diplotype == randomtestObject.diplotype,
    "classification": (r) => JSON.parse(r.body).result.recommendation.classification == randomtestObject.classification,
  }) || fail(r.body);

};

