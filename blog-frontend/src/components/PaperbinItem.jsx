import React, { useContext } from 'react';
import '../styles/Card.css'
import { SlTrash, SlActionUndo, SlShareAlt } from 'react-icons/sl';

function PaperbinItem({p}) {

    const token = localStorage.getItem('token')
    const post = {
        "user_id": p.user_id,
        "post_id":p.post_id,
        "title": p.title,
        "content": p.content,
        "category": p.category
    }

    function handleDelete(){
        fetch(`http://localhost:3000/posts/deletePaperbinItem?id=${p.post_id}`,
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', 'Authorization': {token}}
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        window.location.reload()
      }

    function handleRestore(){
      fetch(`http://localhost:3000/posts/restore?id=${p.post_id}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': {token}},
        body: JSON.stringify(post)
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      window.location.reload()
    }

    const displayFullCard = () => {
        const fullCard = document.getElementById(p.post_id);
        if (fullCard.classList.contains('hidden')){
            fullCard.classList.remove('hidden')
            fullCard.classList.add('FullCard')
        } else if (fullCard.classList.contains('FullCard')){
            fullCard.classList.remove('FullCard')
            fullCard.classList.add('hidden')
        }
    }

  return (
  <>
    <div className='cardContainer' key={p.post_id} >
      <div className='cardContent'>
          <div className='cardHeader'>
              <h3 /* onClick={displayFullCard} */>{p.title}</h3>
          </div>
          <p className='cardText'>{p.content}</p>
          <div className="cardFooter">
            <code>{p.upload_date}</code>
            <p>{p.category}</p>
          </div>
          <div id='menu' className='dotMenu'>
            <i className='btnCard' onClick={handleRestore}><SlShareAlt className='ppbItem'/></i>
            <i className='btnCard' onClick={handleDelete}><SlTrash/></i>
          </div>
      </div>
    </div>
  
    <div id={p.post_id} className="hidden">      
        <div className="dotMenu">
            <code>Fecha de publicación: {p.upload_date}</code>
            <p>Etiqueta: {p.category}</p>
        </div>
        <h1 className='cardHeader-fc' >{p.title}</h1>
        <p className='' >{p.content}</p>
        <div id='menu' className='dotMenu-fc'>
            <i className='btnCard fc' onClick={displayFullCard}><SlActionUndo /></i>
            <i className='btnCard fc' onClick={handleDelete}><SlTrash/></i>
          </div>
    </div>
  </>
  )
}

export default PaperbinItem