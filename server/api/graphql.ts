import { Resolvers } from "#graphql/resolver";
import { schema } from "#graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";
import {
    getEventBySlug,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from "../handlers/event/event.handlers";

const resolvers: Resolvers = {
    Query: {
        event: (_root: unknown, args: { slug: string }) =>
            getEventBySlug(args.slug),
        events: () => getEvents(),
    },
    Mutation: {
        createEvent: (
            _root: unknown,
            args: { input: { title: string; imageUrl: string; slug: string } },
        ) => createEvent(args.input),
        deleteEvent: (_root: unknown, args) => deleteEvent(args),
        updateEvent: (
            _root: unknown,
            args: {
                slug: string;
                input: { title: string; imageUrl: string; slug: string };
            },
        ) => updateEvent(args.slug, args.input),
    },
};

const apollo = new ApolloServer({ typeDefs: schema, resolvers });

export default startServerAndCreateH3Handler(apollo);
