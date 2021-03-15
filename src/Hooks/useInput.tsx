import React, { useState } from "react";

const useInput = (
  init = ""
): {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: string | null;
} => {
  const [value, setValue] = useState<string>(init);
  const [errors, setErrors] = useState<string | null>(null);
  const validateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "email") {
      const emailValid = e.target.value.match(
        /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
      );
      if (!emailValid) {
        setErrors("email is invalid");
        return;
      }
    }
    if (e.target.minLength) {
      const minValid = e.target.value.length >= e.target.minLength;
      if (!minValid) {
        setErrors("min size error");
        return;
      }
    }
    setErrors(null);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateField(e);
    setValue(e.target.value);
  };
  return { value, onChange, errors };
};

export default useInput;
