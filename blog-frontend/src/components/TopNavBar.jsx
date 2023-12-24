import React, {useState} from 'react';
import '../styles/TopNavBar.css';
import { SlClose, SlGrid, SlMagnifier, SlPlus, SlUserFemale } from "react-icons/sl";

function TopNavBar() {

  const [showBar, setShowBar] = useState(false)

  const displayBar = () => {
    
    const sidebar = document.getElementById('SideBar');
    const btn = document.getElementById('btn')
    if (sidebar.classList.contains('hidden')){
        sidebar.classList.remove('hidden')
        sidebar.classList.add('SideBar')
        btn.classList.remove('btnSideBar')
        btn.classList.add('hidden')
        setShowBar(true)
    } else if (sidebar.classList.contains('SideBar')){
        sidebar.classList.remove('SideBar')
        sidebar.classList.add('hidden')
        btn.classList.add('btnSideBar')
        btn.classList.remove('hidden')
        setShowBar(false)
    }
  }
  
  return (
    <>
      
      <i id='btn' onClick={displayBar} className='btnSideBar'><SlGrid /></i>
      

      <section id='SideBar' className='hidden'>
        <h1>Notas</h1>
        <SlPlus />
        <SlUserFemale />
        <i onClick={displayBar}><SlClose /></i>
      </section>
    </>
  )
}

export default TopNavBar