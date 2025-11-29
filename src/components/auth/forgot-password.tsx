"use client";

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
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const setForgotPassword = useAuthStore((state) => state.setForgotPassword);
  const { mutate: forgotPasswordaLink } = useForgotPassword();

  const forgotSchema = z.object({
    email: z.string().email({ message: t("formErrors.invalidEmail") }),
  });

  const form = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof forgotSchema>) => {
    forgotPasswordaLink(values.email);
  };

  const handleCancelForgot = () => {
    setForgotPassword(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">{t("forgotPasswordTitle")}</h1>
      <p className="text-sm text-muted-foreground">
        {t("forgotPasswordDescription")}
      </p>

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

          <Button type="submit" className="w-full">
            {t("sendResetLink")}
          </Button>
          <Button
            variant={"secondary"}
            onClick={handleCancelForgot}
            type="button"
            className="w-full"
          >
            {t("cancel")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
