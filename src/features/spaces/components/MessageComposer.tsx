"use client";

import { forwardRef, type KeyboardEvent, type TextareaHTMLAttributes } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { Button, Textarea } from "@/components/ui";

type MessageComposerProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "value"
> & {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttachClick?: () => void;
  sending?: boolean;
  sendDisabled?: boolean;
};

const MessageComposer = forwardRef<HTMLTextAreaElement, MessageComposerProps>(
  (
    { value, onChange, onSend, onAttachClick, sending, sendDisabled, placeholder = "Write a message...", ...props },
    ref
  ) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!sendDisabled && !sending) {
          onSend();
        }
      }
    };

    return (
      <div className="space-y-3">
        <Textarea
          ref={ref}
          rows={3}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          {...props}
        />
        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            leftIcon={<Paperclip size={14} />}
            onClick={onAttachClick}
          >
            Attach
          </Button>
          <Button
            type="button"
            size="sm"
            loading={sending}
            disabled={sendDisabled}
            rightIcon={<SendHorizontal size={14} />}
            onClick={onSend}
          >
            Send
          </Button>
        </div>
      </div>
    );
  }
);

MessageComposer.displayName = "MessageComposer";

export default MessageComposer;
export type { MessageComposerProps };
