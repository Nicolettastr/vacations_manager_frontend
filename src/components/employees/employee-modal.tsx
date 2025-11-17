"use client";

import { Button } from "@/components/ui/button";
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
import { newEmployee } from "@/types/employees/employees.common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

export type EmployeeModalProps = {
  isOpen: boolean;
  mode: "create" | "edit" | "view" | "delete";
  data?: newEmployee;
  onClose: () => void;
  onSave: (employee: newEmployee) => void;
};

export const EmployeeModal = ({
  isOpen,
  mode,
  data,
  onClose,
  onSave,
}: EmployeeModalProps) => {
  const { t } = useTranslation();

  const isEditMode = mode === "edit" || mode === "create";

  const employeeSchema = z.object({
    name: z.string({ required_error: t("formErrors.nameRequired") }),
    surname: z.string({ required_error: t("formErrors.surnameRequired") }),
    email: z
      .string({ required_error: t("formErrors.emailRequired") })
      .email(t("formErrors.invalidEmailModal")),
    color: z.string().optional(),
  });

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset(data as newEmployee);
    } else {
      form.reset({
        name: "",
        surname: "",
        email: "",
        color: "#000000",
      });
    }
  }, [data, form, isOpen]);

  const onSubmit = (values: z.infer<typeof employeeSchema>) => {
    onSave(values as newEmployee);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {mode === "delete" ? (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {t("deleteEmployeeRecords", {
                      name: data?.name,
                      surname: data?.surname,
                    })}
                  </DialogTitle>
                  <DialogDescription>
                    {t("deleteEmployeeWarning")}
                  </DialogDescription>
                  <DialogFooter>
                    <Button variant={"destructive"} type="submit">
                      {t("delete")}
                    </Button>
                    <Button
                      variant={"secondary"}
                      type="button"
                      onClick={onClose}
                    >
                      {t("cancel")}
                    </Button>
                  </DialogFooter>
                </DialogHeader>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {mode === "create" && t("addEmployee")}
                    {mode === "edit" && t("editEmployee")}
                    {mode === "view" &&
                      t("viewEmployee", {
                        name: data?.name,
                        surname: data?.surname,
                      })}
                  </DialogTitle>

                  {isEditMode && (
                    <DialogDescription>
                      {t("employeeDataDescription")}
                    </DialogDescription>
                  )}
                </DialogHeader>

                {isEditMode ? (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("surname")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("surname")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("email")}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("emailPlaceholder")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("color")}</FormLabel>
                          <FormControl>
                            <Input type="color" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>{t("name")}:</strong> {data?.name}
                    </p>
                    <p>
                      <strong>{t("surname")}:</strong> {data?.surname}
                    </p>
                    <p>
                      <strong>{t("email")}:</strong> {data?.email}
                    </p>
                    {data?.color && (
                      <p>
                        <strong>{t("color")}:</strong>{" "}
                        <span
                          className="inline-block w-4 h-4 rounded"
                          style={{ backgroundColor: data.color }}
                        />
                      </p>
                    )}
                  </div>
                )}

                {isEditMode && (
                  <DialogFooter>
                    <Button type="submit">{t("save")}</Button>
                  </DialogFooter>
                )}
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
