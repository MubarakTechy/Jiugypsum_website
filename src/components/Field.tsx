import type { ReactNode } from "react";

export function Field({ id, label, optional, error, hint, children, className = "" }: { id: string; label: string; optional?: boolean; error?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      {error && (
        <p className="err" id={`${id}-err`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const describe = (id: string, error?: string, hint?: string) => (error ? `${id}-err` : hint ? `${id}-hint` : undefined);
