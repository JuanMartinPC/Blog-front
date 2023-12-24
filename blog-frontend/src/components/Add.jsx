import React, { useRef } from 'react';
import '../styles/Add.css'

function Add({ toggle }) {

    const FormRef = useRef();
    const Token = localStorage.getItem('Token');
    const user_id = localStorage.getItem('user_id');
    
    const handleFetch = () => {
        const newDependece = {
            "user_id": user_id,
            "title": FormRef.current.title.value,
            "content": FormRef.current.content.value,
            "category": FormRef.current.category.value
        }

        fetch('http://localhost:3000/posts/post',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Token
        },
        body: JSON.stringify(newDependece)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

        window.location.replace('/home')
    }



    return (
        <form className='FullForm' ref={FormRef} onSubmit={(e) => {e.preventDefault(), handleFetch()}}>
            <h2>Agregar Nota</h2>
            <section className='FormContainer'>
                <section className="form-image">
                    <img src="https://ps.w.org/image-comparison/assets/icon-256x256.png?rev=2587037" alt="prueba"/>
                    <input type="file" name="image" id="image" />
                </section>

                <section className="form-inputs">
                    {/* <label htmlFor="title">Titulo</label> */}
                    <input type="text" name='title' required='true' placeholder='Titulo' />
                    
                    {/* <label htmlFor="content">Contenido</label> */}
                    <input type="text" name='content' required='true' placeholder='Contenido' />

                    {/* <label htmlFor="category">Etiqueta</label> */}
                    <input type="text" name='category' required='true' placeholder='Categoría'/>

                    <div className="btnContainer">
                        <button className='addBtn' onClick={toggle} >Cancelar</button>
                        <button className='addBtn' type='submit'>Agregar</button>
                    </div>
                </section>
            </section>
        </form>
    )
}

export default Add