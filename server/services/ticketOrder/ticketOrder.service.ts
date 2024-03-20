import { ObjectId } from "mongodb";
import { mongoDb } from "../../configs/mongodb";
import { CreateTicketOrderSchemaType } from "~/server/validators/ticketOrder/createTicketOrder.schema";
import { UpdateTicketOrderSchemaType } from "~/server/validators/ticketOrder/updateTicketOrder.schema";

async function createTicketOrder(data: CreateTicketOrderSchemaType) {
    const createdTicketOrder = await mongoDb
        .collection("ticketOrders")
        .insertOne(data);

    return await mongoDb.collection("ticketOrders").findOne({
        _id: new ObjectId(createdTicketOrder.insertedId),
    });
}

async function deleteTicketOrderById(params: { id: string }) {
    const { id } = params;

    return await mongoDb
        .collection("ticketOrders")
        .findOneAndDelete({ _id: new ObjectId(id) });
}

async function findTicketOrderById(params: { id: string }) {
    const { id } = params;

    return await mongoDb.collection("ticketOrders").findOne({
        _id: new ObjectId(id),
    });
}

async function findTicketOrdersByEventTicketId(params: {
    eventTicketId: string;
}) {
    const { eventTicketId } = params;

    return await mongoDb
        .collection("ticketOrders")
        .find({
            eventTicketId: new ObjectId(eventTicketId),
        })
        .toArray();
}

async function findTicketOrdersByUserId(params: { userId: string }) {
    const { userId } = params;

    return await mongoDb
        .collection("ticketOrders")
        .find({
            userId: new ObjectId(userId),
        })
        .toArray();
}

async function updateTicketOrderById(
    params: { id: string },
    data: UpdateTicketOrderSchemaType,
) {
    const { id } = params;

    return await mongoDb
        .collection("ticketOrders")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}

const ticketOrderService = {
    createTicketOrder,
    deleteTicketOrderById,
    findTicketOrderById,
    findTicketOrdersByEventTicketId,
    findTicketOrdersByUserId,
    updateTicketOrderById,
};

export default ticketOrderService;
