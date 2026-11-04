import type { ComponentType, ReactElement } from "react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../ui/form";

/** Merge with cn so these styles override the base Input/Textarea utilities. */
export const contactFieldStyles = "rounded-2xl pl-8 pr-14 text-base";

export type FieldFrameProps = {
  label: string;
  icon: ComponentType<LucideProps>;
  /** Pass the input or textarea directly so FormControl labels the control. */
  children: ReactElement;
  multiline?: boolean;
  className?: string;
  description?: string;
};

function FieldControl({
  children,
  hasDescription,
}: {
  children: ReactElement;
  hasDescription: boolean;
}) {
  const { error, formDescriptionId, formMessageId } = useFormField();
  const describedBy =
    [hasDescription && formDescriptionId, error && formMessageId]
      .filter(Boolean)
      .join(" ") || undefined;

  return <FormControl aria-describedby={describedBy}>{children}</FormControl>;
}

/** Contact field framing. Must be rendered within Form and FormField. */
export default function FieldFrame({
  label,
  icon: Icon,
  children,
  multiline = false,
  className,
  description,
}: FieldFrameProps) {
  return (
    <FormItem
      className={cn(
        "relative flex w-full flex-col items-start justify-center",
        className,
      )}
    >
      <FormLabel className="absolute left-6 top-0 z-10 bg-background px-1 text-muted-foreground">
        {label}
      </FormLabel>
      <FieldControl hasDescription={Boolean(description)}>
        {children}
      </FieldControl>
      <Icon
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-6 !mt-0 text-muted-foreground",
          multiline ? "top-8" : "top-[25px]",
        )}
        size={20}
      />
      {description && (
        <FormDescription className="px-2 text-sm">
          {description}
        </FormDescription>
      )}
      <FormMessage className="px-2 text-sm" />
    </FormItem>
  );
}
