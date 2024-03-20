import { z, object } from "zod";

// Schema defines the fields required to create an event ticket.
export const createEventTicketSchema = object({});

// Infers the schema as a TypeScipt type.
export type CreateEventTicketSchemaType = z.infer<
    typeof createEventTicketSchema
>;
