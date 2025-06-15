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
    <>
      <div>
        <h3>{questDetail.title}</h3>
        <p>{questDetail.description}</p>
        <p>Difficulty: {questDetail.difficulty}</p>
        <p>Reward: {questDetail.reward_xp}xp</p>
        <button onClick={handleAttemptQuest} disabled={questComplete.success}>
          Attempt Quest
        </button>
        {questComplete.success ? (
          <p>{questComplete.message}</p>
        ) : (
          <p>{questComplete.message}</p>
        )}
      </div>
    </>
  );
};
