import '../styles/Home.css'
import { SlBell, SlBubbles, SlHome, SlPeople, SlPower, SlUser } from "react-icons/sl";

function NavBar() {
    function toHome(){
        window.location.replace('/home')
      }
      function toProfile(){
        window.location.replace('/profile')
      }
      function toUsers(){
        window.location.replace('/users')
       }
      function Logout(){
        localStorage.removeItem('token')
        return window.location.replace('/')
      }
    
  return (
    <nav id='SideBar' className='SideBar'>
        <a className='sbBtn' onClick={toHome}><SlHome className='sbIcon' /></a>
        {/* <a className='sbBtn' onClick={displayForm}><SlPlus className='sbIcon' /></i> */}
        {/* <a className='sbBtn' onClick={toPaperbin} ><SlTrash className='sbIcon' /></i> */}
        <a className='sbBtn' onClick={toUsers}><SlPeople className='sbIcon' /></a>
        <a className='sbBtn'><SlBubbles className='sbIcon' /></a>
        <a className='sbBtn'><SlBell className='sbIcon' /></a>
        <a className='sbBtn' onClick={toProfile}><SlUser className='sbIcon' /></a>
        <a onClick={Logout} className='sbBtn'><SlPower /></a>
    </nav>
  )
}

export default NavBar