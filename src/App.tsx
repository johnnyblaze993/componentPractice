import Form from "./components/Form";
import style from "./App.module.scss";

function App() {
  return (
    <div className={style.app}>
      <h1>Please sign in</h1>

      <Form />
    </div>
  );
}

export default App;
