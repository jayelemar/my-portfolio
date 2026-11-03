import { ComponentProps, ComponentType } from "react";
import { FormField } from "../ui/form";
import { LucideProps } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import FieldFrame, { contactFieldStyles } from "./FieldFrame";

type TextAreaFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  containerStyles: string;
  icon: ComponentType<LucideProps>;
  description?: string;
} & ComponentProps<"textarea">;

export default function TextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  containerStyles,
  icon,
  className,
  description,
  ...textareaProps
}: TextAreaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FieldFrame
          label={label}
          icon={icon}
          multiline
          className={containerStyles}
          description={description}
        >
          <Textarea
            className={cn(
              contactFieldStyles,
              "min-h-[130px] py-5 lg:min-h-[180px]",
              className,
            )}
            {...textareaProps}
            {...field}
          />
        </FieldFrame>
      )}
    />
  );
}
