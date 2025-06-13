import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { UserDashboard } from "./pages/UserDashboard.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

export const App = () => {
  // Need another state to track when a user logs in for component re-render
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setActiveUser(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header activeUser={activeUser} setActiveUser={setActiveUser} />
      <Routes>
        <Route
          path={"/"}
          element={
            activeUser ? (
              <UserDashboard activeUser={activeUser} />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
};
