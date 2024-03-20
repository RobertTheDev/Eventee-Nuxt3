import { z, object } from "zod";

// Schema defines the fields required to create a ticket order.
export const createTicketOrderSchema = object({});

// Infers the schema as a TypeScipt type.
export type CreateTicketOrderSchemaType = z.infer<
    typeof createTicketOrderSchema
>;
