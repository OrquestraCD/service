// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT

const asyncMiddleware = require('../middleware/asyncMiddleware');
const router = require('express').Router();
const minimatch = require('minimatch');
const utils = require('../lib/utils');
const bodyParser = require('body-parser');

// Gets a given harvested file
router.get('/:type/:provider/:namespace/:name/:revision/:tool/:toolVersion', asyncMiddleware(async (request, response) => {
  const packageCoordinates = utils.toPackageCoordinates(request);
  switch ((request.query.form || 'summary').toLowerCase()) {
    case 'streamed':
    case 'raw': {
      const result = await harvestStore.get(packageCoordinates, response);
      // some harvest services will stream on the response and trigger sending
      return response.headersSent ? null : response.status(200).send(result);
    }
    case 'summary': {
      const raw = await harvestStore.get(packageCoordinates);
      const filter = await getFilter(packageCoordinates);
      const result = await summarizeService.summarize(packageCoordinates, filter, raw);
      return response.status(200).send(result);
    }
    case 'list':
      const result = await harvestStore.list(request.path);
      response.status(200).send(result);
    default:
      throw new Error(`Invalid request form: ${request.query.form}`);
  }
}));

async function getFilter(packageCoordinates) {
  try {
    const descriptionCoordinates = { ...packageCoordinates, tool: 'clearlydescribed' };
    const rawDescription = await harvestStore.get(descriptionCoordinates);
    return buildFilter(rawDescription.dimensions);
  } catch (error) {
    return null;
  }
}

function buildFilter(dimensions) {
  if (!dimensions)
    return null;
  const list = [...dimensions.test, ...dimensions.dev, ...dimensions.data];
  return file => !list.some(filter => minimatch(file, filter));
}

// Gets ALL the harvested data for a given component revision
router.get('/:type/:provider/:namespace/:name/:revision', asyncMiddleware(async (request, response) => {
  const packageCoordinates = utils.toPackageCoordinates(request);
  switch ((request.query.form || 'summary').toLowerCase()) {
    case 'streamed':
    case 'raw':
      const result = await harvestStore.getAll(packageCoordinates);
      return response.status(200).send(result);
    case 'summary':
      const raw = await harvestStore.getAll(packageCoordinates);
      const filter = await getFilter(packageCoordinates);
      const summarized = await summarizeService.summarizeAll(packageCoordinates, filter, raw);
      response.status(200).send(summarized);
    case 'list':
      const list = await harvestStore.list(request.path);
      response.status(200).send(list);
    default:
      throw new Error(`Invalid request form: ${request.query.form}`);
  }
}));

// Get a list of the harvested data that we have that matches the url as a prefix
router.get('/:type?/:provider?/:namespace?/:name?/:revision?/:tool?', asyncMiddleware(async (request, response) => {
  if (request.query.form.toLowerCase() === 'list') {
    const result = await harvestStore.list(request.path);
    return esponse.status(200).send(result);
  }
  throw new Error(`Invalid request form: ${request.query.form}`);
}));

// Puts harvested file
router.put('/:type/:provider/:namespace/:name/:revision/:tool/:toolVersion?', asyncMiddleware(async (request, response) => {
  const packageCoordinates = utils.toPackageCoordinates(request);
  await harvestStore.store(packageCoordinates, request);
  response.sendStatus(201);
}));

// Post a component to be harvested
// TODO not sure this is needed or needed in this form...
router.post('/', bodyParser.json(), asyncMiddleware(async (request, response) => {
  const result = await harvestService.harvest(request.body);
  response.status(201).send(Object.assign(request.body, { build: { id: result.id } }));
}));

let harvestService;
let harvestStore;
let summarizeService;

function setup(harvester, store, summarizer) {
  harvestService = harvester;
  harvestStore = store;
  summarizeService = summarizer;
  return router;
}

module.exports = setup;