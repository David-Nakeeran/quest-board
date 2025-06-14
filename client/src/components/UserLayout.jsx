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
        <NavLink>Test 2</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
