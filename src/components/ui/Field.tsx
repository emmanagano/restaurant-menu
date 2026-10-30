import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClass =
  "min-h-tap w-full rounded-control border-2 border-ink bg-canvas px-4 text-body text-ink";

export function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 font-semibold">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 size-5 shrink-0 fill-none stroke-current stroke-2">
        <path d="M12 8v5m0 3h.01M10.3 4.5 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </p>
  );
}

type FieldProps = { name: string; label: string; error?: string; className?: string };

/** Label + input + linked error message. The error is announced through `aria-describedby`. */
export function TextField({
  name,
  label,
  error,
  className,
  ...input
}: FieldProps & Omit<ComponentProps<"input">, "name" | "className">) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
        {...input}
      />
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  error,
  className,
  ...input
}: FieldProps & Omit<ComponentProps<"textarea">, "name" | "className">) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block font-semibold">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(inputClass, "py-3")}
        {...input}
      />
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

export function SelectField({
  name,
  label,
  error,
  className,
  children,
  ...input
}: FieldProps & Omit<ComponentProps<"select">, "name" | "className">) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block font-semibold">
        {label}
      </label>
      <select
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
        {...input}
      >
        {children}
      </select>
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}
