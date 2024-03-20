import { z, object } from "zod";

// Schema defines the fields required to create an event.
export const createEventSchema = object({});

// Infers the schema as a TypeScipt type.
export type CreateEventSchemaType = z.infer<typeof createEventSchema>;
