import React, { createContext, useState, useContext, useCallback } from "react";

interface AuthProps {
  children: any;
}

export enum StepTypes {
  REGISTR = "REGISTRATION",
  REGISTR_CONFIRM = "REGISTR_CONFIRM",
  LOGIN = "LOGIN",
}

export interface ContextType {
  step: string;
  setStepAction: (val: StepTypes) => void;
}

export const AuthContext = createContext<ContextType>({
  step: StepTypes.LOGIN,
  setStepAction: (val = StepTypes.LOGIN) => {},
});

export const useAuth = (): ContextType => useContext(AuthContext);

const AuthProvider = ({ children }: AuthProps) => {
  const [step, setStep] = useState<StepTypes>(StepTypes.LOGIN);

  const setStepAction = useCallback(
    (val: StepTypes) => {
      setStep(val);
    },
    [step]
  );

  return (
    <AuthContext.Provider
      value={{
        step,
        setStepAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
