// @ts-nocheck
import React, { useCallback, useMemo, useState } from "react";
import { requestServer } from "../../API/Api";
import Input, { TYPE } from "../../CommonComponents/Input";
import useInput from "../../Hooks/useInput";
import { setAuthInfo } from "../../Redux/Reducers/content_reducer";
import { StepTypes, useAuth } from "./AuthContext";
import { connect } from "react-redux";

interface AuthProps {
  setAuth: (isAuth: boolean, token: string | null) => void;
}

const RegistrConfirm = ({ setAuth }: AuthProps) => {
  const [error, setError] = useState<string | null>(null);
  const { setStepAction } = useAuth();
  const {
    value: email,
    onChange: onChangeEmail,
    errors: emailErrors,
  } = useInput("");
  const {
    value: hashPassword,
    onChange: onChangeHashPassword,
    errors: hashErrors,
  } = useInput("");
  const activeButton = useMemo(() => {
    return (
      email.length > 0 && hashPassword.length > 0 && !emailErrors && !hashErrors
    );
  }, [email, hashPassword, emailErrors, hashErrors]);
  const doRegistrConfirm = useCallback(async () => {
    const result = await requestServer.registrConfirm({ email, hashPassword });
    if (result.status === 0) {
      setStepAction(StepTypes.LOGIN);
      setAuth(true, result.token);
    } else {
      setError(result.message);
    }
  }, [email, hashPassword]);
  const changeToReg = useCallback(() => {
    setStepAction(StepTypes.REGISTR);
  }, []);
  const changeToLogin = useCallback(async () => {
    setStepAction(StepTypes.LOGIN);
  }, []);
  return (
    <div className="box">
      <span className="text-center">{"Подтверждение"}</span>
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
          value={hashPassword}
          onChange={onChangeHashPassword}
          type={TYPE.password}
          label={"HashPassword"}
          errors={hashErrors}
          minLength={6}
          maxLength={20}
          required
        />
      </div>
      <button
        type={"button"}
        className={"btn" + (activeButton ? "" : " disabled")}
        onClick={activeButton ? doRegistrConfirm : () => {}}
      >
        {"Завершить регистрацию"}
      </button>
      <label onClick={changeToReg} className={"link"}>
        {"Зарегистрироваться"}
      </label>
      <label onClick={changeToLogin} className={"link"}>
        {"Войти"}
      </label>
    </div>
  );
};

const mapDispatchToProps = {
  setAuth: setAuthInfo,
};

export default connect(null, mapDispatchToProps)(RegistrConfirm);
