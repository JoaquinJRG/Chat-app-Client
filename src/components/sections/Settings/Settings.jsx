import { CopyIcon } from "../../icons/CopyIcon";
import { IdIcon } from "../../icons/IdIcon";
import { MailIcon } from "../../icons/MailIcon";
import { UserIcon } from "../../icons/UserIcon";
import { ProfilePic } from "../Home/ProfilePic";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from "./DeleteModal";
import { useState, useContext } from "react";
import { ProfileContext } from "../../../context/Profile";
import { LanguageContext } from "../../../context/Languaje";

export function Settings({ setIsLogged }) {

  const userData = JSON.parse(localStorage.getItem("userData"))
  const [showDeleteModal, setDeleteModal] = useState(false);
  const { profilePic, setProfilePic } = useContext(ProfileContext);
  const { language, setLanguage } = useContext(LanguageContext);

  const copyId = () => {
    navigator.clipboard.writeText(userData.id);
    //Mostrar notificación
    toast.success('ID copiado', {
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

  const sendImg = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("img", event.target.image.files[0]);
    data.append("id", userData.id);

    if (data.get("img") == "undefined") {
      toast.error('No hay imagen seleccionada', {
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
      fetch("https://chat-app-server-6z6f.onrender.com/addImg", {
        method: "POST",
        body: data
      }).then(res => res.json())
        .then(data => {

          setProfilePic(!profilePic)

          toast.success('Imagen añadida correctamente', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  }

  const handleChange = (e) => {
    setLanguage(e.target.value);
  }

  return (
    <main className="mt-10 lg:mt-0">
      {showDeleteModal && <DeleteModal setShowModal={setDeleteModal} setIsLogged={setIsLogged} />}
      <ToastContainer />
      <div className="p-4">
        <h1 className="text-4xl text-indigo-500 mb-5">Configuración</h1>
        <section className="fade-in-up">
          <h2 className="text-3xl mb-5">Perfil</h2>
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <ProfilePic />
            </div>
            <div className="flex flex-col items-center text-base lg:text-lg">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center justify-start gap-2">
                  <IdIcon />
                  <span className="font-bold">Id:</span>
                  {userData.id}
                  <span title="Copiar" onClick={copyId} className="hover:text-violet-500 cursor-pointer">
                    <CopyIcon />
                  </span>
                </li>
                <li className="flex items-center justify-start gap-2">
                  <UserIcon />
                  <span className="font-bold">Nombre:</span>
                  {userData.nombre}
                </li>
                <li className="flex items-center justify-start gap-2">
                  <MailIcon />
                  <span className="font-bold">Correo:</span>
                  {userData.correo}
                </li>
              </ul>
              <form onSubmit={sendImg} className="flex items-center justify-start gap-2 mt-4">
                <label className="flex items-center gap-2 bg-indigo-500 text-white rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer" htmlFor="image">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-camera">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                    <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  </svg>
                  Seleccionar Imagen
                </label>
                <input type="file" id="image" name="image" accept="image/*" className="hidden" />
                <input
                  type="submit"
                  value="Aceptar"
                  className="bg-indigo-500 text-white rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                />
              </form>
            </div>
          </div>
        </section>
        <section className="fade-in-up">
          <h2 className="text-3xl mb-5 mt-10">Traducción</h2>
          <div className="flex gap-5">
            <p htmlFor="language">Selecciona idioma al que traducir:</p>
            <select name="language" id="language" onChange={handleChange} value={language}>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
              <option value="fr">Francés</option>
              <option value="de">Alemán</option>
            </select>
          </div>
        </section>
        <section className="fade-in-up">
          <h2 className="text-3xl mb-5 mt-10">Cuenta</h2>
          <button
            onClick={() => setDeleteModal(true)}
            className="bg-white px-3 py-2 border border-red-500 text-red-500 rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-red-500 hover:text-white cursor-pointer"
          >
            Eliminar Cuenta
          </button>
        </section>
      </div>
    </main>
  )
}