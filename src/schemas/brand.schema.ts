import { z } from 'zod'
import { ObjectId } from 'mongodb'

export const brandSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    brand_name : z.string(),
    made_in : z.string(),
    brand_logo : z.string().optional()
});

export type brand = z.infer<typeof brandSchema>
