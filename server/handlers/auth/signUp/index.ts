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
