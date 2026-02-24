"use client";

import { forwardRef, type KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { Button, Textarea } from "@/components/ui";

type ChatComposerProps = {
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

const ChatComposer = forwardRef<HTMLTextAreaElement, ChatComposerProps>(
  ({ value, loading = false, onChange, onSend }, ref) => {
    const disabled = !value.trim() || loading;

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!disabled) onSend();
      }
    };

    return (
      <div className="space-y-2 border-t border-[var(--border)] pt-3">
        <Textarea
          ref={ref}
          rows={3}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Vora for help..."
        />
        <div className="flex justify-end">
          <Button size="sm" loading={loading} disabled={disabled} onClick={onSend} rightIcon={<SendHorizontal size={14} />}>
            Send
          </Button>
        </div>
      </div>
    );
  }
);

ChatComposer.displayName = "ChatComposer";

export default ChatComposer;
export type { ChatComposerProps };
