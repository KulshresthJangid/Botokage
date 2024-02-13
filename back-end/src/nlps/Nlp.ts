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

    async createIntent(intentName: string, utterance: string, entities?: string[], categoryName?: string, answer?: string): Promise<void> {
        if (entities && categoryName) {
            await entities.forEach(el => this.createAndAddEntity(categoryName, el, [el.toLowerCase(), el]));
            console.log(`Entities added here`, entities)
        }
        if (answer) {
            console.log("inside the answers", answer);
            await this.nlpManager.addAnswer(this.languages[0], intentName, answer);
        }
        await this.nlpManager.addDocument(this.languages[0], utterance, intentName);
        await this.nlpManager.train();
        await this.nlpManager.save();
    }

    async createAndAddEntity(categoryName: string, entityName: string, utterances: string[]): Promise<void> {
        await this.nlpManager.addNamedEntityText(categoryName, entityName, this.languages || [], utterances);

        await this.nlpManager.train();
        await this.nlpManager.save();
    }

    async processText(text: string) {
        console.log("process nlp-------", await this.nlpManager.process(text));
        return await this.nlpManager.process(this.languages[0], text);
    }

    async addAnswer(answer: string, intentName: string) {
        await this.nlpManager.addAnswer(this.languages[0], intentName, answer);
        await this.nlpManager.train();
        await this.nlpManager.save();
    }
}

export default Nlp;