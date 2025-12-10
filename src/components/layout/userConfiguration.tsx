import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import {
  ChevronRight,
  Moon,
  Palette,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import IconTooltip from "../icons/Tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const UserConfiguration = () => {
  const { t } = useTranslation();
  const [logout, user] = useAuthStore(
    useShallow((state) => [state.logout, state.user])
  );
  const [userConfiguration, setUserConfiguration] = useUserStore(
    useShallow((state) => [state.userConfiguration, state.setUserConfiguration])
  );

  return (
    <section
      className={`${
        userConfiguration ? "flex" : "hidden"
      } fixed top-8 bottom-4 right-4 z-[70] w-[90%] h-[60%] max-w-sm rounded-xl bg-card p-4 shadow-xl flex-col transition-transform duration-300`}
      style={{
        transform: userConfiguration ? "translateX(0)" : "translateX(120%)",
      }}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <h2 className="mb-6 text-lg font-semibold tracking-tight">
          {t("userSettings")}
        </h2>
        <span className="flex flex-row mb-6">
          <IconTooltip content={t("closeSettings")}>
            <X
              onClick={() => setUserConfiguration(!userConfiguration)}
              className="icon cursor-pointer"
            />
          </IconTooltip>
        </span>
      </div>

      <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto">
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={""} alt={user?.name ?? t("userImage")} />
                  <AvatarFallback>
                    {getInitials(user?.name)}
                    {user?.lastname}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{t("noNameSet")}</h3>

                <p className="text-sm text-muted-foreground mt-1">
                  {user?.email || t("noEmailSet")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">{t("theme")}</span>
              </div>
              <Select value={""} onValueChange={() => {}}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("selectTheme")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      {t("light")}
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      {t("dark")}
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      {t("system")}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5" />
                <span>{t("editProfile")}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => {}}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span>{t("advancedSettings")}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        type="button"
        variant={"destructive"}
        className=""
        onClick={logout}
      >
        {t("logout")}
      </Button>
    </section>
  );
};
