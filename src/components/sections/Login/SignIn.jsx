import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function SignIn({ setShowSignIn, setIsLogged }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }

    fetch("https://chat-app-server-6z6f.onrender.com/signIn", options).then(res => res.json()).then(data => {
      if (data) {
        setIsLogged(true);
        localStorage.setItem("isLogged", true)

        localStorage.setItem("userData", JSON.stringify({
          id: data[0]["id_usuario"],
          nombre: data[0]["nombre"],
          correo: data[0]["correo"],
        }))
      } else {
        toast.error('Error al iniciar sesión.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });

  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={(e) => signIn(e)} className="flex flex-col justify-between gap-3 w-96 bg-white shadow-md rounded-xl p-4 fade-in-up">
        <h1 className="text-2xl mb-3">Iniciar Sesión</h1>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-xl outline-none bg-[#F4F8FB] border-2 focus:border-indigo-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-xl outline-none bg-[#F4F8FB] border-2 focus:border-indigo-500"
        />
        <input
          type="submit"
          name="submit"
          value="Iniciar sesión"
          className="rounded-xl text-white p-2 cursor-pointer  bg-indigo-500 transition-all hover:-translate-y-1 hover:shadow-lg"
        />
        <p
          className="text-center mt-2 hover:text-indigo-500 cursor-pointer"
          onClick={() => setShowSignIn(false)}
        >
          Crear una cuenta
        </p>
      </form>
    </>
  )
}