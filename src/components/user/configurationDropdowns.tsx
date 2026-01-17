import { useAuthStore } from "@/store/useAuthStore";
import { ITypes } from "@/types/common";
import { Languages, Palette } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IConfigurationDropdowns {
  editUser: boolean;
  data: ITypes[];
  name: string;
}

export const ConfigurationDropdowns: React.FC<IConfigurationDropdowns> = ({
  editUser,
  data,
  name,
}) => {
  const { t } = useTranslation();

  const setPreviewTheme = useAuthStore((state) => state.setPreviewTheme);

  const form = useFormContext();

  const handleThemeChange = (value: string) => {
    if (name === "theme") {
      setPreviewTheme(value);
    }
  };

  const dropdownTitle = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-2">
          {name === "theme" ? (
            <Palette className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Languages className="h-5 w-5 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">{t(dropdownTitle)}</span>
        </div>

        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {!editUser ? (
                  <Input
                    {...field}
                    value={t(field.value)}
                    type="text"
                    placeholder={t(name)}
                    className="user-edit-input w-full"
                    disabled={!editUser}
                    onChange={() => handleThemeChange(field.value)}
                  />
                ) : (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleThemeChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t(name)} />
                    </SelectTrigger>
                    <SelectContent className="z-[80]">
                      {data.map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          {t(item.name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
