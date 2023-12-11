import { Db, MongoClient, MongoClientOptions } from "mongodb";



class MongoConnection {
    private client: MongoClient | null = null;
    private db: Db | null = null;

    constructor() { }

    /**
    * Connect to a MongoDB database.
    * @param uri - MongoDB connection URI.
    * @param dbName - Name of the database to connect to.
    * @param options - Optional MongoClientOptions.
    * @returns Promise<void>
    */
    async connect(uri: string, dbName: string, option?: MongoClientOptions): Promise<void> {
        try {
            this.client = new MongoClient(uri, option);
            await this.client.connect();
            this.db = this.client.db(dbName);
            console.log("MongoDB Connection acquired successFully");
        } catch (error) {
            console.error("Error while connecting to mongodb", error);
            throw error;
        }
    }

    /**
    * Get the connected MongoDB database instance.
    * @returns Db | null
    */
    getDatabase(): Db | null {
        return this.db;
    }

    /**
   * Close the MongoDB connection.
   * @returns Promise<void>
   */
    async closeConnection(): Promise<void> {
        if (this.client) {
            await this.client.close();
            console.log('MongoDB connection closed');
        }
    }

}

export default MongoConnection;