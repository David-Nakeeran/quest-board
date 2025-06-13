export const UserDashboard = ({ activeUser }) => {
  return (
    <main>
      {activeUser ? (
        <>
          <p>{activeUser.user.character_name}</p>
          <p>{activeUser.user.xp}</p>
        </>
      ) : null}
    </main>
  );
};
