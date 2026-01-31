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
import { EventModalProps } from "@/types/common";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export const EventModalForm = ({
  isOpen,
  mode,
  data,
  employees,
  leaveTypes,
  onClose,
  onSave,
  onDelete,
}: EventModalProps) => {
  const { t } = useTranslation();
  const isEditMode = mode === "edit" || mode === "create";

  const [modalState, setModalState] = useModalStore(
    useShallow((state) => [state.modalState, state.setModalState]),
  );
  const selectedDate = useCommonDataStore((state) => state.selectedDate);

  const leaveSchema = z
    .object({
      id: z.string().optional(),
      employeeId: z.string().min(1, t("formErrors.employeeRequired")),
      type: z.string().min(1, t("formErrors.leaveTypeRequired")),
      startDate: z.date({ required_error: t("formErrors.startDateRequired") }),
      endDate: z.date({ required_error: t("formErrors.endDateRequired") }),
      note: z.string().trim().optional(),
    })
    .refine((data) => data.endDate >= data.startDate, {
      message: t("formErrors.endDateAfterStartDate"),
      path: ["endDate"],
    });

  const defaultValues = {
    id: undefined,
    employeeId: "",
    type: "",
    startDate: selectedDate ? new Date(selectedDate) : new Date(),
    endDate: selectedDate ? new Date(selectedDate) : new Date(),
    note: "",
  };

  const form = useForm<z.infer<typeof leaveSchema>>({
    resolver: zodResolver(leaveSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data && isOpen) {
      form.reset({
        id: data.id,
        employeeId: data.employee_id,
        startDate: data.start_date ? new Date(data.start_date) : new Date(),
        endDate: data.end_date ? new Date(data.end_date) : new Date(),
        type: data.type,
        note: data.note || "",
      });
    } else {
      form.reset(defaultValues);
    }
  }, [isOpen, data]);

  function onSubmit(values: z.infer<typeof leaveSchema>) {
    const leaveData: LeaveRequest = {
      id: values.id ?? "",
      employee_id: values.employeeId,
      type: values.type,
      start_date: format(values.startDate, "yyyy-MM-dd"),
      end_date: format(values.endDate, "yyyy-MM-dd"),
      note: values.note || "",
    };
    onSave(leaveData);
  }

  const currentLeave = data as LeaveResponse;
  const employee = employees?.find((e) => e.id === currentLeave?.employee_id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                {mode === "create" && t("modal.createLeave")}
                {mode === "edit" && t("modal.editLeave")}
                {mode === "view" &&
                  `${t("modal.leaveOf")} ${employee?.name || ""}`}
              </DialogTitle>
              {mode !== "view" && (
                <DialogDescription>
                  {t("modal.completeDetailsLeave")}
                </DialogDescription>
              )}
            </DialogHeader>

            {isEditMode ? (
              <div className="space-y-4 px-1 py-2">
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("employee")}</FormLabel>
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

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("leaveType")}</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectLeaveType")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {leaveTypes.map((type) => (
                            <SelectItem key={type.id} value={type.name}>
                              {type.name}
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
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>{t("startDate")}</FormLabel>
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
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>{t("endDate")}</FormLabel>
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
                </div>

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("note")}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t("addNote")} {...field} />
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
                  <strong>{t("leaveType")}:</strong> {currentLeave?.type}
                </p>
                <p>
                  <strong>{t("startDate")}:</strong>{" "}
                  {currentLeave?.start_date &&
                    format(new Date(currentLeave.start_date), "PPP")}
                </p>
                <p>
                  <strong>{t("endDate")}:</strong>{" "}
                  {currentLeave?.end_date &&
                    format(new Date(currentLeave.end_date), "PPP")}
                </p>
                {currentLeave?.note && (
                  <p>
                    <strong>{t("note")}:</strong> {currentLeave.note}
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              {mode === "view" && currentLeave?.id && (
                <>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setModalState({
                        ...modalState,
                        mode: "edit",
                        data: currentLeave,
                      })
                    }
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(currentLeave.id, "leave")}
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
