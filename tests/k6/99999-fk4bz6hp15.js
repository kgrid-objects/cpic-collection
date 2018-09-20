
import http from "k6/http";

import { check } from "k6";
const params = {headers: {'Content-Type': 'application/json'}};
let hostname = __ENV.HOSTNAME === undefined ? 'localhost:8080' : __ENV.HOSTNAME


export default function() {
  const url = `http://${hostname}/99999/fk4bz6hp15/v0.0.5/dosingrecommendation`;

  let result = http.post(url, "{\"CYP2C19\": {\"diplotype\": \"*1/*20\", \"phenotype\": \"Ultrarapid metabolizer\"}}", params);

  check(result, {
    'is status 200': (r) => r.status === 200,
    "diplotype *1/*20 ": (r) => JSON.parse(r.body).result.genes["CYP2C19"].diplotype == "*1/*20",
    "classification Strong": (r) => JSON.parse(r.body).result.recommendation.classification == "Strong",

  });

   result = http.post(url,
      "{\"CYP2C19\": {\"diplotype\": \"*1/*8\", \"phenotype\": \"Intermediate metabolizer\"}}", params);
  check(result, {
    'is status 200 ': (r) => r.status === 200,
    "diplotype *1/*8 ": (r) => JSON.parse(r.body).result.genes["CYP2C19"].diplotype == "*1/*8",
    "classification Moderate": (r) => JSON.parse(r.body).result.recommendation.classification == "Moderate",

  });
};



function getFromEnv (variable, defaultValue) {
  return variable === undefined ? defaultValue : variable
}
