import { useState } from "react";
import { useNavigate } from "react-router";

export const CreateQuest = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    character_name: "",
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        navigate("/login");
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
          <label htmlFor="character_name">Character Name:</label>
          <input
            type="text"
            name="character_name"
            value={formData.character_name}
            onChange={handleFormData}
            placeholder="Enter your character name"
            required
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
};
