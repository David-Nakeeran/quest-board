import { useState } from "react";
import { useNavigate } from "react-router";

export const Login = ({ setActiveUser }) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.success) {
        console.log(data);
        setActiveUser(data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormData}
            placeholder="enter email"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
            placeholder="Enter your password"
            required
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
};
