var assert = require('assert');
var rewire = require('rewire');

//Get load in the js
var javascript = rewire('../../99999-fk4qj7sz2t/v0.0.4/model/resource/genophenokolist');
//var javascript = rewire('../../scripts/payload.js');

//Load in the function
var genophenokolist = javascript.__get__("genophenokolist");

var testset = [
  {"input":{"CYP2D6":"*3/*3","CYP2C19":"*3/*3"},"output":{"CYP2D6":"*3/*3","CYP2C19":"*3/*3"} }
]

describe('99999-2d6genopheno/v0.0.4', function () {

  describe('Valid inputs', function(){

    testset.forEach(function(e, index){

      it('KO list', function(){
        var result = genophenokolist(e.input)
        assert.equal(result.CYP2D6!=null, true);
      });

    })


  });

});
