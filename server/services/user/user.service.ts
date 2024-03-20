import { ObjectId } from "mongodb";
import { mongoDb } from "../../configs/mongodb";

async function createUser(data: { email: string }) {
    const createdUser = await mongoDb.collection("users").insertOne(data);

    return await mongoDb.collection("users").findOne({
        _id: new ObjectId(createdUser.insertedId),
    });
}

async function deleteUserById(params: { id: string }) {
    const { id } = params;

    return await mongoDb
        .collection("users")
        .findOneAndDelete({ _id: new ObjectId(id) });
}

async function findUserByEmail(params: { email: string }) {
    const { email } = params;

    return await mongoDb.collection("users").findOne({
        email,
    });
}

async function findUserById(params: { id: string }) {
    const { id } = params;

    return await mongoDb.collection("users").findOne({
        _id: new ObjectId(id),
    });
}

async function updateUserById(params: { id: string }, data: { email: string }) {
    const { id } = params;

    return await mongoDb
        .collection("users")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}

const userService = {
    createUser,
    deleteUserById,
    findUserByEmail,
    findUserById,
    updateUserById,
};

export default userService;
