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
import { Input } from "../ui/input";
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
import { useToast } from "../ui/use-toast";
import { useFormSubmit } from "@/service/formServices";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variant";

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
  const { toast } = useToast();
  const { mutate: FormSubmitMutation, isPending, isSuccess } = useFormSubmit();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });

    // try {
    //   const response = await fetch('api/sendEmail', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   if (response.ok) {
    //     console.log('Email sent successfully');
    //   } else {
    //     console.error('Error sending email1:', await response.text());
    //   }
    // } catch (error) {
    //   console.error('Error sending email2:', error);
    // }

    toast({
      title: `Hello ${values.name},`,
      description: `Thank you for reaching out.
      A confirmation email will be send to you within a day`,
    });

    try {
      new Promise((resolve) => setTimeout(resolve, 2000));

      await FormSubmitMutation(values);
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="top-[27px] mx-auto flex w-full flex-col gap-y-4 xl:relative"
        >
          <div className="flex flex-1 flex-col gap-4 sm:flex-row md:flex-col lg:flex-row xl:gap-5 ">
            {/* Name */}
            <div className="relative mb-2 mr-4 flex w-full items-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-start justify-center">
                    <FormLabel className="absolute left-6 top-0 z-10 bg-background px-1 text-muted-foreground">
                      Name:
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex w-full">
                        <Input
                          className="h-[54px] rounded-2xl px-8 text-base "
                          {...field}
                        />
                        <User
                          className=" absolute bottom-4 right-6"
                          size={20}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 left-[28px] w-full text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <div className="relative mb-2 flex w-full  items-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col items-start justify-center">
                    <FormLabel className="absolute left-6 top-0 z-10 bg-background px-1 text-muted-foreground">
                      Email:
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex w-full">
                        <Input
                          className="h-[54px] rounded-2xl px-8 text-base"
                          {...field}
                        />
                        <MailIcon
                          className=" absolute bottom-4 right-6"
                          size={20}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="absolute -bottom-5 left-[28px] w-full text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Message */}
          <div className="relative mb-3">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start justify-center">
                  <FormLabel className="absolute left-6 top-0 bg-background px-1 text-muted-foreground">
                    Message:
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
            <MessageSquare className=" absolute right-6 top-8" size={20} />
          </div>

          <Button
            type="submit"
            disabled={isPending || isSuccess}
            className="flex w-full items-center gap-2 rounded-full sm:max-w-48 xl:max-w-[400px] "
          >
            {isPending ? (
              <>
                <span>Loading</span>
                <Loader2 className="animate-spin" size={20} />
              </>
            ) : isSuccess ? (
              <>
                <span>Message Sent</span>
                <Check size={20} />
              </>
            ) : (
              <>
                <span>Let&apos;s Talk</span>
                <ArrowRightIcon size={20} />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
