import { Link } from "react-router";
export const QuestCard = ({ quest, isUserQuest = false, handleDelete }) => {
  console.log(quest);
  return (
    <div className="flex flex-col justify-center items-center bg-[#2a2a3c] border border-[#b388ff] rounded-xl p-4 mb-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-[#ededed] text-xl font-semibold mb-4">
        {quest.title}
      </h3>
      <p className="text-[#a9a9b3] mb-1">
        Difficulty: <span className="capitalize">{quest.difficulty}</span>
      </p>
      <p className="text-[#a9a9b3] mb-3">Reward: {quest.reward_xp}xp</p>
      {!isUserQuest ? (
        <Link
          className="text-sm text-[#b388ff] hover:text-[#d1b3ff] underline transition-colors"
          to={`/quests/${quest.id}`}
        >
          View Details
        </Link>
      ) : null}
      {isUserQuest ? (
        <button
          onClick={() => handleDelete(quest.id)}
          className="mt-6 bg-[#a774fd] hover:bg-[#9368f9] text-white font-medium p-3 rounded-lg transition-colors w-full"
        >
          Delete
        </button>
      ) : null}
    </div>
  );
};
