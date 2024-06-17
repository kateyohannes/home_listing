
import { z } from "zod";

export const authSchema = z.object({
    username : z.string(),
    password : z.string()
});

export type auth = z.infer<typeof authSchema>