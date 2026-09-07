"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ArrowRightIcon,
  Loader2,
  MailCheck,
  MailIcon,
  MessageSquare,
  RotateCcw,
  User,
} from "lucide-react";
import {
  contactRequestSchema,
  type ContactRequest,
} from "@/lib/contact-schema";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import InputField from "../form-elements/InputField";
import TextAreaField from "../form-elements/TextAreaField";

const STORAGE_KEY = "portfolio-contact-verification";

type ChallengeState = {
  challengeId: string;
  maskedEmail: string;
  expiresAt: number;
  resendAvailableAt: number;
};

type ApiError = {
  message?: string;
};

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => ({}))) as T & ApiError;

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(
        payload.message ?? "Too many attempts. Please try again later.",
      );
    }
    throw new Error(
      payload.message ?? "The contact service is temporarily unavailable.",
    );
  }

  return payload;
}

const ContactForm = () => {
  const [challenge, setChallenge] = useState<ChallengeState | null>(null);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const form = useForm<ContactRequest>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as ChallengeState;
      if (
        parsed.challengeId &&
        parsed.maskedEmail &&
        parsed.expiresAt > Date.now()
      ) {
        setChallenge(parsed);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!challenge) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, [challenge]);

  const resendSeconds = useMemo(
    () =>
      challenge
        ? Math.max(0, Math.ceil((challenge.resendAvailableAt - now) / 1_000))
        : 0,
    [challenge, now],
  );
  const isExpired = Boolean(challenge && challenge.expiresAt <= now);

  const rememberChallenge = (nextChallenge: ChallengeState) => {
    setChallenge(nextChallenge);
    setNow(Date.now());
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextChallenge));
  };

  const clearChallenge = () => {
    setChallenge(null);
    setCode("");
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const onSubmit = async (data: ContactRequest) => {
    try {
      const nextChallenge = await postJson<ChallengeState>(
        "/api/contact/request",
        data,
      );
      rememberChallenge(nextChallenge);
      toast.success(`Verification code sent to ${nextChallenge.maskedEmail}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const onVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!challenge || !/^\d{6}$/.test(code)) {
      toast.error("Enter the 6-digit verification code.");
      return;
    }

    setIsVerifying(true);
    try {
      await postJson<{ success: true }>("/api/contact/verify", {
        challengeId: challenge.challengeId,
        code,
      });
      clearChallenge();
      form.reset();
      toast.success("Email verified—message sent successfully!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Verification failed.";
      toast.error(message);
      if (/expired|start again/i.test(message)) clearChallenge();
    } finally {
      setIsVerifying(false);
    }
  };

  const onResend = async () => {
    if (!challenge || resendSeconds > 0) return;

    setIsResending(true);
    try {
      const nextChallenge = await postJson<ChallengeState>(
        "/api/contact/resend",
        { challengeId: challenge.challengeId },
      );
      rememberChallenge(nextChallenge);
      setCode("");
      toast.success(`A new code was sent to ${nextChallenge.maskedEmail}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not resend the code.",
      );
    } finally {
      setIsResending(false);
    }
  };

  if (challenge) {
    return (
      <div className="top-[27px] mx-auto flex w-full flex-col items-center rounded-2xl border border-border bg-background/60 p-6 text-center md:mt-7 lg:-mt-12 lg:max-w-[680px] lg:items-stretch lg:px-10 lg:py-8 xl:relative xl:top-0">
        <MailCheck className="mb-3 text-primary lg:hidden" size={42} />
        <h3 className="text-xl font-semibold lg:mx-auto lg:w-full lg:max-w-[520px] lg:text-2xl">
          You’re almost there!
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground lg:mx-auto lg:w-full lg:max-w-[520px] lg:leading-relaxed">
          We sent a 6-digit code to {challenge.maskedEmail}. Enter it below to
          confirm your email and send your message.
        </p>

        <form
          className="mt-6 w-full max-w-sm lg:mx-auto lg:mt-7 lg:max-w-[520px]"
          onSubmit={onVerify}
        >
          <div className="relative w-full">
            <label
              className="sr-only lg:not-sr-only lg:absolute lg:-top-2.5 lg:left-6 lg:z-10 lg:bg-background lg:px-1 lg:text-sm lg:text-muted-foreground"
              htmlFor="contact-verification-code"
            >
              Verification code:
            </label>
            <Input
              id="contact-verification-code"
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="000000"
              disabled={isVerifying || isExpired}
              className="h-14 text-center text-2xl tracking-[0.5em] lg:h-[54px] lg:rounded-2xl lg:px-8 lg:pr-14"
            />
            <MailCheck
              aria-hidden="true"
              className="absolute bottom-4 right-6 hidden text-primary lg:block"
              size={20}
            />
          </div>

          <Button
            type="submit"
            disabled={isVerifying || isExpired || code.length !== 6}
            className="mt-4 flex w-full items-center gap-2 rounded-full lg:mt-5"
          >
            {isVerifying ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying
              </>
            ) : (
              <>
                <MailCheck size={20} />
                Confirm Email &amp; Send Message
              </>
            )}
          </Button>

          {!isExpired && (
            <p className="mt-4 text-sm text-muted-foreground lg:mt-5 lg:leading-relaxed">
              This quick check ensures I can reply to you while keeping unwanted
              messages away.
            </p>
          )}

          {isExpired && (
            <p className="mt-4 text-sm text-destructive lg:mt-5">
              This code has expired. Please start again.
            </p>
          )}

          <div className="mt-2 flex flex-col items-center justify-center lg:mt-4 lg:flex-row lg:justify-between lg:gap-4">
            {!isExpired && (
              <Button
                type="button"
                variant="ghost"
                disabled={isResending || resendSeconds > 0}
                onClick={onResend}
                className="gap-2"
              >
                {isResending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <RotateCcw size={16} />
                )}
                Resend code
              </Button>
            )}

            <Button
              type="button"
              variant="link"
              onClick={clearChallenge}
              className="w-full lg:w-auto"
            >
              Update email or message
            </Button>
          </div>

          {!isExpired && (
            <p className="text-sm text-muted-foreground lg:mt-2">
              This code expires in 15 minutes.
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
            icon={MessageSquare}
            maxLength={2_000}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex w-full items-center gap-1 rounded-full sm:max-w-64 xl:max-w-[400px]"
          >
            {form.formState.isSubmitting ? (
              <>
                <span>Sending code</span>
                <Loader2 className="animate-spin" size={20} />
              </>
            ) : (
              <>
                <span>Send Message</span>
                <ArrowRightIcon size={20} />
              </>
            )}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default ContactForm;
