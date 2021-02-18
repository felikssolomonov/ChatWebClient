import React, { useCallback, useMemo, useState } from "react";

interface InputProps {
  type?: string;
  maxLength?: number;
  value: string | number;
  onChange: () => void;
}

const Input = ({ type, maxLength, value, onChange }: InputProps) => {
  const typeInput = useMemo(() => {
    return type ? type : "text";
  }, [type]);

  const maxLengthInput = useMemo(() => {
    return maxLength ? maxLength : undefined;
  }, [maxLength]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        backgroundColor: "lightgrey",
        width: 100,
      }}
    >
      <input
        type={typeInput}
        value={value}
        onChange={onChange}
        maxLength={maxLengthInput}
      />
    </div>
  );
};

export default Input;
