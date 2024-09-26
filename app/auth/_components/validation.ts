import { z } from 'zod'
const registerFormSchema = z.object({
    username: z
        .string()
        .min(4, { message: 'Minimum 4 characters required' })
        .max(12, { message: 'Maximum 12 characters allowed' }),
    password: z
        .string()
        .min(4, { message: 'Your password needs at least 4 characters' })
        .max(12, {
            message: 'Your password cannot be longer than 12 characters',
        }),
})

const loginFormSchema = z.object({
    username: z.string().min(4).max(8),
    password: z.string().min(4).max(8),
})

export { registerFormSchema, loginFormSchema }
