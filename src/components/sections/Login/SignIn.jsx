import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { EyeOffIcon } from "../../icons/EyeOffIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import { KeyIcon } from "../../icons/KeyIcon";
import { MailIcon } from "../../icons/MailIcon";

export function SignIn({ setShowSignIn, setIsLogged }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signIn = (e) => {
    e.preventDefault();

    if (email == "" || password == "") return;

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
      <form onSubmit={(e) => signIn(e)} className="flex flex-col select-none justify-between gap-3 w-96 bg-white shadow-md rounded-xl p-4 fade-in-up">
        <h1 className="text-2xl mb-3 font-semibold">Iniciar Sesión</h1>
        <div className="flex items-center gap-2 p-2 rounded-xl outline-none bg-[#F4F8FB] shadow-md border-2 border-transparent focus-within:border-indigo-500">
          <MailIcon />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none w-full bg-[#F4F8FB]"
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
            className="outline-none w-full bg-[#F4F8FB]"
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