import { z, object } from "zod";

// Schema defines the fields required to update a ticket order.
export const updateTicketOrderSchema = object({});

// Infers the schema as a TypeScipt type.
export type UpdateTicketOrderSchemaType = z.infer<
    typeof updateTicketOrderSchema
>;
