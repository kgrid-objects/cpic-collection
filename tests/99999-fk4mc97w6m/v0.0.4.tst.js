var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4mc97w6m/v0.0.4/model/resource/recommendation.js');

//Load in the function
var dosingrecommendation = javascript.__get__("dosingrecommendation");


var testset = [
  {"input":{"CYP2D6": "ultrarapid metabolizer"},"output":"Implications for phenotypic measures" },
  {"input":{"CYP2D6": "Normal metabolizer"},"output":"Implications for phenotypic measures" },
  {"input":{"CYP2D6": "Intermediate metabolizer"},"output":"Dosing recommendations" },
  {"input":{"CYP2D6": "Poor metabolizer"},"output":"Classification of recommendations" }
]


var result = dosingrecommendation(testset[0].input)
console.log(result)



// describe('99999-2d6codeine v0.0.1', function () {
//
//   describe('Valid inputs', function(){
//
//     testset.forEach(function(e, index){
//
//       it(e.input.CYP2D6, function(){
//         var result = dosingrecommendation(e.input)
//         assert.equal(result.Codeine[e.output]!=null, true);
//       });
//
//     })
//
//   });
//
//   describe('Invalid inputs', function(){
//
//     it('fields missing', function(){
//       var result = dosingrecommendation({})
//       assert.equal(result, 'Incorrect/invalid input.');
//     })
//
//     it('incorrect phenotype', function(){
//       var result = dosingrecommendation({"CYP2D6": "Ultrarapid mettabolizer"})
//       assert.equal(result, 'Incorrect/invalid input for phenotype.');
//     })
//
//     it('no input', function(){
//       var result = dosingrecommendation()
//       assert.equal(result.includes('Error'), true);
//     })
//
//   });
//
// });
