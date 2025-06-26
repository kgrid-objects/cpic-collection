const express = require('express');
const { loadKnowledgeFunctions, loadMetadata, loadKnowledgeSet } = require('./knowledgeLoader');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const path = require('path');

const app = express();
app.use(express.json());

let knowledgeSet1 = [];
let knowledgeSet2 = [];
let knowledgeSet3 = [];

async function initialize() {
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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KnowledgeBase API',
      version: '1.0.0',
      description: 'API to run knowledge functions on input and return results',
    },
  },
  apis: ['./src/api-service.js'], // or wherever your routes are documented
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /run:
 *   post:
 *     summary: Run all knowledge set 1 functions and then set 2 functions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Hank Hill"
 *                   id:
 *                     type: string
 *                     example: "1"
 *               diplotype:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   CYP2C19: "*2/*9"
 *                   CYP2C9: ""
 *                   CYP2D6: "*3/*3"
 *                   CYP3A5: ""
 *                   HLA-B: "*1/*1"
 *                   SLCO1B1: ""
 *                   TPMT: ""
 *                   UGT1A1: "*1/*1"
 *               prescriptions:
 *                 type: string
 *                 example: "atazanavir codeine abacavir"
 *     responses:
 *       200:
 *         description: Results from knowledge functions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
app.post('/run', async (req, res) => {
  try {
    const input = req.body;
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
    res.json({
      intermediate: mergedResults,
      finalKS2: finalResultsKS2,
      finalKS3: finalResultsKS3
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Execution failed' });
  }
});


initialize().then(() => {
  app.listen(3000, () => {
    console.log('Knowledge base API running on http://localhost:3000');
  });
});