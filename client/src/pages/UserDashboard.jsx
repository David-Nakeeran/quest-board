export const UserDashboard = ({ activeUser }) => {
  console.log(activeUser);
  return (
    <main className="flex flex-col bg-[#2a2a3c] p-5 rounded-xl shadow-lg max-w-md">
      {activeUser ? (
        <>
          <p className="text-[#E0C074] text-xl mb-5 text-center font-semibold drop-shadow-md border-b border-[#E0C074] pb-1">
            Character Sheet
          </p>
          <p className="text-[#ededed] text-lg">
            <span className="text-[#E0C074]">Character name: </span>
            {activeUser.character_name}
          </p>
          <p className="text-[#ededed] text-lg">
            <span className="text-[#E0C074]">Current XP: </span>
            {activeUser.xp}xp
          </p>
        </>
      ) : null}
    </main>
  );
};
