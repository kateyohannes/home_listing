import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userAccountForm = z.object({
    username : z.string(),
    password : z.string(),
    phoneNumber : z.string(),
});

const userProfileForm = z.object({
    profile: z.object({
        fullname : z.object({
            firstname : z.string(),
            middlename : z.string(),
            lastname : z.string()
        }),
        image : z.object({
            filename : z.string(),
            originalname : z.string(),
            mimetype : z.string(),
            url : z.string(),
            size : z.number()
        }).optional(),
        grade : z.enum(['Male', 'Female']),
        bod : z.string().datetime(),
        address : z.array(z.object({
            location : z.object({
                latitude : z.number(),
                longitude : z.number()
            }),
            kebele : z.string(),
            wereda : z.string(),
            kifleketema : z.string(),
            city : z.string()
        })).optional()
    })
});

const userUpdateForm = z.object({
    username : z.string(),
    password : z.string(),
    phoneNumber : z.string(),
    role : z.array(z.enum(['Admin', 'Customer', 'Merchant', 'Bicker'])),
    profile: z.object({
        fullname : z.object({
            firstname : z.string(),
            middlename : z.string(),
            lastname : z.string()
        }),
        image : z.object({
            filename : z.string(),
            originalname : z.string(),
            mimetype : z.string(),
            url : z.string(),
            size : z.number()
        }).optional(),
        grade : z.enum(['Male', 'Female']),
        bod : z.string().datetime(),
        address : z.array(z.object({
            location : z.object({
                latitude : z.number(),
                longitude : z.number()
            }),
            kebele : z.string(),
            wereda : z.string(),
            kifleketema : z.string(),
            city : z.string()
        })).optional()
    })
});

const userResponse = z.object({
    username : z.string(),
    password : z.string(),
    role : z.array(z.enum(['Admin', 'Customer', 'Merchant', 'Bicker'])),
    profile: z.object({
        fullname : z.object({
            firstname : z.string(),
            middlename : z.string(),
            lastname : z.string()
        }),
        image : z.object({
            filename : z.string(),
            originalname : z.string(),
            mimetype : z.string(),
            url : z.string(),
            size : z.number()
        }).optional(),
        grade : z.enum(['Male', 'Female']),
        bod : z.string().datetime(),
        address : z.array(z.object({
            location : z.object({
                latitude : z.number(),
                longitude : z.number()
            }),
            kebele : z.string(),
            wereda : z.string(),
            kifleketema : z.string(),
            city : z.string()
        })).optional()
    })
});

const userResponses = z.array(userResponse);

export type userAccountInput = z.infer<typeof userAccountForm>
export type userProfileInput = z.infer<typeof userProfileForm>
export type userUpdateInput = z.infer<typeof userUpdateForm>

export const { schemas : userSchema, $ref } = buildJsonSchemas({
    userAccountForm,
    userProfileForm,
    userUpdateForm,
    userResponse,
    userResponses

}, {
    $id : 'useSchema'
});

