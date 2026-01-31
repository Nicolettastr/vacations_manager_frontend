import { useEmployeeStore } from "@/store/useEmployeeStore";
import { X } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

interface EmployeeDetailsModalProps {
  onEdit: () => void;
  onClose: () => void;
}

const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({
  onEdit,
  onClose,
}) => {
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

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl shadow-xl w-full max-w-lg border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {t("employeeDetails")}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            {selectedEmployee.color && (
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-semibold"
                style={{ backgroundColor: selectedEmployee.color }}
              >
                {selectedEmployee.name[0]}
                {selectedEmployee.surname[0]}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {selectedEmployee.name} {selectedEmployee.surname}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedEmployee.email}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              {t("vacationDays")}
            </h4>

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
          </div>

          <Button onClick={onEdit} variant="default" className="w-full">
            {t("edit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
