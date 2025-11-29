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
import { useAuthStore } from "@/store/useAuthStore";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mutate: register } = useRegister();
  const { mutate: login } = useLogin();
  const submitType = useRef<"login" | "register" | null>(null);
  const setForgotPassword = useAuthStore((state) => state.setForgotPassword);

  const formSchema = z.object({
    email: z.string().email({ message: t("formErrors.invalidEmail") }),
    password: z
      .string()
      .min(8, { message: t("formErrors.passwordMin") })
      .max(32, { message: t("formErrors.passwordMax") })
      .regex(new RegExp('[!@#$%^&*(),.?/":{}|<>_\\-]'), {
        message: t("formErrors.passwordSpecial"),
      })
      .regex(/[A-Z]/, { message: t("formErrors.passwordUpper") })
      .regex(/[a-z]/, { message: t("formErrors.passwordLower") })
      .regex(/\d/, { message: t("formErrors.passwordNumber") }),
  });

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
        break;
      case "register":
        register(values);
        break;
    }
  };

  const handleGoogleSignIn = () => {
    toast({
      title: t("googleSignInTitle"),
      description: t("googleSignInDescription"),
    });
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
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
                <FormLabel>{t("email")}</FormLabel>
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
                <FormLabel>{t("password")}</FormLabel>
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
          <div className="text-sm text-right">
            <Button
              variant={"ghost"}
              onClick={handleForgotPassword}
              className="text-blue-600 hover:text-blue-500 hover:underline"
              type="button"
            >
              Forgot your password?
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={() => (submitType.current = "login")}
          >
            {t("signIn")}
          </Button>
          <Button
            type="submit"
            variant={"secondary"}
            onClick={() => (submitType.current = "register")}
            className="w-full"
          >
            {t("register")}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            {t("orContinueWith")}
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
        {t("signInWithGoogle")}
      </Button>
    </div>
  );
};
