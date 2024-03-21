import { GraphQLArgs, GraphQLError } from "graphql";
import { jwtSign } from "~/server/configs/auth/jwtManagement";
import { hashPassword } from "~/server/configs/auth/passwordManagement";
import { mongoDb } from "~/server/configs/mongodb";
import userService from "~/server/services/user/user.service";
import { signUpWithPasswordSchema } from "~/server/validators/auth/signUpWithPassword.schema";

export async function signUp(params: { args: GraphQLArgs }) {
    try {
        const { args } = params;

        const { findUserByEmail } = userService;

        // Step 1: Validate the args.
        const validation = await signUpWithPasswordSchema.safeParseAsync(args);

        if (!validation.success) {
            throw new Error(validation.error.errors[0].message);
        }

        const { data } = validation;

        // Step 2: Check user does not exist in the database.
        const findUser = await findUserByEmail({
            email: data.email,
        });

        if (findUser) {
            throw new Error(`A user already exists with email ${data.email}`);
        }

        // Step 3: Hash the user password.
        const hashedPassword = await hashPassword({ password: data.password });

        // Step 4: Create a user in the database.
        const signedUpUser = await mongoDb.collection("users").insertOne({
            email: data.email,
            name: data.name,
            password: hashedPassword,
        });

        // Step 5: Sign the user into a JWT.
        const token = jwtSign({ userId: signedUpUser.insertedId.toString() });

        // Step 6: Return the signed up user with the JWT token.
        const user = await mongoDb
            .collection("users")
            .findOne({ _id: signedUpUser.insertedId });

        return {
            ...user,
            token,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new GraphQLError(error.message);
        }

        throw new GraphQLError("An error ocurred. Please try again");
    }
}
