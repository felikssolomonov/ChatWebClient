// @ts-nocheck
import React, { useCallback, useState } from "react";
import Input from "../../CommonComponents/Input";
import useInput from "../../Hooks/useInput";

interface AuthProps {
  userId: string;
}

const Auth = ({ userId }: AuthProps) => {
  const [login, onChangeLogin] = useInput("");
  const [password, onChangePassword] = useInput("");
  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "pink",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Input maxLength={20} value={login} onChange={onChangeLogin} />
      <Input
        type={"password"}
        maxLength={10}
        value={password}
        onChange={onChangePassword}
      />
      {login + " : " + password}
    </div>
  );
};

export default Auth;
