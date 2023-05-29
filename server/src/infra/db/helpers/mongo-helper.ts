import { config } from "dotenv";
import { MongoClient } from "mongodb";
import mongoose, { Collection } from "mongoose";

config();

const URL = process.env.MONGO_URL || "mongodb://localhost:27017/users-db";

export const MongoHelper = {
  client: null as MongoClient,

  async connect(): Promise<void> {
    this.client = await mongoose.connect(URL)
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