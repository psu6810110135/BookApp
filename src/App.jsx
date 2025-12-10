import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import BookScreen from "./BookScreen";
import { Routes, Route, Navigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (token) => {
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
          element={isAuthenticated ? <BookScreen /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
export default App;
