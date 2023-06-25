import React, { useEffect, useState } from "react";
import { api } from "./api";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState();
  const [showAdd, setShowAdd] = useState({
    display: "block",
  });
  const [show, setShow] = useState({
    display: "none",
  });
  const fetchUsers = async () => {
    await api
      .get("/getusers")
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    await api
      .post("/adduser", {
        name: newUser,
      })
      .then((data) => setUsers(data.data))
      .then((err) => console.log(err));
  };
  const deleteUser = async (id) => {
    await api
      .delete(`/deleteuser/${id}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  };
  const updateUser = async (id) => {
    const upUser = users.filter((user) => {
      return user._id === id;
    });
    console.log(upUser[0].name);
    if (upUser.length > -1) {
      setShow({ display: "block" });
      setShowAdd({ display: "none" });
      setNewUser(upUser[0].name);
    }
    await api.put(`/updateuser/${id}`, {
      name: newUser,
    });
  };
  return (
    <div>
      <h1>Hello World</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <br />
        <br />
        <input style={showAdd} type="submit" value="Add User" />
        <input style={show} type="submit" value="Update User" />
      </form>
      <h3>Users</h3>
      {users.map((user) => (
        <div key={user._id}>
          {user.name}
          <button
            id={user._id}
            onClick={(e) => updateUser(e.target.id)}
            style={{ color: "blue", background: "white" }}
          >
            Edit
          </button>
          <button
            id={user._id}
            style={{ color: "red" }}
            onClick={(e) => deleteUser(e.target.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
