import { useChangePassword } from "@/hooks/auth/useChangePassword";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import z from "zod";
import IconTooltip from "../icons/Tooltip";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { InfoModal } from "./info-modal";

interface IResetPassword {
  advancedSettings?: boolean;
  handleCancel?: () => void;
  handleLogout: () => void;
}

export const ResetPasswordCard: React.FC<IResetPassword> = ({
  advancedSettings,
  handleCancel,
  handleLogout,
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

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
  const { mutate: onChangePassword } = useChangePassword(handleLogout);

  const resetPasswordSchema = z
    .object({
      ...(advancedSettings
        ? {
            currentPassword: z
              .string()
              .min(8, { message: t("formErrors.passwordMin") }),
          }
        : {}),
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
      ...(advancedSettings ? { currentPassword: "" } : {}),
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (!advancedSettings) {
      if (!accessToken) {
        return;
      }
      onResetPassword({
        password: values.password,
        access_token: accessToken,
      });
    } else {
      if (values.currentPassword) {
        setChangePasswordModal(true);
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleShowCurrentPassword = () =>
    setShowCurrentPassword((prev) => !prev);

  const onCancelChangePassword = () => {
    handleCancel?.();
    form.reset();
  };

  const passwordsInputs = [
    ...(advancedSettings
      ? [
          {
            name: "currentPassword",
            condition: showCurrentPassword,
            handler: handleShowCurrentPassword,
          },
        ]
      : []),
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

  const onConfirmChangePassword = (modal: boolean, type?: string) => {
    if (type) {
      form.reset();
    } else {
      onChangePassword({
        currentPassword: form.getValues().currentPassword as string,
        newPassword: form.getValues().password,
      });
    }

    setChangePasswordModal(modal);
  };

  return (
    <>
      <Card
        className={
          advancedSettings
            ? `fixed top-8 bottom-4 right-4 z-[80]
      w-[90%] max-w-sm rounded-xl bg-card p-4 shadow-xl
      flex flex-col transition-transform duration-300
    `
            : "w-full max-w-md shadow-lg rounded-xl"
        }
      >
        <CardHeader className="items-center text-center space-y-4 p-6">
          {!advancedSettings ? (
            <div className="flex items-center gap-3">
              <LogOut />
              <CardTitle className="text-3xl font-bold tracking-tight font-headline">
                TeamTracker
              </CardTitle>
            </div>
          ) : (
            <div className="w-full flex flex-row justify-between items-center">
              <h2 className="mb-6 text-lg font-semibold tracking-tight">
                {t("changePassword")}
              </h2>
              <span className="flex flex-row mb-6">
                <IconTooltip content={t("closeSettings")}>
                  <X
                    onClick={onCancelChangePassword}
                    className="icon cursor-pointer"
                  />
                </IconTooltip>
              </span>
            </div>
          )}
          <CardDescription>
            {t(advancedSettings ? "changePasswordMessage" : "resetPassword")}
          </CardDescription>
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
                              value={field.value as string}
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
              {advancedSettings && (
                <Button
                  type="button"
                  className="w-full"
                  onClick={onCancelChangePassword}
                  variant={"destructive"}
                >
                  {t("cancel")}
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
      {changePasswordModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <InfoModal
            open={changePasswordModal}
            handler={onConfirmChangePassword}
            title={"changePassword"}
            message={"confirmChangePassword"}
            type={"warning"}
          />
        </div>
      )}
    </>
  );
};
