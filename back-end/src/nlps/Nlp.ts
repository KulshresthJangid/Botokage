// import { NlpManager } from "node-nlp-typescript";

const { NlpManager } = require('node-nlp');

export interface NlpManagerSettings {
    container?: any;
    languages?: string[];
    nlu?: {
        log?: boolean;
    };
    ner?: {
        useDuckling?: boolean;
        ducklingUrl?: string;
        locale?: string;
        threshold?: number;
    };
    action?: {
        [key: string]: (params: any, context: any, result: any) => Promise<void> | void;
    };
    settings?: any;
    forceNER?: boolean;
    processTransformer?: (result: any) => any;
}

class Nlp {
    protected nlpManager;
    protected languages: string[];

    constructor(languages: string[]) {
        const nlpManagerOptions: NlpManagerSettings = {
            languages: languages,
        };
        this.nlpManager = new NlpManager(nlpManagerOptions);
        this.languages = languages;
    }

    async createIntent(intentName: string, utterance: string, entities?: string[], categoryName?: string): Promise<void> {
        if (entities && categoryName) {
            await entities.forEach(el => this.createAndAddEntity(categoryName, el, [utterance]));;
        }
        await this.nlpManager.addDocument(this.languages[0], utterance, intentName);
        await this.nlpManager.train();
    }

    async createAndAddEntity(categoryName: string, entityName: string, utterances: string[]): Promise<void> {
        this.nlpManager.addNamedEntityText(categoryName, entityName, this.languages || [], utterances);

        await this.nlpManager.train();
    }
}

export default Nlp;