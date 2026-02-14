import { useEmployeeStore } from "@/store/useEmployeeStore";
import { useTranslation } from "react-i18next";

interface EmployeeDetails {
  type: string;
}

export const EmployeeVacationsView: React.FC<EmployeeDetails> = ({ type }) => {
  const { t } = useTranslation();
  const selectedEmployee = useEmployeeStore((state) => state.selectedEmployee);

  if (!selectedEmployee) return null;

  const usedDays =
    selectedEmployee.vacation_days - selectedEmployee.available_vacation_days;
  const percentage = Math.round(
    (selectedEmployee.available_vacation_days /
      selectedEmployee.vacation_days) *
      100,
  );

  console.log("selectedEmployee", selectedEmployee);

  return (
    <>
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">
          {t(type === "vacation" ? "vacationDays" : "extraDays")}
        </h4>

        {type === "vacation" ? (
          <div className="flex gap-3">
            <div className="flex-1 bg-muted rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">
                {t("totalAnnual")}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {selectedEmployee.vacation_days}
              </p>
            </div>

            <div className="flex-1 bg-accent/10 rounded-lg p-4 border border-accent/30">
              <p className="text-xs text-accent mb-1">{t("available")}</p>
              <p className="text-2xl font-bold text-accent">
                {selectedEmployee.available_vacation_days}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="flex-1 bg-muted rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">
                {t("extraDays")}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {selectedEmployee.total_extra_days}
              </p>
            </div>

            <div className="flex-1 bg-accent/10 rounded-lg p-4 border border-accent/30">
              <p className="text-xs text-accent mb-1">{t("totalExtraHours")}</p>
              <p className="text-2xl font-bold text-accent">
                {selectedEmployee.total_extra_hours}
              </p>
            </div>
          </div>
        )}

        {type === "vacation" && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>
                {t("used")}: {usedDays} {t("days")}
              </span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-accent h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
