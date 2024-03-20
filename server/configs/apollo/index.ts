import { schema } from "#graphql/schema";
import { ApolloServer } from "@apollo/server";
import eventResolvers from "../../resolvers/event.resolvers";
import userResolvers from "../../resolvers/user.resolvers";
import accountResolvers from "~/server/resolvers/account.resolvers";
import authResolvers from "~/server/resolvers/auth.resolvers";
import eventOwnerResolvers from "~/server/resolvers/eventOwner.resolvers";
import eventTicketResolvers from "~/server/resolvers/eventTicket.resolvers";
import savedEventResolvers from "~/server/resolvers/savedEvent.resolvers";
import ticketOrderResolvers from "~/server/resolvers/ticketOrder.resolvers";

const apollo = new ApolloServer({
    typeDefs: schema,
    resolvers: [
        accountResolvers,
        authResolvers,
        eventResolvers,
        eventOwnerResolvers,
        eventTicketResolvers,
        savedEventResolvers,
        ticketOrderResolvers,
        userResolvers,
    ],
});

export default apollo;
