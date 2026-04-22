function UserList({ users }) {
  return (
    <section className="mt-5">
      <h2>Je suis la liste des utilisateurs</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name}</li>
        ))}
      </ul>
    </section>
  );
}

export default UserList;
