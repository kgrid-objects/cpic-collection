const { loadKnowledgeFunctions, loadMetadata, loadKnowledgeSet } = require('./knowledgeLoader');

const path = require('path');

let knowledgeSet1 = [];
let knowledgeSet2 = [];

async function initialize(){
  const mainMeta = await loadMetadata(path.join(path.join(__dirname, '..'), 'metadata.json'));
  const lnpwledgeSets = mainMeta['https://kgrid.org/koio#hasKnowledge']
  knowledgeSet1 = await loadKnowledgeSet(lnpwledgeSets[0]);
  knowledgeSet2 = await loadKnowledgeSet(lnpwledgeSets[1]);

  knowledgeSet1 = await loadKnowledgeFunctions(knowledgeSet1, 'phenotype');
  console.log(knowledgeSet1)
  knowledgeSet2 = await loadKnowledgeFunctions(knowledgeSet2, 'dosingrecommendation');
}

async function run(input) {

try {
    const intermediateResults = await Promise.all(
      knowledgeSet1.map(ko => ko.function(input['diplotype']))
    );
    const mergedResults = intermediateResults.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
    const finalResults = await Promise.all(
      knowledgeSet2.map(ko => ko.function(mergedResults))
    );
    return {
      intermediate: mergedResults,
      final: finalResults
    };
  } catch (err) {
    console.error(err);
    return { error: 'Execution failed' };
  }
}


module.exports = { run, initialize };