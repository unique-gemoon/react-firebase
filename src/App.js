import React from "react";
import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Input from "./components/Input";
import { auth } from "./firebase-config";

function App() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("authenticated") || false
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  useEffect(() => {
    if (authenticated && !currentUser) {
      const userFromLocalStorage = JSON.parse(
        localStorage.getItem("currentUser")
      );
      setCurrentUser(userFromLocalStorage);
    }
  }, [authenticated, currentUser]);

  function handleLogin() {
    const currentUser = auth.currentUser;
    setAuthenticated(true);
    setCurrentUser(currentUser);
    localStorage.setItem("authenticated", true);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  return (
    <div className="App container-fluid">
      {authenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Input user={currentUser} />
      )}
    </div>
  );
}

export default App;
