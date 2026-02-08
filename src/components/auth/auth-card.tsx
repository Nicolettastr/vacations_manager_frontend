import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../infrastructure/i18n";
import { Logo } from "../icons/logo";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ForgotPasswordForm from "./forgot-password";
import { InfoModal } from "./info-modal";
import { LoginForm } from "./login-form";

export const AuthCard = () => {
  const { t } = useTranslation();
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const [forgotPasswordSend, setForgotPasswordSend] = useState<boolean>(false);
  const [registerForm, setRegisterForm] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  useEffect(() => {
    const storageLanguage = localStorage.getItem("language") ?? "en";
    i18n.changeLanguage(storageLanguage);
  }, []);

  const changeLoginLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const resetRegisterForm = (register: boolean) => {
    setRegisterForm(register);
  };

  const handleRegisterModal = (modal: boolean) => {
    setRegisterModal(modal);
    resetRegisterForm(modal);
  };

  const handleForgotPassword = (modal: boolean) => {
    setForgotPasswordSend(modal);
  };

  const handleCancelRegisterModal = (modal: boolean) => {
    setOpenCancelModal(modal);
  };

  const handleCancelAction = (modal: boolean) => {
    setOpenCancelModal(modal);
  };

  return (
    <>
      {!registerModal && !forgotPasswordSend && !openCancelModal && (
        <Card className="w-full max-w-md shadow-lg rounded-xl">
          <CardHeader className="items-center text-center space-y-4 p-6 flex-row align-center relative justify-center">
            <div className="flex-col items-center mt-1 mr-5">
              <div className="flex items-center gap-3">
                <Logo />
                <CardTitle className="text-3xl font-bold tracking-tight font-headline">
                  TeamTracker
                </CardTitle>
              </div>
              <CardDescription>
                {t(forgotPassword ? "" : "signInMessage")}
              </CardDescription>
            </div>
            <div className="absolute top-[-0.5] right-2 ">
              <Button
                onClick={() => changeLoginLanguage("en")}
                variant={"link"}
              >
                EN
              </Button>
              <span>|</span>
              <Button
                onClick={() => changeLoginLanguage("es")}
                variant={"link"}
              >
                ES
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {forgotPassword ? (
              <ForgotPasswordForm handleForgotPassword={handleForgotPassword} />
            ) : (
              <LoginForm
                registerForm={registerForm}
                resetRegisterForm={resetRegisterForm}
                handleRegisterModal={handleRegisterModal}
                handleCancelAction={handleCancelAction}
              />
            )}
          </CardContent>
        </Card>
      )}
      {registerModal && (
        <InfoModal
          open={registerModal}
          handler={handleRegisterModal}
          title={"register"}
          message={"registerMessage"}
        />
      )}
      {forgotPasswordSend && (
        <InfoModal
          open={forgotPasswordSend}
          handler={handleForgotPassword}
          title={"forgotPasswordSend"}
          message={"forgotPasswordSendMessage"}
        />
      )}
      {openCancelModal && (
        <InfoModal
          open={openCancelModal}
          handler={handleCancelRegisterModal}
          title={"cancelRegisterModal"}
          message={"cancelRegisterMessage"}
          type="warning"
        />
      )}
    </>
  );
};
