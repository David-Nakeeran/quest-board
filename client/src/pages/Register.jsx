import { useState } from "react";
import { useNavigate } from "react-router";

export const Register = () => {
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
      <form onSubmit={handleSubmit} className="w-xs">
        <fieldset className="flex flex-col border border-[#b388ff] rounded-lg p-6 mb-4">
          <legend className="text-[#FFF2C5] text-xl font-bold mb-4 px-2">
            Register
          </legend>
          <label htmlFor="email" className="text-[#a9a9b3] mt-4 mb-1">
            Email:
          </label>
          <input
            className="bg-[#2a2a3c] text-[#ededed] border border-[#b388ff] rounded-lg p-3"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormData}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password" className="text-[#a9a9b3] mt-4 mb-1">
            Password:
          </label>
          <input
            className="bg-[#2a2a3c] text-[#ededed] border border-[#b388ff] rounded-lg p-3"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
            placeholder="Enter your password"
            required
          />
          <label htmlFor="character_name" className="text-[#a9a9b3] mt-4 mb-1">
            Character Name:
          </label>
          <input
            className="bg-[#2a2a3c] text-[#ededed] border border-[#b388ff] rounded-lg p-3"
            type="text"
            name="character_name"
            value={formData.character_name}
            onChange={handleFormData}
            placeholder="Enter your character name"
            required
          />
          <button
            type="submit"
            className="mt-6 bg-[#a774fd] hover:bg-[#9368f9] text-white font-medium p-3 rounded-lg transition-colors"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
};
