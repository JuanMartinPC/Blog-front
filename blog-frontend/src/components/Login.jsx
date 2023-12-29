import {React, useRef} from "react";
import '../styles/Register.css'

function Login() {
  const FormRef = useRef();

  const handleFetch = async (e) => {
    e.preventDefault();

    const newUser = {
      email: FormRef.current.email.value,
      pass: FormRef.current.password.value,
    };

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const text = await response.text();
    const clearResponse = JSON.parse(text)
    const Token = clearResponse[0]
    const userId = clearResponse[1]
    console.log(Token, userId);
    
    localStorage.setItem('token', Token)
    localStorage.setItem('user_id', userId)
    const res = text.split('"')[3];
    
    if (!userId) {
      const render = document.getElementById("msj");
      render.innerText =
        "La direccion de correo o la contraseña son incorrectas.";
    } else {
      return window.location.replace("/home")
    }
  };

  const token = localStorage.getItem('token')
  return (
    <>
        {
          !token ? 
            <section className="loginSection">
            <h1>Iniciar sesión</h1>
            <form className="registerForm" ref={FormRef} onSubmit={handleFetch}>
              <input required placeholder="ejemplo@correo.com" type="email" name="email" />
              <input required placeholder="contraseña" type="password" name="password" />
              <button type="submit" className="formNextBtn">
                Ingresar
              </button>
              <p>Aún no te has registrado? </p><a href="/register">Registrate ahora</a>
              <p id="msj"></p>
            </form>
          </section> :
          window.location.replace('/home')
        }
    </>
  );
}

export default Login;
