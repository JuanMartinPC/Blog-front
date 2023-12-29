import React, { useContext, useRef } from 'react';
import '../styles/Card.css'
import '../styles/Add.css'
import { SlLike, SlSpeech } from 'react-icons/sl';
import PostContext from '../context/PostContext.jsx';
import Swal from 'sweetalert2';

function Card({p}) {

  function toPaperbin(){
    const token = localStorage.getItem('token')
    const post = {
        "user_id": p.user_id,
        "post_id":p.post_id,
        "title": p.title,
        "content": p.content,
        "category": p.category
    }

    fetch('http://localhost:3000/posts/paperbin',
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err)) 
    window.location.reload()}

  const editRef = useRef()

  function handleEdit(){
    fetch(`http://localhost:3000/posts/update?id=${p.post_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(post)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
      alert('Editado')
      window.location.reload()
  }

  function warningDelete(){
    Swal.fire({
      title: "Deseas enviar esta nota a la papelera?",
      icon: "question",
      showCancelButton: 'true',
      cancelButtonText: 'Mejor no.',
      confirmButtonColor: 'rgb(0, 61, 85)',
      showConfirmButton: 'true',
      confirmButtonText: 'Si, enviar.'
    }).then((result) => {
        if (result.isConfirmed){
        toPaperbin()}
        else if (result.isDismissed){
          Swal.close()
        }
      })
  }

  return (
  <>
    <div className='cardContainer' key={p.post_id}>
      <div className='cardContent'>
          <div className='cardHeader'>
            <div className='df'>
              <img className='cardAvatarImg' src={`../../public/images/${p.image}`} alt="avatar"/>
              <h3>{p.username}</h3>
            </div>
            <p>Seguir</p>
          </div>
              <h3>{p.title}</h3>
          <p className='cardText'>{p.content}</p>
          <div className="cardFooter">
            <code>{p.upload_date}</code>
            <p>{p.category}</p>
          </div>
          <div id='menu' className='dotMenu'>
            <i className='btnCard' ><SlLike /></i>
            <i className='btnCard' ><SlSpeech /></i>
            {/* <i className='btnCard' onClick={warningDelete}><SlTrash/></i> */}
          </div>
      </div>
    </div>


    <form id={p.post_id} className='hidden' ref={editRef} onSubmit={(e) => {e.preventDefault(), handleEdit}}>
        <h2>Editar Nota</h2>
        <section className='FormContainer'>
            <section className="form-image">
                <img src="https://ps.w.org/image-comparison/assets/icon-256x256.png?rev=2587037" alt="prueba"/>
                <input type="file" name="image" id="image" />
            </section>

            <section className="form-inputs">
                {/* <label htmlFor="title">Titulo</label> */}
                <input type="text" name='title' required='true' defaultValue={p.title}/>
                
                {/* <label htmlFor="content">Contenido</label> */}
                <input type="text" name='content' required='true' defaultValue={p.content} />

                {/* <label htmlFor="category">Etiqueta</label> */}
                <input type="text" name='category' required='true' defaultValue={p.category}/>

                <div className="btnContainer">
                    <button>Cancelar</button>
                    <button type='submit'>Agregar</button>
                </div>
            </section>
        </section>
    </form>

    <div id='notification' className='notification'>
      <h4>Enviado a la papelera.</h4>
    </div>
  </>
  )
}

export default Card