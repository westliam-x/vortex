import { Suspense } from "react";
import { Login } from "@/features/auth";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}
