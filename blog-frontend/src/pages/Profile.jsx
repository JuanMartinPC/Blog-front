import '../styles/Profile.css';
import { useState, useEffect, useContext} from 'react';
import { SlHome, SlPlus, SlTrash, SlUserFemale } from "react-icons/sl";
import PostContext from '../context/PostContext';
import ActivityCard from '../components/ActivityCard';
import Card from '../components/Card';

function Profile() {

    const {userPost} = useContext(PostContext)

    const token = localStorage.getItem('token')
    const [userInfo, setUserInfo] = useState({})

    const [sesion, setSesion] = useState(true)

    function Logout(){
        localStorage.removeItem('token')
        return window.location.replace('/')
    }

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

    return (
        <>
        { !token? window.location.replace('/') :
        <main className='main'>
            <section id='SideBar' className='SideBar'>
                <h1>MyNO</h1>
                <i className='sbBtn' onClick={toHome} ><SlHome className='sbIcon' /></i>
                <i className='sbBtn' onClick={displayForm}><SlPlus className='sbIcon' /></i>
                <i className='sbBtn' onClick={toPaperbin} ><SlTrash className='sbIcon' /></i>
                <i className='sbBtn' onClick={toProfile}><SlUserFemale className='sbIcon' /></i>
            </section>

           <section className='profileBodySection'>
            <header className="header">
                    <section className="coverImage">
                        <h3 onClick={Logout} className='logout'>Log Out</h3>
                        {/* imagen de portada */}
                    </section>
                    <section className='headerInfo'>
                        <img className="avatarImage" src={`../../public/images/${userInfo.image}`} alt="avatar" />
                        <article className='headerArticle'>
                            <h2>{userInfo.username}</h2>
                        </article>
                    </section>
                </header>

                <section className="mainSection">
                    <article className="description">
                        <h3>descripcion</h3>
                        <hr />
                        <h4>Descripción del usuario sobre sí mismo, sus gustos e intereses.</h4>
                    </article>

                    <section className="lastActivity">
                        <h3>Tu actividad</h3>
                        <article className='notesContainer'>
                            {
                                userPost.length > 0 ? userPost.map((post) => {return <ActivityCard p={post} />}) : <p>Aún no has escrito nada</p>
                            }
                        </article>
                    </section>
                </section>
            </section> 

        </main>
        }
        </>
    )
}

export default Profile