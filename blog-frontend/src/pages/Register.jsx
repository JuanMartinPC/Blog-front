import '../styles/Register.css'
import { useRef, useState } from 'react';
import Swal from 'sweetalert2'


function Register() {

    const formRef = useRef()

    async function getImageName(e){
        const imageName = await e.target.name
        const imgId = await e.target.id
        for (let i = 1; i<7; i++){
            let img = document.getElementById(`avatarImageId${i}`)
            if (img.classList.contains('active')){
                img.classList.remove('active')
            }
        }
        const img = document.getElementById(imgId)
        img.classList.add('active')
        setImage(imageName)
    }

    const [image, setImage] = useState(undefined)

    async function handleRegister(){
        const newUser = {
            username: formRef.current.username.value,
            email: formRef.current.email.value,
            pass: formRef.current.pass.value,
            image: image
        }

        await fetch('http://localhost:3000/users/register',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

            Swal.fire({
                title: "Registrado con exito!",
                icon: "success",
                confirmButtonColor: 'rgb(0, 61, 85)',
                showConfirmButton: 'true',
                confirmButtonText: 'Terminar'
            }).then((isConfirm) => {
                if (isConfirm){
                window.location.replace('/')}
            });
    }

  return (
    <div className='RegisterMainContainer'>
        <section id='s1' className='registerSection'>
            <h1>Tus Datos</h1>
            <form className='registerForm' ref={formRef} onSubmit={(e) => {e.preventDefault()}}>
                <input type="text" name='username' required minLength={5} maxLength={12} placeholder='Nombre de usuario'/>
                <input type="email" name='email' required placeholder='ejemplo@mail.com'/>
                <input type="password" name='pass' required minLength={8} maxLength={12} placeholder='Contraseña'/>
            </form>
            <div className='fBtnContainer'>
                <a className='formNextBtn' href="#s2">Siguiente</a>
            </div>
            <p>Ya te has registrado?<a href="/">Inicia sesión</a></p>
        </section>
        
        <section id='s2' className='registerSection'>
            <h1>Selecciona un Avatar</h1>
            <div className='avatarImgContainer'>
                <img id='avatarImageId1' className='avatarImg' onClick={(e)=>getImageName(e)} name="avatar 1.png" src="../../public/images/avatar 1.png" alt="" />
                <img id='avatarImageId2' className='avatarImg' onClick={(e)=>getImageName(e)} name="avatar 2.png" src="../../public/images/avatar 2.png" alt="" />
                <img id='avatarImageId3' className='avatarImg' onClick={(e)=>getImageName(e)} name="avatar 3.png" src="../../public/images/avatar 3.png" alt="" />
                <img id='avatarImageId4' className='avatarImg' onClick={(e)=>getImageName(e)} name="avatar 4.png" src="../../public/images/avatar 4.png" alt="" />
                <img id='avatarImageId5' className='avatarImg' onClick={(e)=>getImageName(e)} name="avatar 5.png" src="../../public/images/avatar 5.png" alt="" />
                <img id='avatarImageId6' className='avatarImg' onClick={(e)=>getImageName(e)} name="avatar 6.png" src="../../public/images/avatar 6.png" alt="" />
            </div>
            <div className='fBtnContainer'>
                <a className='formBackBtn' href="#s1">Atras</a>
                <a onClick={(e) => {e.preventDefault(), handleRegister()}} className='formNextBtn'>Finalizar!</a>
            </div>
        </section>
        
        {/* <section id='s3' className='registerSection'>
            <h1>Sobre qué te gustaría leer/escribir?</h1>
            <form className='checkboxForm'>
                <label htmlFor="series">Series | Peliculas</label>
                <input type="checkbox" name="series"/>
                
                <label htmlFor="musica">Música</label>
                <input type="checkbox" name="musica"/>
                
                <label htmlFor="deportes">Deportes</label>
                <input type="checkbox" name="deportes"/>
                
                <label htmlFor="salud">Salud</label>
                <input type="checkbox" name="salud"/>
                
                <label htmlFor="cocina">Cocina</label>
                <input type="checkbox" name="cocina"/>

                <label htmlFor="viajes">Viajes</label>
                <input type="checkbox" name="viajes"/>

                <label htmlFor="productividad">Productividad</label>
                <input type="checkbox" name="productividad"/>

                <label htmlFor="finanzas">Finanzas</label>
                <input type="checkbox" name="finanzas"/>
            </form>
            <div className='fBtnContainer'>
                <a className='formBackBtn' href="#s2">Atras</a>
                <button type="submit" className='formNextBtn' href="/home">Finalizar!</button>
            </div>
        </section> */}
    </div>
  )
}

export default Register