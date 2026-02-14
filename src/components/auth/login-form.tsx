"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
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
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import IconTooltip from "../icons/Tooltip";

interface ILoginForm {
  resetRegisterForm: (register: boolean) => void;
  registerForm: boolean;
  handleRegisterModal: (modal: boolean) => void;
  handleCancelAction: (modal: boolean) => void;
}

export const LoginForm: React.FC<ILoginForm> = ({
  resetRegisterForm,
  registerForm,
  handleRegisterModal,
  handleCancelAction,
}) => {
  const { t } = useTranslation();
  const formSchema = useMemo(
    () =>
      z.object({
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
        ...(registerForm && {
          name: z
            .string()
            .min(2, { message: t("formErrors.nameMinLength") })
            .max(50, { message: t("formErrors.nameMaxLength") })
            .regex(
              /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([' -][a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/,
              {
                message: t("formErrors.nameInvalidCharacters"),
              },
            ),
          lastname: z
            .string()
            .min(2, { message: t("formErrors.surnameMinLength") })
            .max(50, { message: t("formErrors.surnameMaxLength") })
            .regex(
              /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([' -][a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/,
              {
                message: t("formErrors.surnameInvalidCharacters"),
              },
            ),
        }),
      }),
    [registerForm, t],
  );

  const defaultValues = {
    email: "",
    password: "",
    name: "",
    lastname: "",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const formHasChanges = Object.values(form.getValues()).some((value) => {
    return value !== undefined && value !== "";
  });

  const { toast } = useToast();
  const { mutate: register } = useRegister(handleRegisterModal, form);
  const { mutate: login } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [cancelRegisterModal, setCancelRegisterModal] = useState(false);
  const setForgotPassword = useAuthStore((state) => state.setForgotPassword);

  useEffect(() => {
    setCancelRegisterModal(formHasChanges);
  }, [formHasChanges]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const storedLanguage = localStorage.getItem("language");
    if (registerForm) {
      const registerValues = {
        email: values.email,
        password: values.password,
        name: values.name,
        lastname: values.lastname,
        extra: {
          lang: storedLanguage ?? "en",
        },
      };
      register(registerValues);
    } else {
      const { name, lastname, ...loginData } = values;
      login(loginData);
    }
  };

  const handleRegisterForm = () => {
    if (!registerForm) {
      form.reset(defaultValues);
    }
    if (cancelRegisterModal) {
      handleCancelAction(cancelRegisterModal);
      return;
    }
    resetRegisterForm(!registerForm);
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

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {registerForm && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Name"
                          className="pl-10"
                          {...field}
                          value={field.value as string}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("lastname")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Lastname"
                          className="pl-10"
                          {...field}
                          value={field.value as string}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
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
                  <div className="flex relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? `text` : `password`}
                      placeholder="••••••••"
                      className="pl-10"
                      {...field}
                    />
                    {showPassword ? (
                      <IconTooltip content={t("hidePassword")}>
                        <EyeClosed
                          onClick={handleShowPassword}
                          className="absolute right-2.5 top-2.5 h-5 w-5 text-muted-foreground "
                        />
                      </IconTooltip>
                    ) : (
                      <IconTooltip content={t("showPassword")}>
                        <Eye
                          onClick={handleShowPassword}
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
          {!registerForm && (
            <div className="text-sm text-right">
              <Button
                variant={"ghost"}
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-500 hover:underline"
                type="button"
              >
                {t("forgotPassword")}
              </Button>
            </div>
          )}
          <Button type="submit" className="w-full">
            {registerForm ? t("register") : t("signIn")}
          </Button>
          <Button
            type="button"
            variant={"secondary"}
            onClick={handleRegisterForm}
            className="w-full"
          >
            {registerForm ? t("cancel") : t("register")}
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
