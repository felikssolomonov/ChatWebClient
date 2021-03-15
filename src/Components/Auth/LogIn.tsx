// @ts-nocheck
import React, { useCallback, useMemo, useState } from "react";
import { requestServer } from "../../API/Api";
import Input, { TYPE } from "../../CommonComponents/Input";
import useInput from "../../Hooks/useInput";
import { StepTypes, useAuth } from "./AuthContext";
import "./Login.css";
import { setAuthInfo } from "../../Redux/Reducers/content_reducer";
import { connect } from "react-redux";

interface AuthProps {
  setAuth: (isAuth: boolean, token: string | null) => void;
}

const LogIn = ({ setAuth }: AuthProps) => {
  const [error, setError] = useState<string | null>(null);
  const { setStepAction } = useAuth();
  const {
    value: email,
    onChange: onChangeEmail,
    errors: emailErrors,
  } = useInput("felikssolomonov@gmail.co");
  const {
    value: password,
    onChange: onChangePassword,
    errors: passwordErrors,
  } = useInput("");
  const activeButton = useMemo(() => {
    return (
      email.length > 0 && password.length > 0 && !emailErrors && !passwordErrors
    );
  }, [email, password, emailErrors, passwordErrors]);
  const doLogin = useCallback(async () => {
    const result = await requestServer.logIn({ email, password });
    if (result.status === 0) {
      setAuth(true, result.token);
    } else {
      setError(result.message);
    }
  }, [email, password]);
  const changeToReg = useCallback(() => {
    setStepAction(StepTypes.REGISTR);
  }, []);

  return (
    <div className="box">
      <span className="text-center">{"Вход"}</span>
      {error && <span className={"error-common"}>{error}</span>}
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
        onClick={activeButton ? doLogin : () => {}}
      >
        {"Войти"}
      </button>
      <label onClick={changeToReg} className={"link"}>
        {"Зарегистрироваться"}
      </label>
    </div>
  );
};

const mapDispatchToProps = {
  setAuth: setAuthInfo,
};

export default connect(null, mapDispatchToProps)(LogIn);
