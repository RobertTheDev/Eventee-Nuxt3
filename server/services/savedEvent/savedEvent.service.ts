import { ObjectId } from "mongodb";
import { mongoDb } from "../../configs/mongodb";

async function saveEvent(data: { eventId: string; userId: string }) {
    const { eventId, userId } = data;

    const findSavedEvent = await mongoDb.collection("savedEvents").findOne({
        eventId: new ObjectId(eventId),
        userId: new ObjectId(userId),
    });

    if (findSavedEvent) {
        return await mongoDb
            .collection("SavedEvents")
            .findOneAndDelete({ _id: new ObjectId(findSavedEvent._id) });
    }

    const createdSavedEvent = await mongoDb
        .collection("savedEvents")
        .insertOne({
            eventId: new ObjectId(eventId),
            userId: new ObjectId(userId),
        });

    return await mongoDb.collection("SavedEvents").findOne({
        _id: new ObjectId(createdSavedEvent.insertedId),
    });
}

async function findSavedEventsByUserId(params: { userId: string }) {
    const { userId } = params;

    return await mongoDb
        .collection("savedEvents")
        .find({
            userId,
        })
        .toArray();
}

const SavedEventService = {
    saveEvent,
    findSavedEventsByUserId,
};

export default SavedEventService;
