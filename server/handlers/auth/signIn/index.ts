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
