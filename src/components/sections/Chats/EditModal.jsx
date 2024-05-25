import { useRef, useState } from "react";
import { XIcon } from "../../icons/XIcon";


export function EditModal({ setShowModal, text, editMessage, idMsg }) {

  const modalRef = useRef();
  const [newText, setNewText] = useState(text);

  const clickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  }

  const handleClick = () => {
    setShowModal(false);
    editMessage(newText, idMsg);
  }


  return (
    <div onClick={clickOutside} className="absolute z-30 top-0 right-0 w-screen lg:w-11/12 h-screen flex justify-center items-center backdrop-blur-sm overflow-y-auto shadow-md">
      <div ref={modalRef} className="w-80 p-4 bg-white rounded-md z-40 fade-in-up border">
        <header className="flex items-center justify-between mb-8">
          <h3 className="text-2xl">Editar mensaje</h3>
          <button onClick={() => setShowModal(false)} className="hover:text-indigo-500 transition-colors"><XIcon /></button>
        </header>
        <main>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            type="text"
            placeholder="Edita el mensaje"
            className="w-full p-2 mb-6 rounded-xl shadow-md outline-none border-2 border-transparent focus:border-indigo-500 bg-[#F4F8FB]"
          />
          <div className="flex item-center justify-between">
            <button onClick={() => setShowModal(false)} className="bg-white-500 text-indigo-500 border border-indigo-500 rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg">Cancelar</button>
            <button onClick={handleClick} className="bg-indigo-500 text-white rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg">Aceptar</button>
          </div>
        </main>
      </div>
    </div>
  )
}