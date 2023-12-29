import { useState, useEffect } from "react"
import MeetUsers from "../components/MeetUsers"
import '../styles/MeetUsers.css'
import NavBar from "../components/NavBar"

function Users() {
    const [users, setUsers] = useState([])

    async function getUsers(){
        await fetch(`http://localhost:3000/users`,{
          method: 'GET',
          headers: { "Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err))
      }

      useEffect(()=>{
        getUsers()
      },[])

  return (
    <>
    <NavBar />
    <section className="UsersSection">
      <article className="usMenu">
        <p className="usMenuP">Siguiendo</p>
        <p className="usMenuP">Seguidores</p>
      </article>

      <article className="ymkSection">
        <h1>Personas que podrías conocer</h1>
        <li className="Users">
            {users.map((user) => <MeetUsers user={user}/>)}
        </li>
      </article>
    </section>
    </>
  )
}

export default Users