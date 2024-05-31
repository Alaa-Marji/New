import { useState } from "react";
import EmailInputForm from "./EmailInputForm";
import OTPInput from "./OTPInput";
import ResetPassword from "./ResetPassword";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function PasswordResetComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (email) => {
    setEmail(email);
    setActiveStep(1); // Move to step 1 when email is submitted
  };

  const handleCodeSubmit = (code) => {
    setCode(code);
    setActiveStep(2);
  };

  const handlePasswordSubmit = (password, confirmPassword) => {
    setPassword(password);
    setConfirmPassword(confirmPassword);
    setActiveStep(3);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        {activeStep === 0 && <EmailInputForm onSubmit={handleEmailSubmit} />}
        {activeStep === 1 && (
          <OTPInput setCode={setCode} onSubmit={handleCodeSubmit} />
        )}
        {activeStep === 2 && (
          <ResetPassword code={code} onSubmit={handlePasswordSubmit} />
        )}
        {activeStep === 3 && (
          <div style={{ textAlign: "center", marginTop: "0" }}>
            <h2>Password Reset Successful!</h2>
            <p>You can now login with your new password.</p>
            <a
              href="/login"
              style={{ textDecoration: "none", marginLeft: "2px" }}
            >
              Login
            </a>
          </div>
        )}
        <div style={{ marginTop: "15px" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {["Email", "Code", "Change Password"].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetComponent;
