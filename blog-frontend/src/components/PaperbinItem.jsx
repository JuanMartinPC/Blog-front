import React from 'react';
import '../styles/PaperbinItem.css'
import { SlTrash, SlActionUndo } from 'react-icons/sl';

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

    function warningDelete(){
      Swal.fire({
        title: "Deseas eliminar definitivamente esta nota?",
        icon: "question",
        showCancelButton: 'true',
        cancelButtonText: 'Mejor no.',
        confirmButtonColor: 'rgb(0, 61, 85)',
        showConfirmButton: 'true',
        confirmButtonText: 'Eliminar.'
      }).then((result) => {
          if (result.isConfirmed){
          handleDelete()}
          else if (result.isDismissed){
            Swal.close()
          }
        })
    }

  return (
  <>
    <div className='ppbiContainer' key={p.post_id} >
      <div className='cardContent'>
          <div className='cardHeader'>
              <h3>{p.title}</h3>
          </div>
          <p className='ppbText'>{p.content}</p>
          <div className="cardFooter">
            <code>{p.upload_date}</code>
            <p>{p.category}</p>
          </div>
          <div id='menu' className='dotMenu'>
            <i className='btnCard' onClick={handleRestore}><SlActionUndo className='ppbItem'/></i>
            <i className='btnCard' onClick={warningDelete}><SlTrash/></i>
          </div>
      </div>
    </div>
  </>
  )
}

export default PaperbinItem