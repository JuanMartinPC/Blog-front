import React from 'react';
import { SlOptionsVertical, SlDrop, SlPencil} from 'react-icons/sl';

function DotMenu({ p }) {

    /* const [display, setDisplay] = useState(false)
    const displayForm = () => {
        const token = localStorage.getItem('token')
        if (!token){
          alert('Inicia sesión para editar contenido.')
        }else{
            const form = document.getElementById(p.id);
            if (form.classList.contains('d-none')){
                form.classList.remove('d-none')
                form.classList.add('fixed')
                setDisplay(true)
            } else if (form.classList.contains('fixed')){
                form.classList.remove('fixed')
                form.classList.add('d-none')
                setDisplay(false)
            }
        }
    } */

  return (
    <>
        <div className="cardPopup">
            <i>Editar</i>
            <i>Eliminar</i>
        </div>

        <i><SlOptionsVertical /></i>
        <section>
            <ul>
                <li>Editar <SlPencil /></li>
                <li>Borrar <SlDrop /></li>
            </ul>
        </section>
    </>
  )
}

export default DotMenu