import { ObjectId } from "mongodb";
import { mongoDb } from "../../configs/mongodb";

async function createEventOwner(data: { slug: string }) {
    return await mongoDb.collection("eventOwners").insertOne({
        data,
    });
}

async function deleteEventOwnerById(params: { id: string }) {
    const { id } = params;
    return await mongoDb.collection("eventOwners").deleteOne({
        _id: new ObjectId(id),
    });
}

async function deleteEventOwnersByEventId(params: { eventId: string }) {
    const { eventId } = params;

    return await mongoDb
        .collection("eventOwners")
        .deleteMany({ eventId: new ObjectId(eventId) });
}

async function deleteEventOwnersByUserId(params: { userId: string }) {
    const { userId } = params;

    return await mongoDb
        .collection("eventOwners")
        .deleteMany({ userId: new ObjectId(userId) });
}

async function findEventOwnersByEventId(params: { eventId: string }) {
    const { eventId } = params;

    return await mongoDb
        .collection("eventOwners")
        .find({
            eventId: new ObjectId(eventId),
        })
        .toArray();
}

async function findEventOwnersByUserId(params: { userId: string }) {
    const { userId } = params;

    return await mongoDb
        .collection("eventOwners")
        .find({
            userId: new ObjectId(userId),
        })
        .toArray();
}

const eventOwnerService = {
    createEventOwner,
    deleteEventOwnerById,
    deleteEventOwnersByEventId,
    deleteEventOwnersByUserId,
    findEventOwnersByEventId,
    findEventOwnersByUserId,
};

export default eventOwnerService;
