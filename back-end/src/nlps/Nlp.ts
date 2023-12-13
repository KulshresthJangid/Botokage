import { NlpManager } from "node-nlp-typescript";

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
    protected nlpManager: NlpManager;
    protected languages: string[];

    constructor(languages: string[]) {
        // Assuming NlpManagerOptions here, adjust as needed based on library updates
        const nlpManagerOptions: NlpManagerSettings = {
            languages: languages,
        };
        this.nlpManager = new NlpManager(nlpManagerOptions);
        this.languages = languages;
    }

    async createIntent(intentName: string, utterance: string, entities?: string[]): Promise<void> {
        if (entities) {
            // Handle entities if needed
            // For example, you can loop through the entities and add them to the intent
        }

        // Adding document to the NLP manager
        await this.nlpManager.addDocument(this.languages[0], utterance, intentName);
        // Train the model after adding a document
        await this.nlpManager.train();
    }

    async createAndAddEntity(categoryName: string, entityName: string, utterances: string[]): Promise<void> {
        // Add entity to the NLP manager
        this.nlpManager.addNamedEntityText(categoryName, entityName, this.languages || [], utterances);

        // Train the model after adding entities
        await this.nlpManager.train();
    }
}

export default Nlp;