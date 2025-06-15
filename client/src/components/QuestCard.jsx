import { Link } from "react-router";
export const QuestCard = ({ quest, isUserQuest = false, handleDelete }) => {
  console.log(quest);
  return (
    <div>
      <h3>{quest.title}</h3>
      <p>Difficulty: {quest.difficulty}</p>
      <p>Reward: {quest.reward_xp}xp</p>
      {!isUserQuest ? (
        <Link to={`/quests/${quest.id}`}>View Details</Link>
      ) : null}
      {isUserQuest ? (
        <button onClick={() => handleDelete(quest.id)}>Delete</button>
      ) : null}
    </div>
  );
};
