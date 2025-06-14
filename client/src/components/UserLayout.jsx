import { useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router";

export const UserLayout = ({ activeUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUser) {
      navigate("/");
    }
  }, [activeUser, navigate]);

  return (
    <>
      <nav>
        <NavLink to={"/dashboard"}>DashBoard</NavLink>
        <NavLink to={"/quests"}>Available Quests</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
