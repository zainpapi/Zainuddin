"use client";

import { useCountUp } from "@/lib/hooks";

/** A single animated stat counter. */
export function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: display } = useCountUp(value);

  return (
    <div className="surface rounded-[var(--radius)] p-6 text-center">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="font-display text-4xl text-amber sm:text-5xl"
      >
        {display}
        <span className="text-amber">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-ink-lo">{label}</div>
    </div>
  );
}
