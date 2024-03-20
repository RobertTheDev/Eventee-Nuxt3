import { z, object } from "zod";

// Schema defines the fields required to update an event ticket.
export const updateEventTicketSchema = object({});

// Infers the schema as a TypeScipt type.
export type UpdateEventTicketSchemaType = z.infer<
    typeof updateEventTicketSchema
>;
