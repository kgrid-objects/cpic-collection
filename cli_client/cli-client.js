#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');
const fs = require('fs-extra');
const exists = require('fs').existsSync;
const csvtojson = require('csvtojson');

program
  .version('0.1.0')
  .parse(process.argv);

var host = 'http://localhost:8080/';

// Use command cpic [path to csv file] > [output file] to run script
var filename = process.argv.slice(2)[0];
var inputData = readgeneticpanel(filename);

function processPatientData (data) {
  data.forEach(function (patientData) {

    var patient = patientData.patient;

    var timestamp = new Date().toLocaleString('en-US');
    var patientResults = [];

    var phenotypePanel = {};

    function postJsonReq(path, data) {
      return axios({
        method: 'post',
        url: host + path,
        headers: {'Content-Type': 'application/json'},
        data: data
      });
    }

    // Call the first genotype to phenotype ko mapping
    postJsonReq('/99999/fk4qj7sz2t/v0.0.3/genophenokolist', patientData.diplotype)
    .then(response => {
      var gToPMap = response.data.result;
      var gToPPromises = [];
      // Create an array of genotype to phenotype request promises
      Object.keys(gToPMap).forEach(function (key) {
        if (gToPMap[key] != '')
          gToPPromises.push(
              postJsonReq(gToPMap[key] + '/phenotype', patientData.diplotype))
      });
      // Use each genotype to phenotype object to get the phenotype panel
      axios.all(gToPPromises).then((results) => {
        results.forEach(response => {
          var phenotype = response.data.result;
          Object.keys(phenotype).forEach(key => {
            phenotypePanel[key] = phenotype[key];
          });
        });
      }).then(results => generateDrugRecs())
      .catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    });

    function generateDrugRecs() {
      // Convert the string list of prescriptions separated by spaces into an
      // object with a key for each prescription, this needs to be done
      // because the current JS adapter cannot read in arrays :(
      var prescriptions = patientData.prescriptions.split(' ');
      var rxObj = {};
      prescriptions.forEach(rx => {rxObj[rx] = true})

      // Get the list of drug recommendation objects
      postJsonReq('/99999/fk4qj7sz2s/v0.0.3/druglist',
          rxObj)
      .then(response => {
        var drugMap = response.data.result;
        var drugRecPromises = [];
        // Create an array of drug recommendation request promises
        Object.keys(drugMap).forEach(drugKey => {
          if (drugMap[drugKey] != '' && drugMap[drugKey] != null)
            drugRecPromises.push(
                postJsonReq(drugMap[drugKey] + '/dosingrecommendation',
                    phenotypePanel));
        });

        // Use each drug recommendation object to get a recommendation
        axios.all(drugRecPromises).then(results => {
          results.forEach(response => {
            var result = response.data.result;
            patientResults.push(result);
          });
        }).then(result => printResults());
      }).catch(error => {
        console.error(error);
      });
    }

    function printResults() {
      var patientResult = {
        "patient": patient,
        "time": timestamp,
        "results": patientResults
      };
      // Outputs to std out
      console.log(JSON.stringify(patientResult));

      // fs.writeJsonSync('results.txt', patientResult, {flag: 'a'});
    }

  });
}

function readgeneticpanel(filename) {
  if (exists(filename)) {
    csvtojson()
    .fromFile('panel.csv')
    .then(json => {
      processPatientData(json);
    });
  } else {
    console.error('Cannot find input file ', filename)
  }
}
