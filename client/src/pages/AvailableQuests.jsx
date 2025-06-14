import { useState, useEffect } from "react";
import { QuestCard } from "../components/QuestCard";

export const AvailableQuests = () => {
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
        const data = await response.json();
        if (data.success) {
          setQuests(data.quests);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchQuests();
  }, []);

  const questElements = quests.map((quest) => {
    return <QuestCard key={quest.id} quest={quest} />;
  });

  return (
    <section>
      <h2>Available Quests</h2>
      {questElements}
    </section>
  );
};
