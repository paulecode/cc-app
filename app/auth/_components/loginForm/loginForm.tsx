'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginFormSchema } from '../validation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginAction } from '@/actions/auth/login'
import { useFormState } from 'react-dom'

export function LoginForm() {
    const defaultValues = {
        username: '',
        password: '',
    }

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues,
    })

    const [state, formAction] = useFormState(loginAction, null)

    return (
        <div>
            <Form {...form}>
                <form action={formAction} className="flex flex-col gap-4">
                    <FormField
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="paulecode"
                                        required
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="********"
                                        type="password"
                                        required
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {state}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
