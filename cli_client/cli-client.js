#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');
const fs = require('fs-extra');

var host = 'http://localhost:8080';

var inputData = {
  'diplotype': {
    "CYP2D6": "*3/*3",
    "CYP2C19": "*3/*3",
    "UGT1A1": "*1/*1"
    },
    'perscriptions': {
      'Atazanavir': true,
      'Codeine': true
    }
  };


var gToPMap = {};

var phenotypePanel = {};

var gToPPromises = [];

var drugRecPromises = [];

function postJsonReq(path, data){
  return axios({
    method: 'post',
    url: host + path,
    headers: {'Content-Type': 'application/json'},
    data: data
  });
}

// Call the first genotype to phenotype ko mapping
postJsonReq('/99999/fk4qj7sz2t/v0.0.3/genophenokolist', inputData.diplotype).then(function (response) {
  gToPMap = response.data.result;
}).catch(function (error) {
  console.log(error);
}).then(function() {

  // Create an array of genotype to phenotype request promises
  Object.keys(gToPMap).forEach(function(key) {
    gToPPromises.push(postJsonReq(gToPMap[key] + '/phenotype', inputData.diplotype))
  });

  // Use each genotype to phenotype object to get the phenotype panel
  axios.all(gToPPromises).then((results) => {
    results.forEach(function (response){
      var phenotype = response.data.result;
      Object.keys(phenotype).forEach(function(key) {
        phenotypePanel[key] = phenotype[key];
      });
    });
  }).then(results => generateDrugRecs()
  ).catch(function (error) {
    console.log(error);
  })
});

function generateDrugRecs() {
  // Get the list of drug recommendation objects
  postJsonReq('/99999/fk4qj7sz2s/v0.0.3/druglist', inputData.diplotype)
  .then(function (response) {
    var drugObjects = response.data.result;

    // Create an array of drug recommendation request promises
    Object.keys(drugObjects).forEach(function (geneKey) {
      Object.keys(drugObjects[geneKey]).forEach(function (drugKey) {
        drugRecPromises.push(
            postJsonReq(drugObjects[geneKey][drugKey] + '/dosingrecommendation',
                phenotypePanel));
      });
    });

    // Use each drug recommendation object to get a recommendation
    axios.all(drugRecPromises).then(function (results) {
      results.forEach(function (response) {
        var result = response.data.result;
        console.log(result);
        fs.writeJsonSync('results.txt', result, {flag:'a'});
      });
    });
  }).catch(function (error) {
    console.log(error);
  });
}


