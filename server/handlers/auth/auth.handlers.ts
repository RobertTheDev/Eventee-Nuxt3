import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";
import { jwtSign, jwtVerify } from "~/server/configs/auth/jwtManagement";
import {
    hashPassword,
    verifyPassword,
} from "~/server/configs/auth/passwordManagement";
import { mongoDb } from "~/server/configs/mongodb";

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

export async function signUp(args: {
    email: string;
    name: string;
    password: string;
}) {
    try {
        const hashedPassword = await hashPassword({ password: args.password });

        const signedUpUser = await mongoDb.collection("users").insertOne({
            email: args.email,
            name: args.name,
            password: hashedPassword,
        });

        const token = jwtSign({ userId: signedUpUser.insertedId.toString() });

        const user = await mongoDb
            .collection("users")
            .findOne({ _id: signedUpUser.insertedId });

        return {
            ...user,
            token,
        };
    } catch (error: any) {
        throw new GraphQLError(error.message);
    }
}

export async function signIn(args: { email: string; password: string }) {
    try {
        const user = await mongoDb.collection("users").findOne({
            email: args.email,
        });

        if (!user) {
            throw new GraphQLError(`No user found with email ${args.email}`);
        }

        const checkPassword = await verifyPassword({
            password: args.password,
            hashedPassword: user.password,
        });

        if (!checkPassword) {
            throw new GraphQLError("Password is incorrect");
        }

        const token = jwtSign({ userId: user._id.toString() });

        return {
            ...user,
            token,
        };
    } catch (error: any) {
        throw new GraphQLError(error.message);
    }
}
