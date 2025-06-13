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
    <header>
      <h1>Logo placeholder</h1>
      <nav>
        {!activeUser ? <NavLink to={"/login"}>Login</NavLink> : null}
        {activeUser ? (
          <button onClick={handleClick}>Logout</button>
        ) : (
          <NavLink to={"/register"}>Register</NavLink>
        )}
      </nav>
    </header>
  );
};
