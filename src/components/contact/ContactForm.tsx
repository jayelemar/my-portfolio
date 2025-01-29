"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRightIcon,
  Check,
  Loader2,
  MailIcon,
  MessageSquare,
  User,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import toast from "react-hot-toast";
import InputField from "../form-elements/InputField";
import TextAreaField from "../form-elements/TextAreaField";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
});

const ContactForm = () => {
  // const { mutate: FormSubmitMutation, isPending, isSuccess } = useFormSubmit();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const isPending = form.formState.isSubmitting;
  const isSuccess = form.formState.isSubmitSuccessful;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });

    // Use toast.promise to handle loading and success/error states
    await toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          // Simulate loading (optional)
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Resolve the promise to indicate success
          resolve("Message sent successfully");
          form.reset();
        } catch (error) {
          console.error("Error sending email:", error);

          // Reject the promise to indicate failure
          reject(new Error("Failed to send message. Please try again later."));
        }
      }),
      {
        loading: "Sending your message...",
        success: (message) => `${message}`,
        error: (error) =>
          `❌ ${error.message || "Something went wrong. Please try again."}`,
      },
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="top-[27px] mx-auto flex w-full flex-col gap-y-4 md:mt-7 lg:mt-0 xl:relative"
        >
          <fieldset disabled={isPending || isSuccess}>
            <div className="flex flex-1 flex-col sm:flex-row sm:gap-x-4 md:flex-col lg:flex-row ">
              {/* Name */}
              <div className="relative mb-6 flex w-full items-center lg:mb-6">
                <InputField
                  control={form.control}
                  name="name"
                  label="Name:"
                  type="text"
                  icon={User}
                />
              </div>

              {/* Email */}
              <div className="relative mb-6 flex w-full items-center  lg:mb-6">
                <InputField
                  control={form.control}
                  name="email"
                  label="Email:"
                  type="email"
                  icon={MailIcon}
                />
              </div>
            </div>

            {/* Message */}
            <TextAreaField
              containerStyles="mb-8 lg:mb-6"
              control={form.control}
              name="message"
              label="Message:"
              icon={MessageSquare}
            />

            <Button
              type="submit"
              disabled={isPending || isSuccess}
              className="flex w-full items-center gap-1 rounded-full sm:max-w-48 xl:max-w-[400px] "
            >
              {isPending ? (
                <>
                  <span>Loading</span>
                  <Loader2 className="animate-spin" size={20} />
                </>
              ) : isSuccess ? (
                <span className="flex gap-2">
                  <span>Message Sent</span>
                  <Check size={20} />
                </span>
              ) : (
                <>
                  <span>Let&apos;s Talk</span>
                  <ArrowRightIcon size={20} />
                </>
              )}
            </Button>
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
