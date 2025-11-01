"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRegister } from "@/hooks/auth/useRegister";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(32, "La contraseña no puede tener más de 32 caracteres.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>_\-]/,
      "Debe contener al menos un carácter especial."
    )
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula.")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula.")
    .regex(/\d/, "Debe contener al menos un número."),
});

export const LoginForm = () => {
  const { toast } = useToast();
  const { mutate: register } = useRegister();
  const { mutate: login } = useLogin();
  const submitType = useRef<"login" | "register" | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    switch (submitType.current) {
      case "login":
        login(values);
        toast({
          title: "Sign In",
          description: "Sign in successfully",
          variant: "success",
        });
        break;
      case "register":
        register(values);
        toast({
          title: "Register",
          description: "Register successfully",
          variant: "success",
        });
        break;
    }
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Sign In Action",
      description: "Google sign-in logic would be handled here.",
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            onClick={() => (submitType.current = "login")}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            variant={"secondary"}
            onClick={() => (submitType.current = "register")}
            className="w-full"
          >
            Register
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled
      >
        <GoogleIcon className="mr-2 h-5 w-5" />
        Sign in with Google
      </Button>
    </div>
  );
};
