export const UserDashboard = ({ activeUser }) => {
  console.log(activeUser);
  return (
    <main>
      {activeUser ? (
        <>
          <p>Character name: {activeUser.character_name}</p>
          <p>Current XP: {activeUser.xp}xp</p>
        </>
      ) : null}
    </main>
  );
};
