const express = require('express');
const { loadKnowledgeFunctions, loadMetadata, loadKnowledgeSet } = require('./knowledgeLoader');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const path = require('path');

const app = express();
app.use(express.json());

let knowledgeSet1 = [];
let knowledgeSet2 = [];

async function initialize() {
  const mainMeta = await loadMetadata('metadata.json');
  const lnpwledgeSets = mainMeta['https://kgrid.org/koio#hasKnowledge']
  knowledgeSet1 = await loadKnowledgeSet(lnpwledgeSets[0]);
  knowledgeSet2 = await loadKnowledgeSet(lnpwledgeSets[1]);

  knowledgeSet1 = await loadKnowledgeFunctions(knowledgeSet1, 'phenotype');
  console.log(knowledgeSet1)
  knowledgeSet2 = await loadKnowledgeFunctions(knowledgeSet2, 'dosingrecommendation');
  //console.log(knowledgeSet2)
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
  apis: ['./src/service.js'], // or wherever your routes are documented
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
 *               diplotype:
 *                 type: string
 *                 example: "*1/*2"
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
    const finalResults = await Promise.all(
      knowledgeSet2.map(ko => ko.function(mergedResults))
    );
    res.json({
      intermediate: mergedResults,
      final: finalResults
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