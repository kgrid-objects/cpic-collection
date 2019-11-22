const rewire = require('rewire');
const script = rewire('../../collection/CPIC TPMT mercaptopurine rec/recommendation');

var recommendation = script.__get__("dosingrecommendation");

describe('Give correct mercaptopurine recommendations', () => {
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
        "Start with normal starting dose (e.g., 75mg/m2/d or 1.5mg/kg/d) and adjust"));
  });

  it('Should return an intermediate recommendation', () => {
    inputList.TPMT = {
      "diplotype":"*1/*1", "phenotype":"Intermediate metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Start with reduced doses (start at 30-70% of full dose: e.g., at 50mg/m2/d or 0.75mg/kg/d)"));
  });

  it('Should return a low recommendation', () => {
    inputList.TPMT = {
      "diplotype":"*1/*1", "phenotype":"Low metabolizer"
    };
    let result = recommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "For malignancy, start with drastically reduced doses"));
  });

  it('Should fail if no phenotype', () => {
    inputList.TPMT = { "diplotype":"*1/*1" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.TPMT = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug mercaptopurine");
  });

  it('Should fail if no TPMT gene in list', () => {
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = recommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug mercaptopurine");
  });

  it('Should ignore other gene fields', () => {
    inputList.TPMT = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    inputList.UGT1A2 = { "diplotype":"*1/*1", "phenotype":"Poor metabolizer" };
    let result = recommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Lower concentrations of TGN metabolites, higher methylTIMP, this is the \"normal\" pattern");
  });

});
