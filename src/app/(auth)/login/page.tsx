import { Suspense } from "react";
import { Login } from "@/container";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}
