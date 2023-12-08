const { NlpManager } = require('node-nlp');

const dbManager = new NlpManager({ languages: ['en'] })


export default dbManager;