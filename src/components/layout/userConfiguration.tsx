import { useUserStore } from "@/store/useUserStore";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/shallow";
import IconTooltip from "../icons/Tooltip";

export const UserConfiguration = () => {
  const { t } = useTranslation();
  const [userConfiguration, setUserConfiguration] = useUserStore(
    useShallow((state) => [state.userConfiguration, state.setUserConfiguration])
  );

  return (
    <section
      className={`${
        userConfiguration ? "flex" : "hidden"
      } fixed top-4 bottom-4 right-4 z-[70] w-[90%] max-w-sm rounded-xl bg-card p-4 shadow-xl flex-col transition-transform duration-300`}
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

      <div className="flex flex-col gap-4 h-[80vh] overflow-y-auto">{}</div>
    </section>
  );
};
