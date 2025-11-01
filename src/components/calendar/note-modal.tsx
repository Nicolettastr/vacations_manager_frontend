"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetNotesTypes } from "@/hooks/notes/useGetNotesTypes";
import { useAuthStore } from "@/store/useAuthStore";
import { useCommonDataStore } from "@/store/useCommonDataStore";
import { useModalStore } from "@/store/useModalStore";
import {
  NoteCreateRequest,
  NoteModalProps,
  NoteResponse,
  NoteTypes,
} from "@/types/notes/notes.common";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/shallow";

const noteSchema = z.object({
  id: z.string().optional(),
  employee_id: z.string().optional(),
  type: z.union([z.literal("low"), z.literal("medium"), z.literal("high")], {
    required_error: "Debe seleccionar un tipo de nota.",
  }),
  date: z.string({
    required_error: "Debe seleccionar una fecha de inicio.",
  }),
  content: z.string({ required_error: "Debe añadir contenido a la nota" }),
  title: z.string({ required_error: "Debe añadir un título a la nota" }),
});

export function NoteModal({
  isOpen,
  data,
  onClose,
  onSave,
  onDelete,
  mode,
  employees,
}: NoteModalProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { notestypes } = useGetNotesTypes(isLoggedIn);
  const isEditMode = mode === "edit" || mode === "create";
  const [modalState, setModalState] = useModalStore(
    useShallow((state) => [state.modalState, state.setModalState])
  );
  const selectedDate = useCommonDataStore((state) => state.selectedDate);

  const defaultValues = {
    id: undefined,
    employee_id: undefined,
    date: selectedDate,
    type: "low" as NoteTypes,
    title: "",
    content: "",
  };

  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data && isOpen) {
      const noteValues = {
        id: data?.id,
        employee_id: data?.employee_id,
        date: data?.date,
        type: data?.type,
        title: data?.title,
        content: data?.content,
      };
      form.reset(noteValues as NoteCreateRequest);
    } else {
      form.reset(defaultValues);
    }
  }, [isOpen, data]);

  console.log("data", data);

  // useEffect(() => {
  //   if (data) {
  //     const defaultValues = {
  //       ...data,
  //       employee_id: data.employee_id || undefined,
  //       date: isEditMode ? new Date(data.date) : selectedDate,
  //       type: data.type || notestypes[0]?.name || ("low" as NoteTypes),
  //       title: data.title || "",
  //       content: data.content || "",
  //     };
  //     form.reset(defaultValues as NoteCreateRequest);
  //   } else {
  //     form.reset({
  //       id: undefined,
  //       employee_id: undefined,
  //       type: "low" as NoteTypes,
  //       date: selectedDate,
  //       title: "",
  //       content: "",
  //     });
  //   }
  // }, [data, form, isOpen]);

  async function onSubmit(values: NoteCreateRequest) {
    onSave(values);
    onClose();
  }

  const currentNote = data as NoteResponse;
  const employee = employees?.find(
    (emp) => emp.id === currentNote?.employee_id
  );

  console.log("isEditMode", isEditMode);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Crear Nota</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {isEditMode ? (
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Título de la nota" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Escribe los detalles..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Importancia de la nota</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {notestypes.map((t) => (
                              <SelectItem key={t.id} value={t.name}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="space-y-4 text-sm">
                {employee && (
                  <p>
                    <strong>Empleado:</strong> {employee.name}{" "}
                    {employee.surname}
                  </p>
                )}

                <p>
                  <strong>Tipo:</strong> {currentNote?.type}
                </p>

                <p>
                  <strong>Desde:</strong>{" "}
                  {currentNote?.date &&
                    format(new Date(currentNote?.date), "PPP")}
                </p>
                <p>
                  <strong>Title:</strong> {currentNote?.title}
                </p>
                <p>
                  <strong>Nota:</strong> {currentNote?.content}
                </p>
              </div>
            )}

            <DialogFooter>
              {mode === "view" && currentNote?.id && (
                <>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setModalState({
                        ...modalState,
                        mode: "edit",
                        data: currentNote,
                      })
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(String(currentNote?.id), "note")}
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
