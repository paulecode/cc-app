"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginFormSchema } from "../validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/actions/auth/login";
import { useActionState } from "react";
import { useFormState } from "react-dom";

export function LoginForm() {
  const defaultValues = {
    username: "",
    password: "",
  };

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const [state, formAction, pending] = useFormState(loginAction, null);
  // function onSubmit(values: z.infer<typeof loginFormSchema>) {
  //   console.log(values);
  // }
  //
  // TODO Ensure proper validation and server side error handling

  return (
    <div>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          action={formAction}
        >
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="paulecode" required {...field} />
                </FormControl>
                <FormDescription>Your username</FormDescription>
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
  );
}
