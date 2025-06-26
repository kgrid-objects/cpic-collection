const { loadKnowledgeFunctions, loadMetadata, loadKnowledgeSet } = require('./knowledgeLoader');

const path = require('path');

let knowledgeSet1 = [];
let knowledgeSet2 = [];

async function initialize(){
  const mainMeta = await loadMetadata(path.join(path.join(__dirname, '..'), 'metadata.json'));
  const knowledgeSets = mainMeta['https://kgrid.org/koio#hasKnowledge']
  
  console.log("loading knowledgeSet 1")
  knowledgeSet1 = await loadKnowledgeSet(knowledgeSets[0]);
  knowledgeSet1 = await loadKnowledgeFunctions(knowledgeSet1, 'phenotype');
  console.log(knowledgeSet1)
 
  console.log("loading knowledgeSet 2")
  knowledgeSet2 = await loadKnowledgeSet(knowledgeSets[1]);
  knowledgeSet2 = await loadKnowledgeFunctions(knowledgeSet2, 'dosingrecommendation');
  console.log(knowledgeSet2)

  console.log("loading knowledgeSet 3")
  knowledgeSet3 = await loadKnowledgeSet(knowledgeSets[2]); 
  knowledgeSet3 = await loadKnowledgeFunctions(knowledgeSet3, 'dosingrecommendation');
  console.log(knowledgeSet3)
}

async function run(input) {

try {
    const intermediateResults = await Promise.all(
      knowledgeSet1.map(ko => ko.function(input['diplotype']))
    );
    const mergedResults = intermediateResults.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
    const finalResultsKS2 = await Promise.all(
      knowledgeSet2.map(ko => ko.function(mergedResults))
    );

    const finalResultsKS3 = await Promise.all(
      knowledgeSet3.map(ko => ko.function(mergedResults))
    );
    return {
      intermediate: mergedResults,
      finalKS2: finalResultsKS2,
      finalKS3: finalResultsKS3
    };
  } catch (err) {
    console.error(err);
    return { error: 'Execution failed' };
  }
}


module.exports = { run, initialize };