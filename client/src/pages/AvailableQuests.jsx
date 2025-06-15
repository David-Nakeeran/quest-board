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
    <section className="p-4">
      <h2 className="text-[#ededed] text-2xl font-bold mb-4">
        Available Quests
      </h2>
      {quests.length === 0 ? (
        <p className="text-[#a9a9b3]">No quests available currently</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questElements}
        </div>
      )}
    </section>
  );
};
