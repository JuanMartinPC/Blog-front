import React, { useEffect } from 'react';
import '../App.css';
import '../styles/Home.css'
import Card from '../components/Card.jsx';
import Add from '../components/Add.jsx'
import PostContext from '../context/PostContext.jsx';
import { useState, useContext } from 'react';
import { SlHome, SlPlus, SlTrash, SlUserFemale } from "react-icons/sl";

function Home() {

  const { post } = useContext(PostContext)

  const [showForm, setShowForm] = useState(false)
  const token = localStorage.getItem('token')

  const displayForm = () => {
    const addForm = document.getElementById('addForm');
    if (addForm.classList.contains('hidden')){
        addForm.classList.remove('hidden')
        addForm.classList.add('addForm')
        setShowForm(true)
    } else if (addForm.classList.contains('addForm')){
        addForm.classList.remove('addForm')
        addForm.classList.add('hidden')
        setShowForm(false)
    }
  }

  function toPaperbin(){
    window.location.replace('/paperbin')
  }
  function toHome(){
    window.location.replace('/home')
  }
  function toProfile(){
    window.location.replace('/profile')
  }

  const [userInfo, setUserInfo] = useState({})

  const id = localStorage.getItem('user_id')
  async function getUser(){
    if (!id) return console.log('No se ha iniciado ninguna sesión de usuario.')
    await fetch(`http://localhost:3000/users?id=${id}`,{
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(data => setUserInfo({
      username: data[0].username,
      image: data[0].image
    }))
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <> 
      { !token? window.location.replace('/') : 
      <main className='homeContainer'>
        
        <div id='addForm' className="hidden">
          <Add toggle={displayForm}/>
        </div>
 
        <div className='posts'>
          <section id='SideBar' className='SideBar'>
            <h1>MyNO</h1>
            <i className='sbBtn' onClick={toHome} ><SlHome className='sbIcon' /></i>
            <i className='sbBtn' onClick={displayForm}><SlPlus className='sbIcon' /></i>
            <i className='sbBtn' onClick={toPaperbin} ><SlTrash className='sbIcon' /></i>
            <i className='sbBtn' onClick={toProfile}><SlUserFemale className='sbIcon' /></i>
          </section>

          <div className='card'>
            <h1>Últimas notas</h1>
            {
              post.length > 0 ? post.map((p) => {return <Card p={p} key={p.post_id}/>}) : <p>Nada para mostrar por ahora </p>
            }
          </div>
          {/* <div className='userStatsCard'>
            <div className='userImage'>
              <img className="userImage" src={`../../public/images/${userInfo.image}`}/>
            </div>
            <h2>{userInfo.username}</h2>
            <h4>Cantidad de notas: {post.length}</h4>
          </div> */}
        </div>       
      </main>}
    </>
  )
}

export default Home