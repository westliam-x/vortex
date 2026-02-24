"use client";

import { forwardRef, type KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { Button, Textarea } from "@/components/ui";

type GuestMessageComposerProps = {
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

const GuestMessageComposer = forwardRef<HTMLTextAreaElement, GuestMessageComposerProps>(
  ({ value, loading = false, onChange, onSend }, ref) => {
    const disabled = !value.trim() || loading;

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!disabled) onSend();
      }
    };

    return (
      <div className="space-y-2">
        <Textarea
          ref={ref}
          rows={3}
          value={value}
          onKeyDown={onKeyDown}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Write a message for the project team..."
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            loading={loading}
            disabled={disabled}
            rightIcon={<SendHorizontal size={14} />}
            onClick={onSend}
          >
            Send message
          </Button>
        </div>
      </div>
    );
  }
);

GuestMessageComposer.displayName = "GuestMessageComposer";

export default GuestMessageComposer;
export type { GuestMessageComposerProps };
