export const UserDashboard = ({ activeUser }) => {
  console.log(activeUser);
  return (
    <main>
      {activeUser ? (
        <>
          <p>{activeUser.character_name}</p>
          <p>{activeUser.xp}</p>
        </>
      ) : null}
    </main>
  );
};
