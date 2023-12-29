import '../styles/Profile.css';
import '../styles/Add.css'
import Add from '../components/Add';
import { useState, useEffect, useContext} from 'react';
import PostContext from '../context/PostContext';
import ActivityCard from '../components/ActivityCard'
import NavBar from '../components/NavBar';

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


    const [followed, setFollowed] = useState([])
    function followedUsers(){
        const token = localStorage.getItem('token')
        const userID = localStorage.getItem('user_id')
    
        /* console.log(userFollowed); */
    
        fetch(`http://localhost:3000/users/followed?id=${userID}`,
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }})
        .then(response => response.json())
        .then(data => setFollowed(data))
        .catch(err => console.log(err)) 
      }

      useEffect(()=>{
        getUser()
        followedUsers()
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

    return (
        <>
        { !token? window.location.replace('/') :
        <main className='main'>
            <NavBar />

            <div id='addForm' className="hidden">
                <Add toggle={displayForm}/>
            </div>

           <section className='profileBodySection'>
            <header className="header">
                    <section className="coverImage">
                        {/* imagen de portada */}
                    </section>
                    <section className='headerInfo'>
                        <img className="avatarImage" src={`../../public/images/${userInfo.image}`} alt="avatar" />
                        <article className='headerArticle'>
                            <h2>{userInfo.username}</h2>
                            <p>Siguiendo: {followed.length}</p>
                        </article>
                    </section>
                </header>

                <section className="mainSection">
                    <article className="description">
                        <h3>Descripcion</h3>
                        <h4>Descripción del usuario sobre sí mismo, sus gustos e intereses.</h4>
                    </article>

                    <section className="lastActivity">
                        <div className='activityHeader'>
                            <h3>Tu actividad</h3>
                            <div className='dflex'>
                                <button className='activityBtn' onClick={displayForm}>Nueva nota</button>
                                <button className='activityBtn' onClick={toPaperbin}>Notas Archivadas</button>
                            </div>
                        </div>
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