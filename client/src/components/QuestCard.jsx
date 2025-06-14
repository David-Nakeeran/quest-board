import { Link } from "react-router";
export const QuestCard = ({ quest }) => {
  console.log(quest);
  return (
    <div>
      <h3>{quest.title}</h3>
      <p>Difficulty: {quest.difficulty}</p>
      <p>Reward: {quest.reward_xp}xp</p>
      <Link to={`/quests/${quest.id}`}>View Details</Link>
    </div>
  );
};
