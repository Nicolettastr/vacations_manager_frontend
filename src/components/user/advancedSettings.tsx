import { usePatchUserEmail } from "@/hooks/users/usePatchUserEmail";
import { useAuthStore } from "@/store/useAuthStore";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { ITypes } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useShallow } from "zustand/shallow";
import IconTooltip from "../icons/Tooltip";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ConfigurationDropdowns } from "./configurationDropdowns";

interface IAdvancedSettings {
  advancedSettings: boolean;
  handleAdvancedSettings: () => void;
}

export const AdvancedSettings: React.FC<IAdvancedSettings> = ({
  advancedSettings,
  handleAdvancedSettings,
}) => {
  const { t } = useTranslation();
  const [user, isLoggedIn, logout] = useAuthStore(
    useShallow((state) => [state.user, state.isLoggedIn, state.logout])
  );

  const [language, setLanguage] = useState("");
  const [userConfiguration, setUserConfiguration] = useUserStore(
    useShallow((state) => [state.userConfiguration, state.setUserConfiguration])
  );
  const resetEmployeesConfig = useEmployeeStore((state) => state.resetStore);
  const resetModalConfiguration = useModalStore((state) => state.resetStore);

  const handleResetForm = () => {
    form.reset({
      email: user?.email ?? "",
      language: language ?? "",
    });
  };

  const resetStores = () => {
    resetEmployeesConfig();
    resetModalConfiguration();
  };

  const handleLogout = () => {
    logout(resetStores);
  };

  const { mutate: onEditUserEmail } = usePatchUserEmail(
    handleResetForm,
    handleLogout
  );

  const handleUserSettings = () => {
    setUserConfiguration(!userConfiguration);
    //cancelar advanced settings
  };

  const userSchemaAdvanced = z.object({
    email: z.string().optional(),
    language: z.string().optional(),
  });

  const form = useForm<z.infer<typeof userSchemaAdvanced>>({
    resolver: zodResolver(userSchemaAdvanced),
    defaultValues: {
      email: user?.email ?? "",
      language: language ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchemaAdvanced>) => {
    if (!values) {
      return;
    }

    if (values.email) {
      const email = values.email.trim().toLocaleLowerCase();
      onEditUserEmail(email);
    }

    if (values.language) {
      console.log("Changing language to:", values.language);
      setLanguage(values.language);
    }
  };

  const handleCancelEdit = () => {
    handleAdvancedSettings();
  };

  const lang: ITypes[] = [
    { id: "1", name: "english" },
    { id: "2", name: "spanish" },
  ];

  return (
    <Form {...form}>
      <form
        className={`fixed top-8 bottom-4 right-4 z-[80]
      w-[90%] max-w-sm rounded-xl bg-card p-4 shadow-xl
      flex flex-col justify-between
      transition-transform duration-300
    `}
        style={{
          transform: advancedSettings ? "translateX(0)" : "translateX(120%)",
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-row justify-between items-center">
          <h2 className="mb-6 text-lg font-semibold tracking-tight">
            {t("advancedSettings")}
          </h2>
          <span className="flex flex-row mb-6">
            <IconTooltip content={t("closeSettings")}>
              <X onClick={handleCancelEdit} className="icon cursor-pointer" />
            </IconTooltip>
          </span>
        </div>

        <div className="flex flex-col gap-4 h-[90vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="grid w-full">
                    <FormLabel className="mb-2 ml-1 flex ">
                      <Mail className="w-4 h-4 mr-3" />
                      {t("email")}
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t("email")}
                              className="user-edit-input w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <ConfigurationDropdowns
              name={"language"}
              editUser={advancedSettings}
              data={lang}
            />
          </div>

          <div className="mb-6 flex gap-2">
            <Button type="submit" className="flex-1">
              {t("save")}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleCancelEdit}
            >
              {t("cancel")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
