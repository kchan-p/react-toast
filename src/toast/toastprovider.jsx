import { useState, useRef } from "react";
import  ToastContext from "./toastcontext";

function ToastProvider({ children }){

    const {showToast,message,isFadeIn} = useToastContext();

    return (
        <ToastContext value={{ showToast }}>
            {children}
            {message && <Toast message={message.msg} isFadeIn={isFadeIn} />}
        </ToastContext>
    );
};
export default ToastProvider;

const useToastContext = ()=>{
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
        setMessage({msg});
        // フレームをずらす
        requestAnimationFrame(() => setIsFadeIn(true));

        setTimeout(() => {
            setIsFadeIn(false);

            setTimeout(() => {
                setMessage(null); 
                nextToast();
            }, FADE_OUT);
        }, waitTime < 0 ? duration : waitTime );
    };
    // コンポーネントが呼び出す関数
    const showToast = (msg, duration = 2000) => {
        queueRef.current.push({ msg, duration });
        if (!busyRef.current) {
            nextToast();
        }
    };
    return {showToast,message,isFadeIn};
}

const Toast = ({ message, isFadeIn }) => {
    return (
        <div
            style={{
                ...styles.toast,
                ...(isFadeIn ? styles.fadein : styles.fadeout),
            }}
        >
            {message}
        </div>
    );
};

const styles = {
    toast: {
        position: "fixed",
        top:"50%",
        left:"50%",
        padding: "5px 16px",
        background: "#333",
        color: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        transform:" translate(-50%, -50%) translateY(10px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity:"0"
    },
    fadein: {
        opacity: 1,
        transform: "translate(-50%, -50%) translateY(0)",
    },
    fadeout: {
        opacity: 0,
        transform: " translate(-50%, -50%) translateY(10px)",
    },
};