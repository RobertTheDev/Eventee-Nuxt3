import { Resolvers } from "#graphql/resolver";
import {
    getEventBySlug,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from "../handlers/event/event.handlers";

const eventResolvers: Resolvers = {
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

export default eventResolvers;
