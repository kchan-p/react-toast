import { useContext } from "react";
import useToast from "../toast/useToast";
import counterContext from "./countercontext";

function TestButton({ clickNum }) {
    const { showToast } = useToast();
    const { countIncrement } = useContext(counterContext);

    return (
        <>
            <button onClick={
                () => {
                    for (let i = 0; i < clickNum; i++) {
                        const count = countIncrement();
                        showToast(`通知(${count}回目)`);
                    }
                }
            }
            >通知!!{clickNum > 1 ? `(${clickNum}連続)` : ""}</button>
        </>)
}

export default TestButton;
