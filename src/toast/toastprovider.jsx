import { useState, useRef } from "react";
import ToastContext from "./toastcontext";
import styles from "./toast.module.css";

function ToastProvider({ children }) {

    const { showToast, message, isFadeIn } = useToastContext();

    return (
        <ToastContext value={{ showToast }}>
            {children}
            {message && <div
                className={
                    `${styles.toast} ${isFadeIn ? styles.toast_fadein : styles.toast_fadeout}`
                }
            >
                {message.msg}
            </div>}
        </ToastContext>
    );
};
export default ToastProvider;

const useToastContext = () => {
    const [message, setMessage] = useState(null);
    const [isFadeIn, setIsFadeIn] = useState(false);

    const busyRef = useRef(false);
    const queueRef = useRef([]);

    const FADE_OUT = 300;

    const nextToast = () => {
        // キュー存在確認
        if (queueRef.current.length === 0) {
            busyRef.current = false;
            return;
        }
        busyRef.current = true;
        // キューからメッセージ取得
        const { msg, duration } = queueRef.current.shift();

        const waitTime = duration - FADE_OUT;
        // メッセージステータスセット→再レンダリング
        setMessage({ msg });
        // フレームをずらす
        requestAnimationFrame(() => setIsFadeIn(true));

        setTimeout(() => {
            setIsFadeIn(false);

            setTimeout(() => {
                setMessage(null);
                nextToast();
            }, FADE_OUT);
        }, waitTime < 0 ? duration : waitTime);
    };
    // コンポーネントが呼び出す関数
    const showToast = (msg, duration = 2000) => {
        queueRef.current.push({ msg, duration });
        if (!busyRef.current) {
            nextToast();
        }
    };
    return { showToast, message, isFadeIn };
}


