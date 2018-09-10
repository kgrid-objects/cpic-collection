#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');
const fs = require('fs-extra');
const exists = require('fs').existsSync;
const csvtojson = require('csvtojson');

const genophenokolistPath = '/99999/fk4qj7sz2t/v0.0.3/genophenokolist';
const druglistPath = '/99999/fk4qj7sz2s/v0.0.3/druglist';
var host;
var filename;
var results = [];

program
  .version('0.1.0')
  .description('Use the CPIC toolkit to process panels of patient data')
  .option('-p, --pheno', 'display phenotype results only')
  .option('-r, --recs', 'display recommendation results only')
  .arguments('<dataFilename> [host]').action((fileArg, hostArg) => {
    filename = fileArg;
    host = hostArg || 'http://localhost:8082';
  }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ cpic -p panel.csv http://localhost:8081 > results.json');
    console.log('  $ cpic patient-data.csv https://kgrid-activator.herokuapp.com');
  }).parse(process.argv);

readGeneticPanelCSV(filename);

function readGeneticPanelCSV(filename) {
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

function processPatientData (data) {
  var promises = data.map(function (patientData) {

    var patient = patientData.patient;
    var patientRecommendations = [];

    // Convert the string list of prescriptions separated by spaces into an
    // object with a key for each prescription, this needs to be done
    // because the current JS adapter cannot read in arrays :(
    var drugObj = {};
    var prescriptions;
    if(patientData.prescriptions)
      patientData.prescriptions.split(' ').forEach(rx => {drugObj[rx] = true});

    // Get genotype to phenotype ko addresses, then generate phenotype panel for patient
    // then generate drug recommendations, then aggregate the results in an object
    return postJsonRequest(genophenokolistPath, patientData.diplotype)
    .then(response => generatePhentotypes(response.data.result, patientData))
    .then(phenotypePanel => generateDrugRecs(drugObj, phenotypePanel, patientRecommendations))
    .then(phenotypePanel => aggregateResults(patient, phenotypePanel, patientRecommendations))
    .catch(error => {
      if(error.response) {
        console.error(error.response.data);
      } else if (error.request) {
        console.error('Cannot connect to', error.request._currentUrl, 'check the host name or specify a host with $ cpic <dataFilename> [host]');
        process.exit(1);
      } else {
        console.error(error.message);
      }
    });
    // Todo: improve flow of above, eliminate global results variable
  });

  // Output results to standard out as an array of patient results
  Promise.all(promises).then(r => (console.log(JSON.stringify(results, null, 2))));
}

function postJsonRequest(path, data) {
  return axios({
    method: 'post',
    url: host + path,
    headers: {'Content-Type': 'application/json'},
    data: data
  });
}

function aggregateResults(patient, phenotypePanel, patientRecommendations) {
  var currentTime = new Date().toLocaleString('en-US');
  if(program.pheno) {
    patientResult = {
      "patient": patient,
      "time": currentTime,
      "phenotypes": phenotypePanel
    };
  } else if(program.recs) {
    patientResult = {
      "patient": patient,
      "time": currentTime,
      "recommendations": patientRecommendations
    };
  } else {
    patientResult = {
      "patient": patient,
      "time": currentTime,
      "phenotypes": phenotypePanel,
      "recommendations": patientRecommendations
    };
  }
  results.push(patientResult);
}

function generatePhentotypes(diplotypeObjectMap, patientData) {
  var gToPMap = diplotypeObjectMap;

  // Create an array of genotype to phenotype request promises
  var gToPPromises = Object.keys(gToPMap).map(function (key) {
    if (gToPMap[key] != '' && gToPMap[key] != null) {
      return postJsonRequest(gToPMap[key] + '/phenotype', patientData.diplotype);
    }
  }).filter(element => {return element}); // gets rid of null or undefined elements

  // Use each genotype to phenotype object to get the phenotype panel
  return axios.all(gToPPromises).then((results) => {
    var phenotypePanel = {};
    var ret = results.forEach(response => {
      var phenotype = response.data.result;
      Object.keys(phenotype).map(key => {
        phenotypePanel[key] = phenotype[key];
      });
    });
    return phenotypePanel;
  })
  .catch(error => {
    console.error(error);
  })
}

function generateDrugRecs(rxObj, phenotypePanel, patientRecommendations) {
  // Get the list of drug recommendation objects
  return postJsonRequest(druglistPath, rxObj)
  .then(response => {
    var drugMap = response.data.result;
    var drugRecPromises = [];
    // Create an array of drug recommendation request promises
    Object.keys(drugMap).forEach(drugKey => {
      if (drugMap[drugKey] != '')
        drugRecPromises.push(
            postJsonRequest(drugMap[drugKey] + '/dosingrecommendation',
                phenotypePanel));
    });
    // Use each drug recommendation object to get a recommendation
    return axios.all(drugRecPromises).then(results => {
      results.forEach(response => {
        var result = response.data.result;
        patientRecommendations.push(result);
      });
      return phenotypePanel;
    })
  }).catch(error => {
    console.error(error);
  });
}

