import { Link } from "react-router-dom"
import { useRef, useState } from "react";
import { Alert } from "@/components";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState([]);
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });


  const handleSubmit = async e => {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(user, setErrors);
  }


  return (
    <>
      <h1 className="text-4xl font-black font-lato">Iniciar sesión</h1>
      <p className="font-lato">Para visualizar facturas debes iniciar sesión</p>
      <div className="bg-slate-300 shadow-md rounded-lg mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {
            errors ? errors.map(error => (
              <Alert key={error}>{error}</Alert>
            )) : null
          }
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
          <input 
            type="submit" 
            value="Ingresar" 
            className="bg-cyan-600 hover:bg-cyan-900 text-white w-full mt-5 p-3 uppercase font-lato font-bold cursor-pointer rounded-lg"
          />
        </form>
        <nav className="mt-5">
          <Link to="/auth/register">
            <span className="font-lato">¿Aún no tienes una cuenta? Registrate</span>
          </Link>
        </nav>
      </div>
    </>
  )
}
