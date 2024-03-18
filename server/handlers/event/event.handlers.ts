import { GraphQLError } from "graphql";
import { mongoDb } from "~/server/configs/mongodb";

export async function createEvent(args: {
    title: string;
    imageUrl: string;
    slug: string;
}) {
    try {
        const createEvent = await mongoDb.collection("events").insertOne(args);

        return await mongoDb
            .collection("events")
            .findOne({ _id: createEvent.insertedId });
    } catch (error: any) {
        throw new GraphQLError(error.message);
    }
}

export async function deleteEvent(args: { slug: string }) {
    try {
        return await mongoDb.collection("events").findOneAndDelete({
            slug: args.slug,
        });
    } catch (error: any) {
        throw new GraphQLError(error.message);
    }
}

export async function updateEvent(
    slug: string,
    args: {
        title: string;
        imageUrl: string;
        slug: string;
    },
) {
    try {
        return await mongoDb
            .collection("events")
            .findOneAndUpdate({ slug }, { $set: args });
    } catch (error: any) {
        throw new GraphQLError(error.message);
    }
}

export async function getEvents() {
    try {
        return await mongoDb.collection("events").find({}).toArray();
    } catch (error: any) {
        throw new GraphQLError(error.message);
    }
}

export async function getEventBySlug(slug: string) {
    try {
        return await mongoDb.collection("events").findOne({ slug });
    } catch (error: any) {
        throw new GraphQLError(error.message);
    }
}
