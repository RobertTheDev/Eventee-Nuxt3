import { z, object } from "zod";

// Schema defines the fields required to delete an event.
export const deleteEventSchema = object({});

// Infers the schema as a TypeScipt type.
export type DeleteEventSchemaType = z.infer<typeof deleteEventSchema>;
