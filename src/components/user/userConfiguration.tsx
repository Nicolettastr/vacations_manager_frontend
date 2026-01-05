import { useGetThemes } from "@/hooks/themes/useGetThemes";
import { usePatchUser } from "@/hooks/users/usePatchUser";
import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Palette, Settings, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useShallow } from "zustand/shallow";
import IconTooltip from "../icons/Tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const UserConfiguration = () => {
  const { t } = useTranslation();
  const [editUser, setEditUser] = useState<boolean>(false);
  const [logout, user, isLoggedIn] = useAuthStore(
    useShallow((state) => [state.logout, state.user, state.isLoggedIn])
  );
  const [userConfiguration, setUserConfiguration] = useUserStore(
    useShallow((state) => [state.userConfiguration, state.setUserConfiguration])
  );
  const handleResetForm = () => {
    form.reset({
      name: user?.name ?? "",
      lastname: user?.lastname ?? "",
      theme: user?.theme,
      avatar: user?.avatar ?? "",
    });
  };
  const { mutate: onEditUser } = usePatchUser(handleResetForm);
  const { themes } = useGetThemes(isLoggedIn);

  const userSchema = z.object({
    name: z.string().optional(),
    lastname: z.string().optional(),
    theme: z.string().optional(),
    avatar: z.string().optional(),
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      lastname: user?.lastname ?? "",
      theme: user?.theme,
      avatar: user?.avatar ?? "",
    },
  });

  const resetTheme = () => {
    document.documentElement.setAttribute("data-theme", user?.theme ?? "light");
  };

  const previewTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const handleEditUser = () => {
    setEditUser(!editUser);
  };

  const handleCancelEdit = () => {
    handleResetForm();
    handleEditUser();
    resetTheme();
  };

  useEffect(() => {
    handleResetForm();
  }, [user, form]);

  useEffect(() => {
    setEditUser(false);
    handleResetForm();
    resetTheme();
  }, [userConfiguration]);

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    if (!values) {
      return;
    }
    onEditUser(values);
  };

  const handleUserSettings = () => {
    setUserConfiguration(!userConfiguration);
    setEditUser(false);
  };

  const handleAdvancedSettings = () => {};

  return (
    <Form {...form}>
      <form
        className={`${
          userConfiguration ? "flex" : "hidden"
        } fixed top-8 bottom-4 right-4 z-[70] w-[90%] max-w-sm rounded-xl bg-card p-4 shadow-xl flex-col transition-transform duration-300 justify-between`}
        style={{
          transform: userConfiguration ? "translateX(0)" : "translateX(120%)",
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-row justify-between items-center">
          <h2 className="mb-6 text-lg font-semibold tracking-tight">
            {editUser ? t("editUserSettings") : t("userSettings")}
          </h2>
          <span className="flex flex-row mb-6">
            <IconTooltip content={t("closeSettings")}>
              <X onClick={handleUserSettings} className="icon cursor-pointer" />
            </IconTooltip>
          </span>
        </div>

        <div className="flex flex-col gap-4 h-[90vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={""} alt={user?.name ?? t("userImage")} />
                    <AvatarFallback>
                      {getInitials(user?.name)}
                      {getInitials(user?.lastname)}
                    </AvatarFallback>
                  </Avatar>
                  {editUser ? (
                    <>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t("name")}
                                  className="user-edit-input w-full"
                                />
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
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t("lastname")}
                                  className="user-edit-input w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <h3 className={editUser ? "mt-3" : ""}>{user?.email}</h3>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">{`${user?.name} ${user?.lastname}`}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user?.email || t("noEmailSet")}
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <Palette className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{t("theme")}</span>
                </div>

                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {!editUser ? (
                          <Input
                            {...field}
                            type="text"
                            placeholder={t("theme")}
                            className="user-edit-input w-full"
                            disabled={!editUser}
                            onChange={() => {}}
                          />
                        ) : (
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              previewTheme(value);
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("selectTheme")} />
                            </SelectTrigger>
                            <SelectContent className="z-[80]">
                              {themes.map((theme) => (
                                <SelectItem
                                  key={theme.theme}
                                  value={theme.theme}
                                >
                                  {t(theme.theme)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2">
              {!editUser && (
                <div>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full justify-between"
                    onClick={handleEditUser}
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      <span>{t("editProfile")}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="w-full justify-between mt-3"
                    onClick={handleAdvancedSettings}
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5" />
                      <span>{t("advancedSettings")}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        {editUser && (
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
        )}

        <div className="mt-6 pt-4 border-t">
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={logout}
          >
            {t("logout")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
