import { useContext } from "react";
import ToastContext from "./toastcontext";

function useToast(){
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast は ToastProvider 内で使用する必要があります");
  }
  return context;
};

export default useToast;