import React, { useEffect, useState } from "react";
import "./assets/styles/App.scss";
import RegisterForm from "./components/RegisterForm";
import UserList from "./components/UserList";

export default function App() {
  // Gestion de l'état local des utilisateurs
  const [users, setUsers] = useState([]);

  // Récupérer les utilisateurs
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://restapi.fr/api/usersreactc14?delay=2",
        );

        if (response.ok) {
          const data = await response.json();
          setUsers(Array.isArray(data) ? data : [data]);
          console.log(data);
        } else {
          console.log("Ooops une erreur");
        }
      } catch (error) {
        console.log(`Erreur ${error.message}`);
      }
    };

    getUsers();
  }, []);

  const addUser = (user) => setUsers([...users, user]);

  return (
    <>
      <main className="container">
        <RegisterForm addUser={addUser} />
        <UserList users={users} />
      </main>
    </>
  );
}
