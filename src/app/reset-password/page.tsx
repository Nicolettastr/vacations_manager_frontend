"use client";

import { Logo } from "@/components/icons/logo";
import IconTooltip from "@/components/icons/Tooltip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

const ResetPassword = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");

      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  const { mutate: onResetPassword } = useResetPassword();

  const resetPasswordSchema = z
    .object({
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
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (!accessToken) {
      return;
    }
    //SEND NEW PASSWORD
    onResetPassword({
      password: values.password,
      access_token: accessToken,
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const passwordsInputs = [
    {
      name: "password",
      condition: showPassword,
      handler: handleShowPassword,
    },
    {
      name: "confirmPassword",
      condition: showConfirmPassword,
      handler: handleShowConfirmPassword,
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="items-center text-center space-y-4 p-6">
          <div className="flex items-center gap-3">
            <Logo />
            <CardTitle className="text-3xl font-bold tracking-tight font-headline">
              TeamTracker
            </CardTitle>
          </div>
          <CardDescription>{t("resetPassword")}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {passwordsInputs.map((input) => {
                return (
                  <FormField
                    key={input.name}
                    control={form.control}
                    name={
                      input.name as keyof z.infer<typeof resetPasswordSchema>
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t(input.name)}</FormLabel>
                        <FormControl>
                          <div className="flex relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type={input.condition ? `text` : `password`}
                              placeholder="••••••••"
                              className="pl-10"
                              {...field}
                            />
                            {input.condition ? (
                              <IconTooltip content={t("hidePassword")}>
                                <EyeClosed
                                  onClick={input.handler}
                                  className="absolute right-2.5 top-2.5 h-5 w-5 text-muted-foreground "
                                />
                              </IconTooltip>
                            ) : (
                              <IconTooltip content={t("showPassword")}>
                                <Eye
                                  onClick={input.handler}
                                  className="absolute right-2.5 top-2.5 h-5 w-5 text-muted-foreground "
                                />
                              </IconTooltip>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
              <Button type="submit" className="w-full">
                {t("changePassword")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
