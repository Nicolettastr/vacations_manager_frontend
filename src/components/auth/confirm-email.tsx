"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

interface ConfirmEmailFormProps {
  originalEmail: string;
  onConfirm: (email: string) => void;
  onCancel: () => void;
}

export const ConfirmEmailForm: React.FC<ConfirmEmailFormProps> = ({
  originalEmail,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();

  const confirmEmailSchema = z.object({
    confirmEmail: z
      .string()
      .email(t("invalidEmail"))
      .refine((val) => val.toLowerCase() === originalEmail.toLowerCase(), {
        message: t("emailsDoNotMatch"),
      }),
  });

  const form = useForm<z.infer<typeof confirmEmailSchema>>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: {
      confirmEmail: "",
    },
  });

  const onSubmit = (values: z.infer<typeof confirmEmailSchema>) => {
    onConfirm(values.confirmEmail);
    form.reset();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl">
        <CardHeader className="text-center">
          <CardTitle>{t("confirmNewEmail")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="confirmEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex flex-col items-center justify-center w-full text-center">
                      <MailCheck className="mb-2 h-6 w-6 text-primary" />
                      <p className="text-sm">{t("confirmNewEmailMessage")}</p>
                    </FormLabel>

                    <FormControl>
                      <Input {...field} placeholder={t("confirmNewEmail")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {t("confirm")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onCancel}
                >
                  {t("cancel")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
