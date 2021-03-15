// @ts-nocheck
import React, { useCallback, useEffect, useMemo } from "react";
import { requestServer } from "../../API/Api";
import { setAuthInfo, setContent } from "../../Redux/Reducers/content_reducer";
import { connect } from "react-redux";
import Registration from "./Registration";
import LogIn from "./LogIn";
import RegistrConfirm from "./RegistrConfirm";
import { StepTypes, useAuth } from "./AuthContext";

interface AuthProps {
  isAuth?: boolean;
  token?: string | null;
  setContent?: (val: number) => void;
  setAuth?: (val1: boolean, val2: string | null) => void;
}

const Auth = ({ isAuth, token, setContent, setAuth }: AuthProps) => {
  const { step } = useAuth();
  const doLogout = useCallback(async () => {
    setAuth(false, null);
    await requestServer.logOut();
  }, []);
  return (
    <>
      {isAuth ? (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(127, 36, 213, 0.5)",
          }}
        >
          <button
            style={{
              textAlign: "center",
              width: 120,
              height: 40,
              borderRadius: 10,
              backgroundColor: "lightskyblue",
            }}
            onClick={doLogout}
          >
            {"Выйти"}
          </button>
        </div>
      ) : (
        <>
          {step === StepTypes.LOGIN ? (
            <LogIn />
          ) : step === StepTypes.REGISTR ? (
            <Registration />
          ) : (
            step === StepTypes.REGISTR_CONFIRM && <RegistrConfirm />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.content.isAuth,
    token: state.content.token,
  };
};

const mapDispatchToProps = {
  setContent: setContent,
  setAuth: setAuthInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
