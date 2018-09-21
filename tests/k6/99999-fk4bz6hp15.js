
import http from "k6/http";

import { check, fail } from "k6";
const params = {headers: {'Content-Type': 'application/json'}};
let hostname = __ENV.HOSTNAME === undefined ? 'localhost:8080' : __ENV.HOSTNAME
let testObjects = [
  {input: {"CYP2C19": {"diplotype": "*1/*20", "phenotype": "Ultrarapid metabolizer"}}, diplotype: "*1/*20", classification:"Strong"},
  {input: {"CYP2C19": {"diplotype": "*1/*8", "phenotype": "Intermediate metabolizer"}}, diplotype: "*1/*8", classification:"Moderate"},

]

export default function() {
  const url = `http://${hostname}/99999/fk4bz6hp15/v0.0.5/dosingrecommendation`;

  var randomtestObject = testObjects[Math.floor(Math.random() * testObjects.length)];

  let result = http.post(url,JSON.stringify(randomtestObject.input), params);


  check(http.post(url,JSON.stringify(randomtestObject.input), params), {
    'is status 200': (r) => r.status === 200,
    "diplotype *1/*20 ": (r) => JSON.parse(r.body).result.genes["CYP2C19"].diplotype == randomtestObject.diplotype,
    "classification Strong": (r) => JSON.parse(r.body).result.recommendation.classification == randomtestObject.classification,
  });

};

