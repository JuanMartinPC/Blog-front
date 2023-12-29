import '../styles/MeetUsers.css'
import { useState, useEffect } from 'react'

function MeetUsers({ user }) {
  
  const [actualUserID, setActualUserID] = useState(undefined)
  
  useEffect(() => { setActualUserID(user.id) }, [])

  function followUser(){
    const token = localStorage.getItem('token')
    const userID = localStorage.getItem('user_id')
  
    const userFollowed = {
      user_id: userID,
      follower_id: actualUserID
    }

    /* console.log(userFollowed); */

    fetch('http://localhost:3000/users/follow',
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(userFollowed)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err)) 
    window.location.reload()
  }

  return (
    <>
        <section className="MeetUsersCard">
            <article className='UserPrev'>
                <img className="UserImage" src={`../../public/images/${user.image}`}/>
                <div className='nandd'>
                    <p>{user.username}</p>
                    <p>descripcion...</p>
                </div>
            </article>
            <button className='followBtn' onClick={followUser} >Seguir</button>
        </section>
    </>
  )
}

export default MeetUsers