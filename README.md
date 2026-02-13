# react-toast

Reactでの一時的な通知メッセージ（Toast）Context版<br>
https://note.affi-sapo-sv.com/react-toast.php<br>

ReactのContextベースでToastを表示する

コンポーネントの設置
```
import ToastProvider from "./toast/toastprovider";

createRoot(document.getElementById('root')).render(
    <>
    <ToastProvider>
      <App>
    </ToastProvider>
    </>
);
```

Toastの表示
```
import useToast from "./toast/useToast";

function MyComponent(){
    const { showToast } = useToast();
    return (
        <>
            <button onClick={
                () => {
                    showToast("メッセージ");
                }
            }
            >click</button>
        </>);
}

```
---

## デモ

- デモページ: https://note.affi-sapo-sv.com/demo/react-toast/


---

## 開発方法

npm install<br>
npm run dev<br>

## ビルド

npm run build<br>

## 実行


## 作者

名前: kchan<br>
GitHub: https://github.com/kchan-p/<br>
Website: https://note.affi-sapo-sv.com/<br>

## ライセンス

MIT License<br>