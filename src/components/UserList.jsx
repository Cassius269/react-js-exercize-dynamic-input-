function UserList({ users }) {
  return (
    <section className="mt-5">
      <h2>Je suis la liste des utilisateurs</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} =======>
            {u.emails.map((email, index) => (
              <i key={email}>{email}{index !== u.emails.length-1 ? ', ' : ''}</i>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default UserList;
