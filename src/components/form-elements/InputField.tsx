import { ComponentProps, ComponentType } from "react";
import { FormField } from "../ui/form";
import { LucideProps } from "lucide-react";
import { Input } from "../ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import FieldFrame, { contactFieldStyles } from "./FieldFrame";
import { cn } from "@/lib/utils";

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type: string;
  icon: ComponentType<LucideProps>;
} & ComponentProps<"input">;

export default function InputField<T extends FieldValues>({
  control,
  name,
  label,
  type,
  icon,
  className,
  ...inputProps
}: InputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FieldFrame label={label} icon={icon}>
          <Input
            type={type}
            className={cn(contactFieldStyles, "h-contact-field", className)}
            {...inputProps}
            {...field}
          />
        </FieldFrame>
      )}
    />
  );
}
