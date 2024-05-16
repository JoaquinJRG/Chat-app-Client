import { XIcon } from "../../icons/XIcon";
import { useState, useRef } from "react";

export function Modal({ setShowModal, updateChatsList }) {

  const idUser1 = JSON.parse(localStorage.getItem("userData")).id;
  const [idUser2, setIdUser2] = useState("");
  const modalRef = useRef();

  const createChat = () => {
    if (!idUser2) return;

    fetch("https://chat-app-server-6z6f.onrender.com/createChat", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idUser1: idUser1,
        idUser2: idUser2
      })
    })
      .then(res => res.json())
      .then(data => {
        //Controlar error
        console.log(data)
        updateChatsList();
        setShowModal(false);
      });
  };

  const clickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  }

  return (
    <div onClick={clickOutside} className="w-full lg:w-11/12 h-full flex justify-center items-center fixed backdrop-blur-sm z-20 overflow-y-auto shadow-md">
      <div ref={modalRef} className="w-80 p-4 bg-white rounded-md z-40 fade-in-up">
        <header className="flex items-center justify-between mb-8">
          <h3 className="text-2xl">Nuevo Chat</h3>
          <button onClick={() => setShowModal(false)} className="hover:text-indigo-500 transition-colors"><XIcon /></button>
        </header>
        <main>
          <input
            onChange={(e) => setIdUser2(e.target.value)}
            type="text"
            placeholder="ID Usuario"
            className="w-full p-2 mb-6 rounded-xl shadow-md outline-none border-2 border-transparent focus:border-indigo-500 bg-[#F4F8FB]"
          />
          <div className="flex item-center justify-between">
            <button onClick={() => setShowModal(false)} className="bg-white-500 text-indigo-500 border border-indigo-500 rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg">Cancelar</button>
            <button onClick={createChat} className="bg-indigo-500 text-white rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg">Aceptar</button>
          </div>
        </main>
      </div>
    </div>
  )
}