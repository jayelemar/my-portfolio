"use client";

import Script from "next/script";
import { useTheme } from "next-themes";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
export type ContactSecurityHandle = {
  getToken: () => Promise<string>;
  reset: () => void;
};

const ContactTurnstile = forwardRef<
  ContactSecurityHandle,
  { sitekey: string; active: boolean }
>(function ContactTurnstile({ sitekey, active }, ref) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string>();
  const token = useRef<{ value: string; time: number }>();
  const failure = useRef(false);
  const mounted = useRef(true);
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [compact, setCompact] = useState(false);
  const reset = () => {
    token.current = undefined;
    if (widget.current !== undefined) {
      failure.current = false;
      setError(false);
      window.turnstile?.reset(widget.current);
    }
  };
  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) =>
      setCompact(entry.contentRect.width < 300),
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useImperativeHandle(ref, () => ({
    reset,
    getToken: async () => {
      if (token.current && Date.now() - token.current.time > 240000) reset();
      const started = Date.now();
      while (mounted.current && Date.now() - started < 60000) {
        if (failure.current)
          throw new Error(
            "The security check could not load. Please retry the check below or email me directly.",
          );
        if (token.current) return token.current.value;
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      failure.current = true;
      setError(true);
      throw new Error(
        "The security check took too long. Please retry or email me directly.",
      );
    },
  }));
  useEffect(() => {
    if (!active || !ready || !container.current || !window.turnstile) return;
    const api = window.turnstile;
    token.current = undefined;
    widget.current = api.render(container.current, {
      sitekey,
      action: "contact",
      appearance: "interaction-only",
      theme: resolvedTheme === "dark" ? "dark" : "light",
      size: compact ? "compact" : "flexible",
      callback: (value: string) => {
        token.current = { value, time: Date.now() };
        failure.current = false;
        setError(false);
      },
      "expired-callback": () => {
        token.current = undefined;
        if (widget.current !== undefined) api.reset(widget.current);
      },
      "error-callback": () => {
        token.current = undefined;
        failure.current = true;
        setError(true);
      },
    });
    return () => {
      if (widget.current !== undefined) api.remove(widget.current);
      widget.current = undefined;
      token.current = undefined;
    };
  }, [active, ready, sitekey, resolvedTheme, attempt, compact]);
  return (
    <>
      {active && (
        <Script
          key={attempt}
          src={`https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&retry=${attempt}`}
          onReady={() => setReady(true)}
          onError={() => {
            failure.current = true;
            setError(true);
          }}
        />
      )}
      <div ref={container} />
      {error && (
        <p role="alert" className="text-sm text-destructive">
          The security check could not load.{" "}
          <button
            type="button"
            className="underline underline-offset-4"
            onClick={() => {
              reset();
              failure.current = false;
              setError(false);
              setReady(false);
              setAttempt((value) => value + 1);
            }}
          >
            Retry security check
          </button>
        </p>
      )}
    </>
  );
});
export default ContactTurnstile;
