import React, { useState, useCallback, SetStateAction, Dispatch } from "react";

const useInput = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value);
    },
    [],
  );

  return [value, handler, setValue];
};

export default useInput;
