import { useRef } from "react";
import CounterContext from "./countercontext";

function CounterProvider({ children }) {
  const counterRef = useRef(0);

  const countIncrement = () => {
    counterRef.current += 1;
    return counterRef.current;
  };

  return (
    <CounterContext value={{ countIncrement }}>
      {children}
    </CounterContext>
  );
}

export default CounterProvider;