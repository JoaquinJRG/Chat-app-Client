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
  const [loadind, setLoanding] = useState(false);

  const register = (e) => {
    e.preventDefault();

    setLoanding(true);

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
      }).finally(() => {
        setLoanding(false);
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
        {
          loadind ? (
            <div className="flex items-center justify-center">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <input
              type="submit"
              name="submit"
              value="Crear cuenta"
              className="rounded-xl text-white p-2 cursor-pointer bg-indigo-500 transition-all hover:-translate-y-1 hover:shadow-lg"
            />
          )
        }
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