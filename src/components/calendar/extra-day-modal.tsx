"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCommonDataStore } from "@/store/useCommonDataStore";
import { useModalStore } from "@/store/useModalStore";
import {
  ExtraDayBase,
  ExtraDayModalProps,
  ExtraDayWithEmployee,
} from "@/types/extraDays/extraDays.common";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { FormLabelRequired } from "../ui/formLabelRequired";

export const ExtraDayModal = ({
  isOpen,
  mode,
  data,
  onSave,
  employees,
  onClose,
  onDelete,
}: ExtraDayModalProps) => {
  const { t } = useTranslation();
  const isEditMode = mode === "edit" || mode === "create";

  const [modalState, setModalState] = useModalStore(
    useShallow((state) => [state.modalState, state.setModalState]),
  );
  const selectedDate = useCommonDataStore((state) => state.selectedDate);

  const extraDaySchema = z.object({
    id: z.string().optional(),
    employee_id: z.string().min(1, t("formErrors.employeeRequired")),
    date: z.date({ required_error: t("formErrors.startDateRequired") }),
    extra_hours: z.number({ required_error: t("formErrors.endDateRequired") }),
    reason: z.string().trim().optional(),
  });

  const defaultValues = {
    id: undefined,
    employee_id: "",
    date: selectedDate ? new Date(selectedDate) : new Date(),
    extra_hours: 0,
    reason: "",
  };

  const form = useForm<z.infer<typeof extraDaySchema>>({
    resolver: zodResolver(extraDaySchema),
    defaultValues,
  });

  useEffect(() => {
    if (data && isOpen) {
      form.reset({
        id: data.id,
        employee_id: data.employee_id,
        date: data.date ? new Date(data.date) : new Date(),
        extra_hours: data.extra_hours,
        reason: data.reason,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [isOpen, data]);

  function onSubmit(values: z.infer<typeof extraDaySchema>) {
    const extraDay: ExtraDayBase = {
      employee_id: values.employee_id,
      extra_hours: values.extra_hours,
      date: format(values.date, "yyyy-MM-dd"),
      reason: values.reason || "",
    };
    onSave(extraDay);
  }

  const currentExtraDay = data as ExtraDayWithEmployee;
  const employee = employees?.find(
    (e) => e.id === currentExtraDay?.employee_id,
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                {mode === "create" && t("modal.addExtraHours")}
                {mode === "edit" && t("modal.extraDayEdit")}
                {mode === "view" &&
                  `${t("modal.extraDay")} ${employee?.name || ""}`}
              </DialogTitle>
              {mode !== "view" && (
                <DialogDescription>
                  {t("modal.completeDetailsExtraDay")}
                </DialogDescription>
              )}
            </DialogHeader>

            {isEditMode ? (
              <div className="space-y-4 px-1 py-2">
                <FormField
                  control={form.control}
                  name="employee_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabelRequired required={true}>
                        {t("employee")}
                      </FormLabelRequired>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectEmployee")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees?.map((emp) => (
                            <SelectItem key={emp.id} value={String(emp.id)}>
                              {emp.name} {emp.surname}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabelRequired required={true}>
                          {t("date")}
                        </FormLabelRequired>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? format(field.value, "PPP")
                                  : t("chooseDate")}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="extra_hours"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabelRequired required={true}>
                          {t("extraHours")}
                        </FormLabelRequired>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("reason")}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t("addReason")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <p>
                  <strong>{t("employee")}:</strong> {employee?.name}{" "}
                  {employee?.surname}
                </p>
                <p>
                  <strong>{t("extraHours")}:</strong>{" "}
                  {currentExtraDay?.extra_hours}
                </p>
                <p>
                  <strong>{t("date")}:</strong>{" "}
                  {currentExtraDay?.date &&
                    format(new Date(currentExtraDay.date), "PPP")}
                </p>
                {currentExtraDay?.reason && (
                  <p>
                    <strong>{t("reason")}:</strong> {currentExtraDay.reason}
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              {mode === "view" && currentExtraDay?.id && (
                <>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setModalState({
                        ...modalState,
                        mode: "edit",
                        data: currentExtraDay,
                      })
                    }
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(currentExtraDay.id, "extraDay")}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                  </Button>
                </>
              )}
              {isEditMode && <Button type="submit">{t("save")}</Button>}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
