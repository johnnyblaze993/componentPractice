import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === "" ||
      user.select === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (user.select === "0") {
      alert("Please select an option");
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

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="text"
        name="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <input
        type="text"
        name="confirm password"
        placeholder="confirm password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
      />
      <select
        name="select"
        value={user.select}
        onChange={(e) => setUser({ ...user, select: e.target.value })}
      >
        <option value="0">Select an option</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
