import { useState } from "react";
import style from "./Form.module.scss";

import ReactDOM from "react-dom";

const Form: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    select: "",
  });

  interface UserInterface {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    select: string;
  }
  const [userList, setUserList] = useState<UserInterface[] | any>([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === "" ||
      user.select === ""
    ) {
      setErrorMessage("Please fill in all fields");
      setError(true);
      return;
    }
    if (user.password !== user.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setError(true);
      return;
    }
    if (user.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      setError(true);
      return;
    }
    if (user.select === "0") {
      setErrorMessage("Please select an option");
      setError(true);
      return;
    }

    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      select: user.select,
    };

    setUserList([...userList, newUser]);
    console.log(userList);
    console.log(user);
    setUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      select: "",
    });
  };

  interface OverlayProps {
    onClick: () => void;
  }

  const Overlay = (props: OverlayProps) => {
    const overlayElement = document.getElementById("overlay");
    if (!overlayElement) return null;

    return ReactDOM.createPortal(
      <div className={style.overlay} onClick={props.onClick} />,
      overlayElement
    );
  };

  interface ModalProps {
    errorMessage: string;
  }

  const Modal = (props: ModalProps) => {
    const modalElement = document.getElementById("modal");
    if (!modalElement) return null;

    return ReactDOM.createPortal(
      <div className={style.modal}>
        <p>{errorMessage}</p>
        <button
          className={style.modalButton}
          onClick={() => {
            setError(false);
          }}
        >
          okay jeez
        </button>
      </div>,
      modalElement
    );
  };

  return (
    <>
      <form
        className={style.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className={style.input}
          type="text"
          name="name"
          placeholder="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          className={style.input}
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className={style.input}
          type="text"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          className={style.input}
          type="text"
          name="confirm password"
          placeholder="confirm password"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        />
        <select
          className={style.input}
          name="select"
          value={user.select}
          onChange={(e) => setUser({ ...user, select: e.target.value })}
        >
          <option value="0">Select an option</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button className={style.button} type="submit">
          Submit
        </button>
      </form>
      <div>
        {error && (
          <>
            <Overlay
              onClick={() => {
                setError(false);
              }}
            />
            <Modal errorMessage={errorMessage} />
          </>
        )}
      </div>
    </>
  );
};

export default Form;
