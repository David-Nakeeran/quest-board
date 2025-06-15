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
      <nav className="row-start-1 row-end-2 col-start-1 col-end-2 place-self-start mt-15 flex justify-center items-center w-dvw gap-6 p-4 border-t border-[#b388ff] text-[#E0C074] hover:text-[#F1D99C] transition-colors duration-200">
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) => {
            return isActive
              ? "text-[#FFF2C5] border-b border-[#FFF2C5]"
              : "text-[#E0C074] mx-2 hover:text-[#F1D99C] transition-colors duration-200";
          }}
        >
          DashBoard
        </NavLink>
        <NavLink
          to={"/quests/new"}
          className={({ isActive }) => {
            return isActive
              ? "text-[#FFF2C5] border-b border-[#FFF2C5]"
              : "text-[#E0C074] mx-2 hover:text-[#F1D99C] transition-colors duration-200";
          }}
        >
          Create Quest
        </NavLink>
        <NavLink
          to={"/user/quests"}
          className={({ isActive }) => {
            return isActive
              ? "text-[#FFF2C5] border-b border-[#FFF2C5]"
              : "text-[#E0C074] mx-2 hover:text-[#F1D99C] transition-colors duration-200";
          }}
        >
          My Quests
        </NavLink>
        <NavLink
          to={"/quests"}
          className={({ isActive }) => {
            return isActive
              ? "text-[#FFF2C5] border-b border-[#FFF2C5]"
              : "text-[#E0C074] mx-2 hover:text-[#F1D99C] transition-colors duration-200";
          }}
        >
          Available Quests
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};
