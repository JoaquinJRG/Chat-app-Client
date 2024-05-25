import { useState } from "react";
import { DotsIcon } from "../../icons/DotsIcon";
import { CopyIcon } from "../../icons/CopyIcon";
import { TrashIcon } from "../../icons/TrashIcon";
import { EditIcon } from "../../icons/EditIcon";
import { EditModal } from "./EditModal";

export function ChatBubble({ children, fecha, idMensaje, deleteMessage, editMessage }) {
  const date = new Date(Math.trunc(fecha));
  const formattedDate = date.toLocaleTimeString();
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(children);
    setShowMenu(false);
    //Mostrar notificación
  };

  const handleDelete = () => {
    deleteMessage(idMensaje);
    setShowMenu(false);
    //Mostrar notificación
  };

  const handleEdit = () => {
    setShowMenu(false);
    setShowEdit(true);
    //Mostrar notificación
  }

  return (
    <>
      {showEdit && <EditModal text={children} setShowModal={setShowEdit} editMessage={editMessage} idMsg={idMensaje} />}
      <div className="flex flex-col">
        <div className="flex items-center justify-end gap-2">
          <div className="cursor-pointer">
            <div className={`${showMenu ? "relative" : "hidden"} z-20 bg-white divide-y divide-gray-100 rounded-xl shadow w-44`}>
              <ul className="py-2 text-sm text-gray-700 bg-indigo-100 rounded-xl">
                <li
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200"
                >
                  <EditIcon width={14} height={14} />
                  <span>Editar</span>
                </li>
                <li
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200"
                >
                  <TrashIcon width={14} height={14} />
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
    </>
  )
}
