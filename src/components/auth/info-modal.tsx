import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Check, OctagonAlert, X } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

interface IInfoModal {
  open: boolean;
  handler: (modal: boolean, type?: string) => void;
  title: string;
  message: string;
  type?: string;
}

export const InfoModal: React.FC<IInfoModal> = ({
  open,
  handler,
  title,
  message,
  type = "information",
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={() => handler(false)}>
      <DialogContent className="relative sm:max-w-[420px] rounded-2xl p-0 overflow-hidden bg-background shadow-xl">
        <X
          onClick={() => handler(false, "close")}
          className="icon cursor-pointer absolute right-2 top-2"
        />
        <div className="flex flex-col items-center gap-3 px-6 pt-8 pb-6 border-b">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {type === "warning" ? (
              <OctagonAlert className="h-6 w-6 text-primary" />
            ) : (
              <Check className="h-6 w-6 text-primary" />
            )}
          </div>

          <DialogTitle className="text-xl font-semibold text-center">
            {t(title)}
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground text-center">
            {t(message)}
          </DialogDescription>
        </div>

        <div className="px-6 pb-8">
          <Button
            className="w-full h-11 rounded-lg text-base font-medium mt-5"
            onClick={() => handler(false)}
          >
            {t("ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
