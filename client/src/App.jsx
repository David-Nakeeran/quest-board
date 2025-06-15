import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { UserDashboard } from "./pages/UserDashboard.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { UserLayout } from "./components/UserLayout.jsx";
import { AvailableQuests } from "./pages/AvailableQuests.jsx";
import { QuestDetail } from "./pages/QuestDetail.jsx";
import { CreateQuest } from "./pages/CreateQuest.jsx";
import { UserQuests } from "./pages/UserQuests.jsx";
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router";

export const App = () => {
  const [activeUser, setActiveUser] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    setActiveUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          credentials: "include",
        });

        if (response.status === 401) {
          logout();
          return;
        }

        const data = await response.json();
        if (data.success) {
          setActiveUser(data.user);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="layout bg-[#1e1e2f]">
      <Header activeUser={activeUser} setActiveUser={setActiveUser} />
      <Routes>
        <Route
          path="/"
          element={
            activeUser ? (
              <Navigate to={"/dashboard"} replace />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setActiveUser={setActiveUser} />}
        />
        <Route element={<UserLayout activeUser={activeUser} />}>
          <Route
            path={"/dashboard"}
            element={<UserDashboard activeUser={activeUser} />}
          />
          <Route
            path={"/quests"}
            element={<AvailableQuests logout={logout} />}
          />
          <Route
            path={`/quests/:id`}
            element={<QuestDetail logout={logout} />}
          />
          <Route
            path={"/quests/new"}
            element={<CreateQuest logout={logout} />}
          />
          <Route
            path={"/user/quests"}
            element={<UserQuests logout={logout} />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};
