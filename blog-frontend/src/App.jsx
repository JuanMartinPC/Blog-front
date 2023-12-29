import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Register from './pages/Register.jsx';
import { PostContextProvider } from './context/PostContext.jsx';
import Paperbin from './pages/Paperbin.jsx';
import Profile from './pages/Profile.jsx';
import Users from './pages/Users.jsx';

function App(){ 
  return (
    <>
      <BrowserRouter>
        <PostContextProvider>
          <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/users' element={<Users />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/paperbin' element={<Paperbin />}/>
          </Routes>
        </PostContextProvider>         
      </BrowserRouter>
    </>
  )
}

export default App
