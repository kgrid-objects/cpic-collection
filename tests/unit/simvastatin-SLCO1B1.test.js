const rewire = require('rewire');
const script = rewire('../../collection/CPIC SLCO1B1 simvastatin/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct simvastatin recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a normal recommendation', () => {
    inputList.SLCO1B1 = {
      "diplotype":"*1/*1", "phenotype":"Normal function"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Normal myopathy risk");
  });

  it('Should return an intermediate recommendation', () => {
    inputList.SLCO1B1 = {
      "diplotype":"*1/*1", "phenotype":"Intermediate function"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Intermediate myopathy risk");
  });

  it('Should return a low recommendation', () => {
    inputList.SLCO1B1 = {
      "diplotype":"*1/*1", "phenotype":"Low function"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "High myopathy risk");
  });

  it('Should fail if no phenotype', () => {
    inputList.SLCO1B1 = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.SLCO1B1 = { "diplotype":"*1/*1", "phenotype":"Amazing function" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug simvastatin");
  });

  it('Should fail if no SLCO1B1 gene in list', () => {
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Amazing function" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug simvastatin");
  });

  it('Should ignore other gene fields', () => {
    inputList.SLCO1B1 = { "diplotype":"*1/*1", "phenotype":"Normal function" };
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Poor function" };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Normal myopathy risk");
  });

});
