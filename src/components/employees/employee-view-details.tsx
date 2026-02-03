import { useEmployeeStore } from "@/store/useEmployeeStore";
import { X } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { EmployeeVacationsView } from "./employeeVacationsView";

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

          <EmployeeVacationsView type={"vacation"} />
          <EmployeeVacationsView type={"hours"} />

          <Button onClick={onEdit} variant="default" className="w-full">
            {t("edit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
