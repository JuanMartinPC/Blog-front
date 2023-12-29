import React, { useContext, useState } from 'react'
import PostContext from '../context/PostContext'
import '../styles/Home.css'
import Add from '../components/Add.jsx'
import PaperbinItem from '../components/PaperbinItem.jsx';
import NavBar from '../components/NavBar.jsx';

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
            

            <div id='addForm' className="hidden">
            <Add toggle={displayForm}/>
            </div>

            <div className='posts'>
                <NavBar />
                <button className='btnEmptyPpb' onClick={handleEmptyppb}>Vaciar Papelera</button>       
                <div className='ppbCard'>
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