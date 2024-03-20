import { Resolvers } from "#graphql/resolver";
import { signIn, signUp } from "../handlers/auths/auth.handlers";

const userResolvers: Resolvers = {
    Mutation: {
        signUp: (
            _root: unknown,
            args: { input: { email: string; name: string; password: string } },
        ) => signUp(args.input),
        signIn: (
            _root: unknown,
            args: { input: { email: string; password: string } },
        ) => signIn(args.input),
        currentUser: (_root: unknown, args, context) => {
            return context.user;
        },
    },
};

export default userResolvers;
