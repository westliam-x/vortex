"use client";

import { StepDetails, StepEmail, StepVerifyOTP } from "@/forms";
import { useState } from "react";

type Step = 1 | 2 | 3;

const SignupWrapper = () => {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-[#1E1E2E] p-6 rounded-xl border border-[#2F2F41]">
      {step === 1 && (
        <StepEmail
          onNext={(emailInput) => {
            setEmail(emailInput);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepVerifyOTP
          email={email}
          onVerified={() => {
            setOtpVerified(true);
            setStep(3);
          }}
        />
      )}

      {step === 3 && <StepDetails email={email} />}
    </div>
  );
};

export default SignupWrapper;
