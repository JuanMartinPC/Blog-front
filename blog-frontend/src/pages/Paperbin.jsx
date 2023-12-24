import React, { useContext, useState } from 'react'
import PostContext from '../context/PostContext'
import '../App.css';
import '../styles/Home.css'
import Add from '../components/Add.jsx'
import { SlHome, SlPlus, SlTrash, SlUserFemale } from "react-icons/sl";
import PaperbinItem from '../components/PaperbinItem.jsx';

function Paperbin() {
    const token = localStorage.getItem('token')
    const {paperbin} = useContext(PostContext)

    const [showForm, setShowForm] = useState(false)

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

    function handleEmptyppb(){
        fetch('http://localhost:3000/posts/emptyPaperbin',
        {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }})
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        window.location.reload()
    }

    return (
        <>
        {!token? window.location.replace('/') : 
        <main className='homeContainer'>
            <section id='SideBar' className='SideBar'>
                <h1>MyNO</h1>
                <i className='sbBtn' onClick={toHome} ><SlHome /></i>
                <i className='sbBtn' onClick={displayForm}><SlPlus /></i>
                <i className='sbBtn' onClick={toPaperbin} ><SlTrash /></i>
                <i className='sbBtn'><SlUserFemale /></i>
            </section>

            <div id='addForm' className="hidden">
            <Add toggle={displayForm}/>
            </div>

            <div className='posts'>
                <h1>Papelera</h1>
                <button className='btnEmptyPpb' onClick={handleEmptyppb}>Vaciar Papelera</button>       
                <div className='card'>
                    {
                    paperbin.length > 0 ? paperbin.map((p) => (<PaperbinItem p={p} key={p.post_id}/>)) : <h3>Nada por aquí.</h3>
                    }
                </div>
            </div>
        </main>}
        </>
    )
}

export default Paperbin