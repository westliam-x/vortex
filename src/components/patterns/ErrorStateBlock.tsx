import { Button, ErrorState } from "@/components/ui";
import gracefulApiError from "@/shared/utils/gracefulApiError";

type ErrorStateBlockProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export default function ErrorStateBlock({
  title = "Something went wrong",
  description = gracefulApiError(),
  onRetry,
  retryLabel = "Retry",
}: ErrorStateBlockProps) {
  return (
    <ErrorState
      title={title}
      description={description}
      action={onRetry ? <Button variant="secondary" onClick={onRetry}>{retryLabel}</Button> : undefined}
    />
  );
}

export type { ErrorStateBlockProps };
