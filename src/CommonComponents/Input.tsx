// @ts-nocheck
import React, { useCallback, useMemo, useState } from "react";
import "./input.css";

enum FOCUS {
  DEFAULT = "DEFAULT",
  ENTER = "ENTER",
  LEAVE = "LEAVE",
}

export enum TYPE {
  text = "text",
  email = "email",
  password = "password",
}

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: TYPE;
  label?: string;
  errors?: string | null;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
}

const Input = ({
  value,
  onChange,
  type,
  label,
  errors,
  minLength,
  maxLength,
  required,
}: InputProps) => {
  const [entered, setEntered] = useState(FOCUS.DEFAULT);
  const [focused, setFocused] = useState<string | null>(null);
  const onFocus = useCallback(() => {
    setFocused(true);
    entered === FOCUS.DEFAULT && setEntered(FOCUS.ENTER);
  }, [entered, setEntered, setFocused]);
  const onBlur = useCallback(() => {
    setFocused(false);
    entered === FOCUS.ENTER && setEntered(FOCUS.LEAVE);
  }, [entered, setEntered, setFocused]);
  const error = useMemo(() => {
    const er =
      required && entered === FOCUS.LEAVE && value.length === 0
        ? "cannot be empty"
        : false;
    return er ? er : errors ? errors : false;
  }, [errors, entered, value, required]);
  return (
    <>
      <input
        className={"input" + (error || focused ? " focus" : "")}
        type={type ? type : TYPE.text}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {label && (
        <label
          className={"label" + (focused || value.length > 0 ? " label-up" : "")}
        >
          {label}
        </label>
      )}
      {error && <span className={"error-input"}>{error}</span>}
    </>
  );
};

export default Input;
