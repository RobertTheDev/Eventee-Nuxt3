import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";
import { jwtVerify } from "~/server/configs/auth/jwtManagement";
import { mongoDb } from "~/server/configs/mongodb";

export async function getCurrentUser(params: { token: string }) {
    try {
        const decoded = jwtVerify({ token: params.token }) as {
            data: { userId: string };
        };

        return await mongoDb.collection("users").findOne({
            _id: new ObjectId(decoded.data.userId),
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new GraphQLError(error.message);
        }

        throw new GraphQLError("An error ocurred. Please try again");
    }
}
