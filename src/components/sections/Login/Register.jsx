import { useState } from "react";
import { EyeOffIcon } from "../../icons/EyeOffIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { KeyIcon } from "../../icons/KeyIcon";
import { MailIcon } from "../../icons/MailIcon";
import { UserIcon } from "../../icons/UserIcon";

export function Register({ setShowSignIn }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      <form onSubmit={(e) => register(e)} className={`flex flex-col select-none justify-between gap-3 w-96 bg-white shadow-md rounded-xl p-4 fade-in-up`}>
        <h1 className="text-2xl mb-3 font-semibold">Crear cuenta</h1>
        <div className="flex items-center gap-2 p-2 rounded-xl outline-none bg-[#F4F8FB] shadow-md border-2 border-transparent focus-within:border-indigo-500">
          <UserIcon />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
            className="w-full outline-none bg-[#F4F8FB]"
            required
          />
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xl outline-none bg-[#F4F8FB] shadow-md border-2 border-transparent focus-within:border-indigo-500">
          <MailIcon />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none bg-[#F4F8FB]"
            required
          />
        </div>
        <div className="flex items-center gap-2 p-2 rounded-xl outline-none bg-[#F4F8FB] shadow-md border-2 border-transparent focus-within:border-indigo-500">
          <KeyIcon />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none bg-[#F4F8FB]"
            required
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer hover:text-indigo-500"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </div>
        </div>
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