import { useState, useEffect } from "react";
import { useParams } from "react-router";

export const QuestDetail = ({ logout }) => {
  const [questDetail, setQuestDetail] = useState({});
  const [questComplete, setQuestComplete] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/quests/${id}`,
          {
            credentials: "include",
          }
        );
        if (response.status === 401) {
          logout();
          return;
        }
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setQuestDetail(data.quest);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleAttemptQuest = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/quests/${id}/complete`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setQuestComplete(data);
      } else if (!data.success) {
        setQuestComplete(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="mt-8 bg-[#2a2a3c] p-6 rounded-xl shadow-md border border-[#b388ff]">
      <h3 className="text-2xl text-[#ededed] font-bold mb-4">
        {questDetail.title}
      </h3>
      <p className="text-[#a9a9b3] mb-2">{questDetail.description}</p>
      <p className="text-[#ededed] mb-1">
        <span className="font-semibold text-[#E0C074]">Difficulty: </span>
        {questDetail.difficulty}
      </p>
      <p className="text-[#ededed] mb-4">
        <span className="font-semibold text-[#E0C074]">Reward: </span>
        {questDetail.reward_xp} XP
      </p>
      <button
        onClick={handleAttemptQuest}
        disabled={questComplete.success}
        className={`mt-6 bg-[#a774fd] hover:bg-[#9368f9] text-white font-medium p-3 rounded-lg transition-colors w-full ${
          questComplete.success
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#b388ff] hover:bg-[#9f6fff] text-[#1e1e2f]"
        }`}
      >
        Attempt Quest
      </button>
      {questComplete.success ? (
        <p
          className={`mt-4 text-center font-medium ${
            questComplete.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {questComplete.message}
        </p>
      ) : (
        <p
          className={`mt-4 text-center font-medium ${
            questComplete.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {questComplete.message}
        </p>
      )}
    </div>
  );
};
