"use client";

type StackTagsProps = {
  stack: string[];
};

export default function StackTags({ stack }: StackTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-xs text-[var(--text)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export type { StackTagsProps };
