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
import * as z from "zod";

export type EmployeeModalProps = {
  isOpen: boolean;
  mode: "create" | "edit" | "view" | "delete";
  data?: newEmployee;
  onClose: () => void;
  onSave: (employee: newEmployee) => void;
};

const employeeSchema = z.object({
  name: z.string({ required_error: "El nombre es obligatorio" }),
  surname: z.string({ required_error: "El apellido es obligatorio" }),
  email: z
    .string({ required_error: "El email es obligatorio" })
    .email("Email inválido"),
  color: z.string().optional(),
});

export const EmployeeModal = ({
  isOpen,
  mode,
  data,
  onClose,
  onSave,
}: EmployeeModalProps) => {
  const isEditMode = mode === "edit" || mode === "create";

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
                    {`Delete all records of ${data?.name} ${data?.surname}`}
                  </DialogTitle>
                  <DialogDescription>
                    Once employee records are deleted, all associated data
                    including leave records will be permanently removed and
                    cannot be recovered. Please confirm that you want to proceed
                    with this action.
                  </DialogDescription>
                  <DialogFooter>
                    <Button variant={"destructive"} type="submit">
                      Delete
                    </Button>
                    <Button
                      variant={"secondary"}
                      type="button"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogHeader>
              </>
            ) : (
              <>
                {" "}
                <DialogHeader>
                  <DialogTitle>
                    {mode === "create" && "Agregar Empleado"}
                    {mode === "edit" && "Editar Empleado"}
                    {mode === "view" && `${data?.name} ${data?.surname}`}
                  </DialogTitle>
                  {isEditMode && (
                    <DialogDescription>
                      Complete los datos del empleado.
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
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre" {...field} />
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
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input placeholder="Apellido" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Correo electrónico"
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
                          <FormLabel>Color</FormLabel>
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
                      <strong>Nombre:</strong> {data?.name}
                    </p>
                    <p>
                      <strong>Apellido:</strong> {data?.surname}
                    </p>
                    <p>
                      <strong>Email:</strong> {data?.email}
                    </p>
                    {data?.color && (
                      <p>
                        <strong>Color:</strong>{" "}
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
                    <Button type="submit">Guardar</Button>
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
