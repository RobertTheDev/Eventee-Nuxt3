import { GraphQLError } from "graphql";

export async function getCurrentUser(params: { token: string }) {
    try {
        const decoded = jwtVerify({ token: params.token }) as {
            data: { userId: string };
        };

        return await mongoDb.collection("users").findOne({
            _id: new ObjectId(decoded.data.userId),
        });
    } catch (error: any) {
        throw new GraphQLError(error.message);
    }
}
