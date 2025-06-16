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

      if (!response.ok) {
        console.error("Validation errors:", data.errors);
        return;
      }

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
    <section>
      <form onSubmit={handleSubmit} className="w-xs">
        <fieldset className="flex flex-col border border-[#b388ff] rounded-lg p-6">
          <legend className="text-[#FFF2C5] text-xl font-bold mb-4 px-2">
            Login
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
          <button
            type="submit"
            className="mt-6 bg-[#a774fd] hover:bg-[#9368f9] text-white font-medium p-3 rounded-lg transition-colors"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </section>
  );
};
