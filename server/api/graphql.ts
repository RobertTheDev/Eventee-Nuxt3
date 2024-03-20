import { schema } from "#graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateH3Handler } from "@as-integrations/h3";
import { getCurrentUser } from "../handlers/auth/auth.handlers";
import eventResolvers from "../resolvers/event.resolvers";
import userResolvers from "../resolvers/user.resolvers";

const apollo = new ApolloServer({
    typeDefs: schema,
    resolvers: [eventResolvers, userResolvers],
});

export default startServerAndCreateH3Handler(apollo, {
    context: (event) => {
        const bearerToken = event.event.headers.get("authorization");

        if (!bearerToken) {
            return null;
        }

        const token = bearerToken.replace("Bearer ", "");

        const user = getCurrentUser({ token });

        if (!user) {
            return null;
        }

        return { user };
    },
});
