import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "react-i18next";
import { Logo } from "../icons/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ForgotPasswordForm from "./forgot-password";
import { LoginForm } from "./login-form";

export const AuthCard = () => {
  const { t } = useTranslation();
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  return (
    <>
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="items-center text-center space-y-4 p-6">
          <div className="flex items-center gap-3">
            <Logo />
            <CardTitle className="text-3xl font-bold tracking-tight font-headline">
              TeamTracker
            </CardTitle>
          </div>
          <CardDescription>
            {t(forgotPassword ? "" : "signInMessage")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {forgotPassword ? <ForgotPasswordForm /> : <LoginForm />}
        </CardContent>
      </Card>
    </>
  );
};
