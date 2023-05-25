import { Collection, MongoClient } from "mongodb";

const URL = process.env.MONGO_URL;

export const MongoHelper = {
  client: null as MongoClient,

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(URL)
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  async getCollection(name: string): Promise<Collection> {
    if (this.client === null) {
      await this.connect();
    }

    return this.client.db().collection(name);
  }
}