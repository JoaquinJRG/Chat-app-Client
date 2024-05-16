import { useState, useEffect } from "react";
import { StarOffIcon } from "../../icons/StarOffIcon";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Favs() {

  const idUser = JSON.parse(localStorage.getItem("userData")).id;
  const [favList, setFavList] = useState([]);

  const updateFavList = () => {
    fetch(`https://chat-app-server-6z6f.onrender.com/favorites/${idUser}`)
      .then(res => res.json())
      .then(data => {
        setFavList(data);
      });
  }

  useEffect(() => {
    fetch(`https://chat-app-server-6z6f.onrender.com/favorites/${idUser}`)
      .then(res => res.json())
      .then(data => setFavList(data));
  }, []);

  const removeFav = (id) => {
    fetch(`https://chat-app-server-6z6f.onrender.com/removeFromFavorites/${id}`)
      .then(res => res.json())
      .then(data => {
        updateFavList();
        if (data.rowsAffected) {
          toast.success('Mensaje eliminado de favoritos.', {
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
          toast.error('Error', {
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
    <main className="p-4 mt-10 lg:mt-0">
      <ToastContainer />
      <h1 className="text-4xl text-indigo-500 mb-5">Favoritos</h1>
      <div className="flex flex-col gap-4 w-full lg:w-3/4 h-[90vh] overflow-y-scroll pb-5">
        {
          favList ? (
            favList.map((msg, index) => (
              <div
                className="flex items-center justify-between bg-white px-2 lg:px-10 py-3 lg:py-6 rounded-xl shadow-lg fade-in-up"
                key={index}
              >
                <section className="flex items-center gap-5">
                  <div className="flex flex-col items-center justify-center">
                    {msg.img_perfil == null ? <img src="/user.svg" alt="Imagen de perfil" className="w-12 h-12 lg:w-20 lg:h-20 border-2 border-indigo-500 rounded-full" /> : <img src={`data:image/jpeg;base64,${msg.img_perfil}`} alt="Imagen de perfil" className="w-12 h-12 lg:w-20 lg:h-20 border-2 border-indigo-500 rounded-full" />}
                    <p>{msg.nombre}</p>
                  </div>
                  <div className="flex items-center px-5 py-2 min-w-28 max-w-64 bg-[#F4F8FB] text-xl text-wrap text-center rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-md">
                    <p>{msg.texto}</p>
                  </div>
                </section>
                <div
                  onClick={() => removeFav(msg.id_mensaje)}
                  className="cursor-pointer bg-[#F4F8FB] p-3 rounded-lg hover:text-indigo-500"
                >
                  <StarOffIcon />
                </div>
              </div>
            ))
          ) : <span>No hay mensajes en favoritos</span>
        }
      </div>
    </main>
  )
}