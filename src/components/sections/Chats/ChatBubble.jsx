import { useState } from "react";
import { DotsIcon } from "../../icons/DotsIcon";
import { CopyIcon } from "../../icons/CopyIcon";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TrashIcon } from "../../icons/TrashIcon";
import { EditIcon } from "../../icons/EditIcon";

export function ChatBubble({ children, fecha, idMensaje }) {
  const date = new Date(Math.trunc(fecha));
  const formattedDate = date.toLocaleTimeString();
  const [showMenu, setShowMenu] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(children);
    setShowMenu(false);
    //Mostrar notificación
    toast.success('Mensaje copiado', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <div className="flex items-center justify-end gap-2">
        <div className="cursor-pointer">
          <div className={`${showMenu ? "relative" : "hidden"} z-20 bg-white divide-y divide-gray-100 rounded-xl shadow w-44`}>
            <ul className="py-2 text-sm text-gray-700 bg-indigo-100 rounded-xl">
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200">
                <span>Modificar</span>
              </li>
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200">
                <span>Eliminar</span>
              </li>
              <li
                onClick={copyText}
                className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200"
              >
                <CopyIcon width={14} height={14} />
                <span>Copiar</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="cursor-pointer hover:text-indigo-500"
          onClick={() => setShowMenu(!showMenu)}>
          <DotsIcon width={18} height={18} />
        </div>
        <div className="px-5 py-2 min-w-28 max-w-64 bg-indigo-500 text-xl text-wrap text-center rounded-tr-xl rounded-tl-xl rounded-bl-xl shadow-md text-white">
          <p>{children}</p>
        </div>
      </div>
      <span className="flex text-xs justify-end">{formattedDate}</span>
    </div>
  )
}
