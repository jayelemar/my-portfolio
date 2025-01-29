import { ComponentProps, ComponentType } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LucideProps, User } from "lucide-react";
import { Input } from "../ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

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
  icon: Icon,
}: InputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col items-start justify-center">
          <FormLabel className="absolute left-6 top-0 z-10 bg-background px-1 text-muted-foreground">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative flex w-full">
              <Input
                type={type}
                className="h-[54px] rounded-2xl px-8 text-base "
                {...field}
              />
              <Icon className=" absolute bottom-4 right-6" size={20} />
            </div>
          </FormControl>
          <FormMessage className="absolute -bottom-5 left-[28px] w-full text-xs" />
        </FormItem>
      )}
    />
  );
}
