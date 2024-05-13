import { useState } from "react";
import { DotsIcon } from "../../icons/DotsIcon";
import { StarIcon } from "../../icons/StarIcon";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ChatBubble2({ children, fecha, idMensaje, isFav }) {
  const date = new Date(Math.trunc(fecha));
  const formattedDate = date.toLocaleTimeString();
  const [showMenu, setShowMenu] = useState(false);
  const [showFav, setShowFav] = useState(isFav);

  const addToFavorites = () => {
    fetch(`https://chat-app-server-6z6f.onrender.com/addToFavorites/${idMensaje}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setShowMenu(false);
          //Mostrar notificación
          toast.success('Mensaje añadido a favoritos', {
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
  };

  return (
    <div className="flex flex-col mb-2">
      <ToastContainer />
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center px-5 py-2 min-w-28 max-w-64 bg-[#F4F8FB] text-xl text-wrap text-center rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-md">
          <p>{children}</p>
        </div>
        <div
          className="cursor-pointer hover:text-indigo-500"
          onClick={() => setShowMenu(!showMenu)}
        >
          <DotsIcon width={18} height={18} />
        </div>
        <div className="cursor-pointer">
          <div className={`${showMenu ? "relative" : "hidden"} z-20 bg-white divide-y divide-gray-100 rounded-xl shadow w-44`}>
            <ul className="py-2 text-sm text-gray-700 bg-indigo-100 rounded-xl">
              <li
                onClick={addToFavorites}
                className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200"
              >
                <StarIcon width={14} height={14} />
                <span>Favorito</span>
              </li>
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200">
                <span>Modificar</span>
              </li>
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200">
                <span>Eliminar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span className="flex text-xs justify-start">{formattedDate}</span>
    </div>
  )
}
