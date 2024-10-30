import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from '@/components'
import { useAuth } from "../hooks/useAuth";

export const Register = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState([]);

  const {register} = useAuth({middleware: 'guest', url:'/'});


  const handleSubmit = async e => {
    e.preventDefault();

    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_onfirmation: passwordConfirmationRef.current.value
    };

   register(newUser, setErrors);
  }

  return (
    <>
      <h1 className="text-4xl font-black font-lato">Registrar</h1>
      <p className="font-lato">Crea tu cuenta con este formulario</p>
      <div className="bg-slate-300 shadow-md rounded-lg mt-10 px-5 py-10">
        <form onSubmit={handleSubmit}>
          {errors ? errors.map(error => (
            <Alert key={error}>{error}</Alert>
          )) : null }
          <div className="mb-5">
            <label htmlFor="name" className="text-slate-800 font-lato">
              Nombre: 
            </label>
            <input 
              type="text"
              id="name" 
              className="mt-2 w-full p-3 bg-gray-50 rounded-lg"
              placeholder="Ingresa tu nombre"
              ref={nameRef}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="text-slate-800 font-lato">
              Email: 
            </label>
            <input 
              type="email"
              id="email" 
              className="mt-2 w-full p-3 bg-gray-50 rounded-lg"
              placeholder="Ingresa tu email"
              ref={emailRef}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="text-slate-800 font-lato">
              Password: 
            </label>
            <input 
              type="password"
              id="password" 
              className="mt-2 w-full p-3 bg-gray-50 rounded-lg"
              placeholder="Ingresa tu password"
              ref={passwordRef}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password_confirmation" className="text-slate-800 font-lato">
              Repetir password: 
            </label>
            <input 
              type="password"
              id="password_confirmation" 
              className="mt-2 w-full p-3 bg-gray-50 rounded-lg"
              placeholder="Repetir password"
              ref={passwordConfirmationRef}
            />
          </div>
          <input 
            type="submit" 
            value="Crear cuenta" 
            className="bg-cyan-600 hover:bg-cyan-900 text-white w-full mt-5 p-3 uppercase font-lato font-bold cursor-pointer rounded-lg"
          />
        </form>
        <nav className="mt-5">
          <Link to="/auth/login">
            <span className="font-lato">¿Ya tienes una cuenta? Inicia Sesión</span>
          </Link>
        </nav>
      </div>
    </>
  )
}
