import { useState } from "react";

export default function useInput(initVal) {
  const [value, setValue] = useState(initVal);
  function inputHandler(e) {
    setValue(e.target.value);
  }
  return [value, inputHandler];
}
