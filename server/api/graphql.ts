import { Resolvers } from "#graphql/resolver";
import { schema } from "#graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";
import { mongoDb } from "../configs/mongodb";

async function getEvents() {
    try {
        return await mongoDb.collection("events").find({}).toArray();
    } catch (error) {
        console.log(error);
    }
}

const resolvers: Resolvers = {
    Query: {
        events: () => getEvents(),
    },
};

const apollo = new ApolloServer({ typeDefs: schema, resolvers });

export default startServerAndCreateH3Handler(apollo);
