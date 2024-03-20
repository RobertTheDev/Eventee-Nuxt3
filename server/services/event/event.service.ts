import { ObjectId } from "mongodb";
import { mongoDb } from "../../configs/mongodb";
import { CreateEventSchemaType } from "~/server/validators/event/createEvent.schema";
import { UpdateEventSchemaType } from "~/server/validators/event/updateEvent.schema";

async function createEvent(data: CreateEventSchemaType) {
    const createdEvent = await mongoDb.collection("events").insertOne(data);

    return await mongoDb.collection("events").findOne({
        _id: new ObjectId(createdEvent.insertedId),
    });
}

async function deleteEventById(params: { id: string }) {
    const { id } = params;

    return await mongoDb
        .collection("events")
        .findOneAndDelete({ _id: new ObjectId(id) });
}

async function deleteEventBySlug(params: { slug: string }) {
    const { slug } = params;

    return await mongoDb.collection("events").findOneAndDelete({ slug });
}

async function findEventById(params: { id: string }) {
    const { id } = params;

    return await mongoDb.collection("events").findOne({
        _id: new ObjectId(id),
    });
}

async function findEventBySlug(params: { slug: string }) {
    const { slug } = params;

    return await mongoDb.collection("events").findOne({
        slug,
    });
}

async function updateEventById(
    params: { id: string },
    data: UpdateEventSchemaType,
) {
    const { id } = params;

    return await mongoDb
        .collection("events")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}

async function updateEventBySlug(
    params: { slug: string },
    data: UpdateEventSchemaType,
) {
    const { slug } = params;

    return await mongoDb
        .collection("events")
        .findOneAndUpdate({ slug }, { $set: data });
}

const eventService = {
    createEvent,
    deleteEventById,
    deleteEventBySlug,
    findEventById,
    findEventBySlug,
    updateEventById,
    updateEventBySlug,
};

export default eventService;
