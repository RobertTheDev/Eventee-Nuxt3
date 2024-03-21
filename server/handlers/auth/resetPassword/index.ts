import { GraphQLArgs, GraphQLError } from "graphql";

export async function resetPassword(params: { args: GraphQLArgs }) {
    try {
        const { args } = params;

        return args;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new GraphQLError(error.message);
        }

        throw new GraphQLError("An error ocurred. Please try again");
    }
}
