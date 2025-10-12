"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
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
import type { EventModalProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LeaveRequest, LeaveResponse } from "@/types/leaves/leaves.common";
import { useEffect } from "react";

const leaveSchema = z
  .object({
    id: z.string().optional(),
    employeeId: z.string({ required_error: "Debe seleccionar un empleado." }),
    type: z.string({ required_error: "Debe seleccionar un tipo de ausencia." }),
    startDate: z.date({
      required_error: "Debe seleccionar una fecha de inicio.",
    }),
    endDate: z.date({ required_error: "Debe seleccionar una fecha de fin." }),
    note: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "La fecha de fin no puede ser anterior a la fecha de inicio.",
    path: ["endDate"],
  });

export function EventModal({
  isOpen,
  mode,
  data,
  employees,
  leaveTypes,
  onClose,
  onSave,
  onDelete,
  setMode,
}: EventModalProps) {
  const isEditMode = mode === "edit" || mode === "create";

  const form = useForm<z.infer<typeof leaveSchema>>({
    resolver: zodResolver(leaveSchema),
  });

  useEffect(() => {
    if (data) {
      const defaultValues = {
        ...data,
        startDate: new Date((data as LeaveResponse).start_date || new Date()),
        endDate: new Date((data as LeaveResponse).end_date || new Date()),
      };
      form.reset(defaultValues as any);
    } else {
      form.reset({
        id: undefined,
        employeeId: undefined,
        type: undefined,
        startDate: new Date(),
        endDate: new Date(),
        note: "",
      });
    }
  }, [data, form, isOpen]);

  function onSubmit(values: z.infer<typeof leaveSchema>) {
    const leaveData: LeaveRequest = {
      employee_id: values.employeeId,
      type: values.type,
      start_date: format(values.startDate, "yyyy-MM-dd"),
      end_date: format(values.endDate, "yyyy-MM-dd"),
      note: values.note || "",
    };
    onSave(leaveData);
  }

  const currentLeave = data as LeaveResponse;
  const employee = employees.find((e) => e.id === currentLeave?.employee_id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                {mode === "create" && "Crear Ausencia"}
                {mode === "edit" && "Editar Ausencia"}
                {mode === "view" && `Ausencia de ${employee?.name || ""}`}
              </DialogTitle>
              {mode !== "view" && (
                <DialogDescription>
                  Complete los detalles de la ausencia.
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
                      <FormLabel>Empleado</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un empleado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees.map((emp) => (
                            <SelectItem key={emp.id} value={emp.id}>
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
                      <FormLabel>Tipo de Ausencia</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {leaveTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
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
                        <FormLabel>Fecha de Inicio</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Elija una fecha</span>
                                )}
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
                        <FormLabel>Fecha de Fin</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Elija una fecha</span>
                                )}
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
                      <FormLabel>Nota</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Añada una nota..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <p>
                  <strong>Empleado:</strong> {employee?.name}{" "}
                  {employee?.surname}
                </p>
                <p>
                  <strong>Tipo:</strong> {currentLeave?.type}
                </p>
                <p>
                  <strong>Desde:</strong>{" "}
                  {currentLeave?.start_date &&
                    format(new Date(currentLeave.start_date), "PPP")}
                </p>
                <p>
                  <strong>Hasta:</strong>{" "}
                  {currentLeave?.end_date &&
                    format(new Date(currentLeave.end_date), "PPP")}
                </p>
                {currentLeave?.note && (
                  <p>
                    <strong>Nota:</strong> {currentLeave.note}
                  </p>
                )}
              </div>
            )}

            <DialogFooter>
              {mode === "view" && currentLeave?.id && (
                <>
                  <Button variant="outline" onClick={() => setMode("edit")}>
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(currentLeave.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                  </Button>
                </>
              )}
              {isEditMode && <Button type="submit">Guardar</Button>}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
