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
import { getCurrentUser, signIn, signUp } from "../handlers/auth/auth.handlers";

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
        signUp: (
            _root: unknown,
            args: { input: { email: string; name: string; password: string } },
        ) => signUp(args.input),
        signIn: (
            _root: unknown,
            args: { input: { email: string; password: string } },
        ) => signIn(args.input),
        currentUser: (_root: unknown, args, context) => {
            return context.user;
        },
    },
};

const apollo = new ApolloServer({ typeDefs: schema, resolvers });

export default startServerAndCreateH3Handler(apollo, {
    context: (event) => {
        const bearerToken = event.event.headers.get("authorization");

        if (!bearerToken) {
            return null;
        }

        const token = bearerToken.replace("Bearer ", "");

        const user = getCurrentUser({ token });

        if (!user) {
            return null;
        }

        return { user };
    },
});
