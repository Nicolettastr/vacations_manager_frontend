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
import { useGetNotesTypes } from "@/hooks/notes/useGetNotesTypes";
import { cn } from "@/lib/utils";
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
import { CalendarIcon, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useShallow } from "zustand/shallow";
import { Calendar } from "../ui/calendar";

export function NoteModal({
  isOpen,
  data,
  onClose,
  onSave,
  onDelete,
  mode,
  employees,
}: NoteModalProps) {
  const { t } = useTranslation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { notestypes } = useGetNotesTypes(isLoggedIn);
  const isEditMode = mode === "edit" || mode === "create";
  const [modalState, setModalState] = useModalStore(
    useShallow((state) => [state.modalState, state.setModalState]),
  );
  const selectedDate = useCommonDataStore((state) => state.selectedDate);

  const noteSchema = z.object({
    id: z.string().optional(),
    employee_id: z.string().optional().nullable(),
    type: z.union([z.literal("low"), z.literal("medium"), z.literal("high")], {
      required_error: t("formErrors.noteTypeRequired"),
    }),
    date: z.date({
      required_error: t("formErrors.dateRequired"),
    }),
    content: z.string().trim().min(1, t("formErrors.noteContentRequired")),
    title: z.string().trim().min(1, t("formErrors.noteTitleRequired")),
  });

  const defaultValues = {
    id: "",
    employee_id: "",
    date: selectedDate ? new Date(selectedDate) : new Date(),
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
      form.reset({
        id: data?.id,
        employee_id: data?.employee_id,
        date: data?.date ? new Date(data.date) : new Date(),
        type: data?.type,
        title: data?.title,
        content: data?.content,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [isOpen, data]);

  function onSubmit(values: z.infer<typeof noteSchema>) {
    const noteData: NoteCreateRequest = {
      id: values.id,
      employee_id: values.employee_id || undefined,
      date: format(values.date, "yyyy-MM-dd"),
      type: values.type,
      title: values.title,
      content: values.content,
    };
    onSave(noteData);
  }

  const currentNote = data as NoteResponse;
  const employee = employees?.find(
    (emp) => emp.id === currentNote?.employee_id,
  );

  const handleSetModal = () => {
    setModalState({
      ...modalState,
      mode: "edit",
      data: currentNote,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {mode === "create" && t("modal.createNote")}
                {mode === "edit" && t("modal.editNote")}
                {mode === "view" &&
                  `${t("modal.noteOf")} ${employee?.name || ""}`}
              </DialogTitle>
              {mode !== "view" && (
                <DialogDescription>
                  {t("modal.completeDetails")}
                </DialogDescription>
              )}
            </DialogHeader>
            {isEditMode ? (
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("title")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("noteTitlePlaceholder")}
                          {...field}
                        />
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
                      <FormLabel>{t("description")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("noteContentPlaceholder")}
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
                    <FormItem className="flex flex-col">
                      <FormLabel>{t("date")}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>{t("chooseDate")}</span>
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("noteImportance")}</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectNoteType")} />
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
                    <strong>{t("employee")}:</strong> {employee.name}{" "}
                    {employee.surname}
                  </p>
                )}
                <p>
                  <strong>{t("noteType")}:</strong> {currentNote?.type}
                </p>
                <p>
                  <strong>{t("date")}:</strong>{" "}
                  {currentNote?.date &&
                    format(new Date(currentNote.date), "PPP")}
                </p>
                <p>
                  <strong>{t("title")}:</strong> {currentNote?.title}
                </p>
                <p>
                  <strong>{t("note")}:</strong> {currentNote?.content}
                </p>
              </div>
            )}

            <DialogFooter>
              {mode === "view" && currentNote?.id && (
                <>
                  <Button variant="outline" onClick={handleSetModal}>
                    {t("edit")}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(String(currentNote?.id), "note")}
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
}
