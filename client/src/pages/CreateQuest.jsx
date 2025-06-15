import { useState } from "react";

export const CreateQuest = ({ logout }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    reward_xp: 1,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (response.status === 401) {
        logout();
        return;
      }
      await response.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setFormData({
      title: "",
      description: "",
      difficulty: "",
      reward_xp: 1,
    });
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-xs">
        <fieldset className="flex flex-col border border-[#b388ff] rounded-lg p-3 mb-2">
          <legend className="text-[#FFF2C5] text-xl font-bold p-2">
            Create a quest!
          </legend>
          <label htmlFor="title" className="text-[#a9a9b3] mb-1">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormData}
            placeholder="Enter Quest title"
            required
            className="bg-[#2a2a3c] text-[#ededed] border border-[#b388ff] rounded-lg p-2"
          />
          <label htmlFor="description" className="text-[#a9a9b3] mt-4 mb-1">
            Description:
          </label>
          <input
            type="description"
            name="description"
            value={formData.description}
            onChange={handleFormData}
            placeholder="Enter Quest Description"
            required
            className="bg-[#2a2a3c] text-[#ededed] border border-[#b388ff] rounded-lg p-3"
          />
          <label htmlFor="difficulty" className="text-[#a9a9b3] mt-4 mb-1">
            Character Name:
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleFormData}
            required
            className="w-full p-2 rounded-md bg-[#2a2a3c] text-[#ededed] border border-[#b388ff]"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label htmlFor="reward_xp" className="text-[#a9a9b3] mt-4 mb-1">
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
            className="bg-[#2a2a3c] text-[#ededed] border border-[#b388ff] rounded-lg p-3"
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
