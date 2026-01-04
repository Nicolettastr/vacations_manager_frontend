import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Palette, User, X } from "lucide-react";
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
  const [logout, user] = useAuthStore(
    useShallow((state) => [state.logout, state.user])
  );
  const [userConfiguration, setUserConfiguration] = useUserStore(
    useShallow((state) => [state.userConfiguration, state.setUserConfiguration])
  );

  const handleResetForm = () => {
    form.reset({
      name: user?.name ?? "",
      lastname: user?.lastname ?? "",
      theme: user?.theme ?? "light",
      avatar: user?.avatar ?? "",
      email: user?.email ?? "",
    });
  };

  const userSchema = z.object({
    name: z.string().optional(),
    lastname: z.string().optional(),
    theme: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().optional(),
  });

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? "",
      lastname: user?.lastname ?? "",
      theme: user?.theme ?? "light",
      avatar: user?.avatar ?? "",
      email: user?.email ?? "",
    },
  });

  const handleEditUser = () => {
    setEditUser(!editUser);
  };

  const handleCancelEdit = () => {
    handleResetForm();
    handleEditUser();
  };

  useEffect(() => {
    handleResetForm();
  }, [user, form]);

  useEffect(() => {
    setEditUser(false);
  }, [userConfiguration]);

  const onSubmit = async (values: z.infer<typeof userSchema>) => {};

  const handleUserSettings = () => {
    setUserConfiguration(!userConfiguration);
    setEditUser(false);
  };

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
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="mt-3 w-full">
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder={t("email")}
                                className="user-edit-input w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                          />
                        ) : (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!editUser}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("selectTheme")} />
                            </SelectTrigger>
                            <SelectContent className="z-[80]">
                              {["light", "dark", "system"].map((theme) => (
                                <SelectItem key={theme} value={theme}>
                                  {t(theme)}
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
