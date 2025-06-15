import { useState, useEffect } from "react";
import { QuestCard } from "../components/QuestCard";

export const AvailableQuests = ({ logout }) => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/quests/available`,
          {
            credentials: "include",
          }
        );
        if (response.status === 401) {
          logout();
          return;
        }
        const data = await response.json();
        if (data.success) {
          setQuests(data.quests);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchQuests();
    const intervalId = setInterval(fetchQuests, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const questElements = quests.map((quest) => {
    return <QuestCard key={quest.id} quest={quest} />;
  });

  return (
    <section>
      <h2>Available Quests</h2>
      {quests.length === 0 ? (
        <p>No quests available currently</p>
      ) : (
        questElements
      )}
    </section>
  );
};
