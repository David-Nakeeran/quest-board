import { useState } from "react";
import { useNavigate } from "react-router";

export const CreateQuest = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    reward_xp: 1,
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        // navigate("/login");
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
          <legend>Create a quest!</legend>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormData}
            placeholder="Enter Quest title"
            required
          />
          <label htmlFor="description">Description:</label>
          <input
            type="description"
            name="description"
            value={formData.description}
            onChange={handleFormData}
            placeholder="Enter Quest Description"
            required
          />
          <label htmlFor="difficulty">Character Name:</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleFormData}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label htmlFor="reward_xp">
            Enter xp reward ranging from 1 to 100:
          </label>
          <input
            type="number"
            name="reward_xp"
            value={formData.reward_xp}
            onChange={handleFormData}
            placeholder="Enter Reward XP"
            min={1}
            max={100}
            required
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
};
