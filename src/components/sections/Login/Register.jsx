import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Register({ setShowSignIn }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    }

    fetch("https://chat-app-server-6z6f.onrender.com/createUsuario", options)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setName("");
          setEmail("");
          setPassword("");
          toast.success('Cuenta creada correctamente.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error('Error al crear la cuenta.', {
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

  //Leer sobre el auto-complete
  return (
    <>
      <ToastContainer />
      <form onSubmit={(e) => register(e)} className={`flex flex-col justify-between gap-3 w-96 bg-white shadow-md rounded-xl p-4 fade-in-up`}>
        <h1 className="text-2xl mb-3">Crear cuenta</h1>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded-xl outline-none bg-[#F4F8FB] border-2 focus:border-indigo-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-xl outline-none bg-[#F4F8FB] border-2 focus:border-indigo-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-xl outline-none bg-[#F4F8FB] border-2 focus:border-indigo-500"
          required
        />
        <input
          type="submit"
          name="submit"
          value="Crear cuenta"
          className="rounded-xl text-white p-2 cursor-pointer bg-indigo-500 transition-all hover:-translate-y-1 hover:shadow-lg"
        />
        <p
          className="text-center mt-2 hover:text-indigo-500 cursor-pointer"
          onClick={() => setShowSignIn(true)}
        >
          Iniciar sesión
        </p>
      </form>
    </>
  )
}