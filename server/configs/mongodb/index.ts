import { MongoClient } from "mongodb";

// Connection URL
const url = process.env.MONGODB_URI as string;
const client = new MongoClient(url);

// Database Name
const dbName = "Eventee";

export const mongoDb = client.db(dbName);
