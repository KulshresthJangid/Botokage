import { IntentOperations } from "../enums/IntentOperations";
import Nlp from "./Nlp";

export class NlpInfo {
    public Nlp: Nlp;
    public operationType: IntentOperations | undefined;
    public operation: string | undefined;

    constructor(nlp: Nlp, operationType: IntentOperations | undefined, operation: string | undefined) {
        this.Nlp = nlp;
        if (operationType) {
            this.operationType = operationType;
        }

        if (operation) {
            this.operation = operation;
        }
    }

    public setOperationType(operationType: IntentOperations) {
        this.operationType = operationType;
    }

    public setOperation(operation: string) {
        this.operation = operation;
    }
}
