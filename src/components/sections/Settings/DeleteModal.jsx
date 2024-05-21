import { useRef } from "react";
import { XIcon } from "../../icons/XIcon";

export function DeleteModal({ setShowModal, setIsLogged }) {

  const idUser = JSON.parse(localStorage.getItem("userData")).id;
  const modalRef = useRef();

  const clickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  const handleClick = () => {
    fetch(`http://chat-app-server-6z6f.onrender.com/deleteUser/${idUser}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => setIsLogged(false));
  };

  return (
    <div onClick={clickOutside} className="w-full lg:w-11/12 h-full flex justify-center items-center fixed backdrop-blur-sm z-20 overflow-y-auto shadow-md">
      <div ref={modalRef} className="w-80 p-4 bg-white rounded-md z-40 fade-in-up border">
        <header className="flex items-center justify-between mb-8">
          <h3 className="text-2xl">Eliminar la cuenta</h3>
          <button onClick={() => setShowModal(false)} className="hover:text-indigo-500 transition-colors"><XIcon /></button>
        </header>
        <main>
          <div className="flex item-center justify-between">
            <button onClick={() => setShowModal(false)} className="bg-white-500 text-indigo-500 border border-indigo-500 rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg">Cancelar</button>
            <button
              onClick={handleClick}
              className="bg-indigo-500 text-white rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              Aceptar
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}