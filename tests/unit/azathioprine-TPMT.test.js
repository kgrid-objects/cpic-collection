const rewire = require('rewire');
const script = rewire('../../collection/CPICRec_azathioprine_TPMT/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct azathioprine recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a normal recommendation', () => {
    inputList.TPMT = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Start with normal starting dose (e.g., 2-3mg/kg/d) and adjust"));
  });

  it('Should return an intermediate recommendation', () => {
    inputList.TPMT = {
      "diplotype":"*1/*1", "phenotype":"Intermediate metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "If disease treatment normally starts at the “full dose”,"));
  });

  it('Should return a low recommendation', () => {
    inputList.TPMT = {
      "diplotype":"*1/*1", "phenotype":"Low metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Consider alternative agents. If using azathioprine start with"));
  });

  it('Should fail if no phenotype', () => {
    inputList.TPMT = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.TPMT = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug azathioprine");
  });

  it('Should fail if no TPMT gene in list', () => {
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug azathioprine");
  });

  it('Should ignore other gene fields', () => {
    inputList.TPMT = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Poor metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "");
  });

});
