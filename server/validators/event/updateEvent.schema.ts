import { z, object } from "zod";

// Schema defines the fields required to update an event.
export const updateEventSchema = object({});

// Infers the schema as a TypeScipt type.
export type UpdateEventSchemaType = z.infer<typeof updateEventSchema>;
