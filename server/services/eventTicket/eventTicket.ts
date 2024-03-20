import { ObjectId } from "mongodb";
import { mongoDb } from "../../configs/mongodb";
import { CreateEventTicketSchemaType } from "~/server/validators/eventTicket/createEventTicket";
import { UpdateEventSchemaType } from "~/server/validators/event/updateEvent.schema";

async function createEventTicket(data: CreateEventTicketSchemaType) {
    const createdEventTicket = await mongoDb
        .collection("eventTickets")
        .insertOne(data);

    return await mongoDb.collection("eventTickets").findOne({
        _id: new ObjectId(createdEventTicket.insertedId),
    });
}

async function deleteEventTicketById(params: { id: string }) {
    const { id } = params;

    return await mongoDb
        .collection("eventTickets")
        .findOneAndDelete({ _id: new ObjectId(id) });
}

async function findEventTicketById(params: { id: string }) {
    const { id } = params;

    return await mongoDb.collection("eventTickets").findOne({
        _id: new ObjectId(id),
    });
}

async function findEventTicketsByEventId(params: { eventId: string }) {
    const { eventId } = params;

    return await mongoDb
        .collection("eventTickets")
        .find({
            eventId: new ObjectId(eventId),
        })
        .toArray();
}

async function findEventTicketsByUserId(params: { userId: string }) {
    const { userId } = params;

    return await mongoDb
        .collection("eventTickets")
        .find({
            userId: new ObjectId(userId),
        })
        .toArray();
}

async function updateEventTicketById(
    params: { id: string },
    data: UpdateEventSchemaType,
) {
    const { id } = params;

    return await mongoDb
        .collection("eventTickets")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}

const eventTicketService = {
    createEventTicket,
    deleteEventTicketById,
    findEventTicketById,
    findEventTicketsByEventId,
    findEventTicketsByUserId,
    updateEventTicketById,
};

export default eventTicketService;
