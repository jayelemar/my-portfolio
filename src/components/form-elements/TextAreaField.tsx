import { ComponentProps, ComponentType } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { LucideProps, MessageSquare, User } from "lucide-react";
import { Input } from "../ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

type TextAreaFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  containerStyles: string;
  icon: ComponentType<LucideProps>;
} & ComponentProps<"input">;

export default function TextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  containerStyles,
  icon: Icon,
}: TextAreaFieldProps<T>) {
  return (
    <div className={cn("relative", containerStyles)}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex w-full flex-col items-start justify-center">
            <FormLabel className="absolute left-6 top-0 z-10 bg-background px-1 text-muted-foreground">
              {label}
            </FormLabel>
            <FormControl>
              <Textarea
                className="min-h-[130px] rounded-2xl px-8 py-5 text-base lg:min-h-[180px]"
                {...field}
              />
            </FormControl>
            <FormMessage className="absolute -bottom-5 left-[28px] w-full text-xs" />
          </FormItem>
        )}
      />
      <Icon className=" absolute right-6 top-8" size={20} />
    </div>
  );
}
