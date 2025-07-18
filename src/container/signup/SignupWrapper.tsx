"use client";

import { StepDetails, StepEmail, StepVerifyOTP } from "@/forms";
import { useState } from "react";

const SignupWrapper = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const details = {
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="max-w-md mx-auto px-3">
      {step === 1 && (
        <StepEmail
          initialEmail={email}
          
          onNext={(emailInput) => {
            setEmail(emailInput);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <StepVerifyOTP
          email={email}
          onVerified={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <StepDetails
          email={email}
          initialData={details}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
};


export default SignupWrapper;
