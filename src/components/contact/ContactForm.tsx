"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ArrowRightIcon,
  Loader2,
  MailIcon,
  MessageSquare,
  User,
} from "lucide-react";
import {
  contactRequestSchema,
  type ContactRequest,
} from "@/lib/contact-schema";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import InputField from "../form-elements/InputField";
import TextAreaField from "../form-elements/TextAreaField";
import ContactTurnstile, {
  type ContactSecurityHandle,
} from "./ContactTurnstile";

const ContactForm = () => {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState<{
    error: boolean;
    message: string;
  } | null>(null);
  const security = useRef<ContactSecurityHandle>(null);
  const draft = useRef<{ body: string; id: string }>();
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const form = useForm<ContactRequest>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });
  useEffect(() => {
    try {
      sessionStorage.removeItem("portfolio-contact-verification");
    } catch {
      /* Storage may be disabled. */
    }
  }, []);
  const onSubmit = async (data: ContactRequest) => {
    setStatus(null);
    setActive(true);
    const body = JSON.stringify(data);
    if (draft.current?.body !== body)
      draft.current = { body, id: crypto.randomUUID() };
    try {
      const turnstileToken = await security.current?.getToken();
      if (!turnstileToken)
        throw new Error(
          "The security check is unavailable. Please retry or email me directly.",
        );
      const response = await fetch("/api/contact/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken,
          submissionId: draft.current.id,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true)
        throw new Error(
          result.message ?? "Your message could not be sent. Please retry.",
        );
      form.reset();
      draft.current = undefined;
      setStatus({
        error: false,
        message: "Message sent. Thanks for reaching out!",
      });
    } catch (error) {
      setStatus({
        error: true,
        message:
          error instanceof Error && error.name !== "TimeoutError"
            ? error.message
            : "Delivery could not be confirmed. Please retry or email me directly.",
      });
    } finally {
      security.current?.reset();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onFocusCapture={() => setActive(true)}
        className="top-[27px] mx-auto flex w-full flex-col gap-y-4 md:mt-7 lg:mt-0 xl:relative"
      >
        <fieldset disabled={form.formState.isSubmitting}>
          <div
            aria-hidden="true"
            className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("website")}
            />
          </div>

          <div className="flex flex-1 flex-col sm:flex-row sm:gap-x-4 md:flex-col lg:flex-row">
            <div className="relative mb-6 flex w-full items-center lg:mb-6">
              <InputField
                control={form.control}
                name="name"
                label="Name:"
                type="text"
                icon={User}
                autoComplete="name"
                maxLength={80}
              />
            </div>

            <div className="relative mb-6 flex w-full items-center lg:mb-6">
              <InputField
                control={form.control}
                name="email"
                label="Email:"
                type="email"
                icon={MailIcon}
                autoComplete="email"
                maxLength={254}
              />
            </div>
          </div>

          <TextAreaField
            containerStyles="mb-8 lg:mb-6"
            control={form.control}
            name="message"
            label="Message:"
            description="At least 20 characters and 3 words. Up to 2,000 characters."
            icon={MessageSquare}
            maxLength={2_000}
          />
        </fieldset>
        {sitekey ? (
          <ContactTurnstile ref={security} sitekey={sitekey} active={active} />
        ) : (
          <p role="status" className="text-sm text-muted-foreground">
            The contact form is temporarily unavailable. Please{" "}
            <a
              href="mailto:jetermulo@gmail.com"
              className="underline underline-offset-4"
            >
              email me directly
            </a>
            .
          </p>
        )}
        {status && (
          <p
            role={status.error ? "alert" : "status"}
            className={
              status.error
                ? "text-sm text-destructive"
                : "text-sm text-forest-ink"
            }
          >
            {status.message}
            {status.error && (
              <>
                {" "}
                <a
                  href="mailto:jetermulo@gmail.com"
                  className="underline underline-offset-4"
                >
                  Email me directly
                </a>
                .
              </>
            )}
          </p>
        )}
        <Button
          type="submit"
          disabled={!sitekey || form.formState.isSubmitting}
          className="flex min-h-11 w-full items-center gap-2 rounded-full sm:max-w-sm xl:max-w-[400px]"
        >
          {form.formState.isSubmitting ? (
            <>
              <span>Sending…</span>
              <Loader2 aria-hidden="true" className="animate-spin" size={20} />
            </>
          ) : (
            <>
              <span>Send message</span>
              <ArrowRightIcon aria-hidden="true" size={20} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
export default ContactForm;
