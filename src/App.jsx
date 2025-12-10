import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import BookScreen from "./BookScreen";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
  };

  const handleLoginSuccess = (remember, token) => {
    if (remember) {
      localStorage.setItem("token", token);
    }
    alert("Login Success with token: " + token);
    setIsAuthenticated(true);
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <BookScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}
export default App;
