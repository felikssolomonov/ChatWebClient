import React, { useCallback, useMemo, useState } from "react";
import { requestServer } from "../../API/Api";
import Input, { TYPE } from "../../CommonComponents/Input";
import useInput from "../../Hooks/useInput";
import { StepTypes, useAuth } from "./AuthContext";

const Registration = () => {
  const [error, setError] = useState<string | null>(null);
  const { setStepAction } = useAuth();
  const { value: name, onChange: onChangeName, errors: nameErrors } = useInput(
    ""
  );
  const {
    value: email,
    onChange: onChangeEmail,
    errors: emailErrors,
  } = useInput("");
  const {
    value: password,
    onChange: onChangePassword,
    errors: passwordErrors,
  } = useInput("");
  const activeButton = useMemo(() => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      !nameErrors &&
      !emailErrors &&
      !passwordErrors
    );
  }, [name, email, password, nameErrors, emailErrors, passwordErrors]);
  const doRegistration = useCallback(async () => {
    const result = await requestServer.registration({ name, email, password });
    if (result.status === 9) {
      setStepAction(StepTypes.REGISTR_CONFIRM);
      setError(null);
    } else {
      setError(result.message);
    }
  }, [name, email, password]);
  const changeToLogin = useCallback(async () => {
    setStepAction(StepTypes.LOGIN);
  }, []);
  return (
    <div className="box">
      <span className="text-center">{"Регистрация"}</span>
      {error && <span className={"error-common"}>{error}</span>}
      <div className="input-container">
        <Input
          value={name}
          onChange={onChangeName}
          type={TYPE.text}
          label={"Name"}
          errors={nameErrors}
          minLength={2}
          maxLength={20}
          required
        />
      </div>
      <div className="input-container">
        <Input
          value={email}
          onChange={onChangeEmail}
          type={TYPE.email}
          label={"Email"}
          errors={emailErrors}
          minLength={6}
          maxLength={20}
          required
        />
      </div>
      <div className="input-container">
        <Input
          value={password}
          onChange={onChangePassword}
          type={TYPE.password}
          label={"Password"}
          errors={passwordErrors}
          minLength={6}
          maxLength={20}
          required
        />
      </div>
      <button
        type={"button"}
        className={"btn" + (activeButton ? "" : " disabled")}
        onClick={activeButton ? doRegistration : () => {}}
      >
        {"Зарегистрироваться"}
      </button>
      <label onClick={changeToLogin} className={"link"}>
        {"Войти"}
      </label>
    </div>
  );
};

export default Registration;
