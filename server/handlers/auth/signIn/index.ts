import { GraphQLArgs, GraphQLError } from "graphql";
import CustomError from "~/interfaces/CustomError";
import { jwtSign } from "~/server/configs/auth/jwtManagement";
import { verifyPassword } from "~/server/configs/auth/passwordManagement";
import userService from "~/server/services/user/user.service";
import { signInWithPasswordSchema } from "~/server/validators/auth/signInWithPassword.schema";

export async function signIn(params: { args: GraphQLArgs }) {
    try {
        const { args } = params;

        const { findUserByEmail } = userService;

        // Step 1: Validate the args.
        const validation = await signInWithPasswordSchema.safeParseAsync(args);

        if (!validation.success) {
            throw new GraphQLError(validation.error.errors[0].message);
        }

        const { data } = validation;

        // Step 2: Check user does not exist in the database.
        const findUser = await findUserByEmail({ email: data.email });

        if (!findUser) {
            throw new GraphQLError(`No user found with email ${data.email}`);
        }

        // Step 3: Check password is correct.
        const checkPassword = await verifyPassword({
            password: data.password,
            hashedPassword: findUser.password,
        });

        if (!checkPassword) {
            throw new GraphQLError("Password is incorrect");
        }

        // Step 4:  Sign the user into a JWT.
        const token = jwtSign({ userId: findUser._id.toString() });

        // Step 5: Return the signed up user with the JWT token.
        return {
            ...findUser,
            token,
        };
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            throw new GraphQLError(error.message);
        }

        throw new GraphQLError("Internal server error");
    }
}
