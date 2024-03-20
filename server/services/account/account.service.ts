import { ObjectId } from "mongodb";
import { mongoDb } from "../../configs/mongodb";
import { ChangeEmailSchemaType } from "~/server/validators/account/changeEmail.schema";
import { ChangePasswordSchemaType } from "~/server/validators/account/changePassword.schema";

async function changeEmail(
    params: { id: string },
    data: ChangeEmailSchemaType,
) {
    const { id } = params;

    return await mongoDb
        .collection("users")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}

async function changePassword(
    params: { id: string },
    data: ChangePasswordSchemaType,
) {
    const { id } = params;

    return await mongoDb
        .collection("users")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}

async function closeAccount(params: { id: string }) {
    const { id } = params;

    return await mongoDb
        .collection("users")
        .findOneAndDelete({ _id: new ObjectId(id) });
}

const accountService = {
    changeEmail,
    changePassword,
    closeAccount,
};

export default accountService;
