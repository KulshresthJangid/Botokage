"use strict";
const { NlpManager } = require('node-nlp');
const dbManager = new NlpManager({ languages: ['en'] });
module.exports = dbManager;
