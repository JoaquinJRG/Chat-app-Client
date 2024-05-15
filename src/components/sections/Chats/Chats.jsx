import { useEffect, useState } from "react"
import { Modal } from "./Modal";
import { UserIcon } from "../../icons/UserIcon";
import { ChatDiv } from "./ChatDiv";

export function Chats() {

  const id = JSON.parse(localStorage.getItem("userData")).id;
  const [showModal, setShowModal] = useState(false);
  const [listaChats, setListaChats] = useState([]);
  const [idChat, setIdChat] = useState("");
  const [idUser, setIdUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [showChatDiv, setShowChatDiv] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`https://chat-app-server-6z6f.onrender.com/myCreateChats/${id}`)
      .then(res => res.json())
      .then(data => {
        setListaChats(data);
      });
  }, [])

  const updateChatsList = () => {
    // Volver a cargar la lista de chats después de crear un nuevo chat
    fetch(`https://chat-app-server-6z6f.onrender.com/myCreateChats/${id}`)
      .then(res => res.json())
      .then(data => {
        setListaChats(data);
      });
  };

  let filteredChats = listaChats;

  filteredChats = filteredChats.filter((chat) =>
    chat.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex mt-10 lg:mt-0 max-h-screen overflow-y-hidden">
      {showModal && <Modal setShowModal={setShowModal} updateChatsList={updateChatsList} />}
      <div className="p-4 max-h-screen max-w-screen w-full lg:w-1/3">
        <header className="flex gap-5 items-center justify-between">
          <h1 className="text-4xl text-indigo-500">Chats</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-500 text-white rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            + Nuevo Chat
          </button>
        </header>
        <div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Buscar ..."
            className="w-full p-2 my-4 rounded-xl shadow-md outline-none border-2 border-transparent focus:border-indigo-500"
          />
          <article className="w-full h-[90vh] overflow-y-scroll flex flex-col gap-3">
            {
              listaChats &&
              filteredChats.map((chatData, index) => (
                <section
                  onClick={() => {
                    if (showChatDiv) {
                      if (chatData["id_chat"] == idChat) {
                        setShowChatDiv(false);
                        setIdChat("");
                      } else {
                        setShowChatDiv(false);
                        setIdChat(chatData["id_chat"]);
                        setIdUser(chatData["id_usuario"]);
                        setNameUser(chatData["nombre"]);
                        setImgUser(chatData["img_perfil"]);
                      }
                    } else {
                      setIdChat(chatData["id_chat"]);
                      setIdUser(chatData["id_usuario"]);
                      setNameUser(chatData["nombre"]);
                      setImgUser(chatData["img_perfil"]);
                      setShowChatDiv(true);
                    }
                  }}
                  key={index}
                  className={` w-full flex items-center gap-4 bg-white p-3 rounded-xl shadow-md border-2  hover:border-indigo-500 cursor-pointer ${idChat == chatData["id_chat"] ? "border-indigo-500" : "border-transparent"}`}
                >
                  <div className="border-2 border-indigo-500 text-indigo-500 rounded-full">
                    {chatData["img_perfil"] == null ? <UserIcon width={64} height={64} /> : <img src={`data:image/jpeg;base64,${chatData["img_perfil"]}`} alt="Imagen de perfil" className="w-16 h-16 rounded-full" />}
                  </div>
                  <span className="text-xl">{chatData.nombre}</span>
                </section>
              ))
            }
          </article>
        </div>
      </div >
      {
        showChatDiv && <ChatDiv setIdChat={setIdChat} setShowChatDiv={setShowChatDiv} idChat={idChat} myId={id} userId={idUser} nameUser={nameUser} imgUser={imgUser} />
      }
    </div >
  )
}

