import { NavLink } from "react-router";
import { useNavigate } from "react-router";

export const Header = ({ activeUser, setActiveUser }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.success) {
        setActiveUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <header className="header-navigation flex justify-between items-center p-3">
      <h1 className="text-lg text-[#ededed]">Quest Board</h1>
      <nav className="flex justify-between text-[#E0C074] mx-2">
        {!activeUser ? (
          <NavLink
            to={"/login"}
            className={({ isActive }) => {
              return isActive
                ? "text-[#FFF2C5] border-b border-[#FFF2C5]"
                : "text-[#E0C074] mx-2 hover:text-[#F1D99C] transition-colors duration-200";
            }}
          >
            Login
          </NavLink>
        ) : null}
        {activeUser ? (
          <button
            onClick={handleClick}
            className="text-[#E0C074] hover:text-[#F1D99C] transition-colors"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to={"/register"}
            className={({ isActive }) => {
              return isActive
                ? "text-[#FFF2C5] border-b border-[#FFF2C5]"
                : "text-[#E0C074] mx-2 hover:text-[#F1D99C] transition-colors duration-200";
            }}
          >
            Register
          </NavLink>
        )}
      </nav>
    </header>
  );
};
