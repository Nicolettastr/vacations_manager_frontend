import { FormLabel } from "./form";

interface FormLabelRequiredProps {
  children: React.ReactNode;
  required?: boolean;
}

export function FormLabelRequired({
  children,
  required,
}: FormLabelRequiredProps) {
  return (
    <FormLabel>
      {children} {required && <span style={{ color: "red" }}>*</span>}
    </FormLabel>
  );
}
