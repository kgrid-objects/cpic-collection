const rewire = require('rewire');
const script = rewire('../../collection/CPIC Phenytoin Rec based on CYP2C9 and HLA-B/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct phenytoin recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a intermediate/noncarrier recommendation', () => {
    inputList.CYP2C9 = {
      "diplotype":"*1/*1", "phenotype":"Intermediate metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Reduced phenytoin metabolism. Higher plasma concentrations will increase probability of toxicities");
  });

  it('Should return a intermediate/null recommendation', () => {
    inputList.CYP2C9 = {
      "diplotype":"*1/*1", "phenotype":"Intermediate metabolizer"
    };
    inputList["HLA-B"] = {};
    let result = recommendation(inputList);
    expect(result.recommendation).toEqual(undefined);
  });

  it('Should return a null/carrier recommendation', () => {
    inputList.CYP2C9 = {};
    inputList["HLA-B"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation).toEqual(undefined);
  });

  it('Should return a poor/carrier recommendation', () => {
    inputList.CYP2C9 = {
      "diplotype":"*1/*1", "phenotype":"Poor metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(
        "If patient is phenytoin naive, do not use phenytoin/fosphenytoinc");
  });

  it('Should fail if no phenotype', () => {
    inputList.CYP2C9 = {
      "diplotype":"*1/*1"
    };
    inputList["HLA-B"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.CYP2C9 = {
      "diplotype":"*1/*1", "phenotype":"Amazing metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"15:02", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    console.log(result);
    expect(result).toEqual("Incorrect/invalid input for drug Phenytoin");
  });

  it('Should fail if no HLA-B gene in list', () => {
    inputList.CYP2C9 = { "diplotype":"*1/*1", "phenotype":"Poor metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug Phenytoin");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2C9 = {
      "diplotype":"*1/*1", "phenotype":"Extensive metabolizer"
    };
    inputList["HLA-B"] = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    inputList.CYP2D6 = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(
        "Initiate therapy with recommended maintenance dose");
  });

});
