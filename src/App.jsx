import ToastProvider from "./toast/toastprovider";
import TestButton from "./test/testbutton";
import CounterProvider from "./test/counterprovider";

function App() {

  return (
    <>
      <h1>Reactでの一時的な通知メッセージ（Toast）</h1>
      <ToastProvider>
        <CounterProvider>
          <TestButton clickNum={1} />
          <TestButton clickNum={3} />
        </CounterProvider>
      </ToastProvider>
    </>
  );
}

export default App;