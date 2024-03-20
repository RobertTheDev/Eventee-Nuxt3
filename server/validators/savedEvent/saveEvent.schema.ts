import { z, object, string } from "zod";

// Schema defines the fields required to save an event.
export const saveEventSchema = object({
    eventId: string({
        invalid_type_error: "Event ID must be of type string",
        required_error: "Event ID is required",
    }).min(1, { message: "Event ID is required" }),
});

// Infers the schema as a TypeScipt type.
export type SaveEventSchemaType = z.infer<typeof saveEventSchema>;
