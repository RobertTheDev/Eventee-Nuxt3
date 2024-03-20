import { Resolvers } from "#graphql/resolver";
import { signIn } from "../handlers/auth/signIn";
import { signUp } from "../handlers/auth/signUp";
import { SignInWithPasswordSchemaType } from "../validators/auth/signInWithPassword.schema";
import { SignUpWithPasswordSchemaType } from "../validators/auth/signUpWithPassword.schema";

const authResolvers: Resolvers = {
    Mutation: {
        signUp: (
            _root: unknown,
            args: { input: SignUpWithPasswordSchemaType },
        ) => signUp(args.input),
        signIn: (
            _root: unknown,
            args: { input: SignInWithPasswordSchemaType },
        ) => signIn(args.input),
        currentUser: (_root: unknown, _args, context) => {
            return context.user;
        },
    },
};

export default authResolvers;
