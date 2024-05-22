import { useEffect, useState } from "react";
import { DotsIcon } from "../../icons/DotsIcon";
import { SendIcon } from "../../icons/SendIcon";
import { XIcon } from "../../icons/XIcon";
import { ChatBubble } from "./ChatBubble";
import { ChatBubble2 } from "./ChatBubble2";
import { EmojiModal } from "./EmojiModals";
import io from "socket.io-client";
import { ArrowDownIcon } from "../../icons/ArrowDownIcon";

export function ChatDiv({ setIdChat, setShowChatDiv, idChat, myId, userId, nameUser, imgUser }) {

  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const [messajeList, setMessajeList] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  let typingTime;

  //Sonido notificación 
  const pop = () => {
    let sound = new Audio("pop2.mp3");
    sound.play();
  }

  useEffect(() => {

    fetch(`https://chat-app-server-6z6f.onrender.com/chatMessages/${idChat}`)
      .then(res => res.json())
      .then(data => {
        if (data) setMessajeList([...data]);
      });

    const newSocket = io("https://chat-app-server-6z6f.onrender.com");

    // Manejar eventos del servidor
    newSocket.on('connect', () => {
      console.log('Conectado al servidor Socket.IO. id Chat: ' + idChat);
      newSocket.emit("join_room", idChat);

      newSocket.on("recive_message", (data) => {
        setMessajeList(prevMsg => [...prevMsg, data]);
        pop();
      })

    });

    newSocket.on("is_typing", () => {
      setIsTyping(true);

      if (typingTime) clearTimeout(typingTime);
      //Ocultar a los 2 segundos
      typingTime = setTimeout(() => {
        setIsTyping(false);
      }, 1000);

    });

    newSocket.on('disconnect', () => {
      console.log('Desconectado del servidor Socket.IO id Chat: ' + idChat);
    });

    // Guardar el socket en el estado
    setSocket(newSocket);

    //Mostrar botón
    const handleScroll = () => {
      const chatDiv = document.getElementById("chatDiv");
      setShowScrollButton(chatDiv.scrollHeight - Math.round(chatDiv.scrollTop) !== chatDiv.clientHeight);
    };

    const chatDiv = document.getElementById("chatDiv");
    chatDiv.addEventListener("scroll", handleScroll);

    // Limpieza al desmontar el componente
    return () => {
      newSocket.disconnect();
      newSocket.off("recive_message");
      newSocket.off("is_typing");
      chatDiv.removeEventListener("scroll", handleScroll)
    };
  }, []);

  //Mover hacia abajo cada vez que se añade un mensaje
  useEffect(() => {
    const chatDiv = document.getElementById("chatDiv");
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }, [messajeList]);

  const sendText = (e) => {
    e.preventDefault();

    if (!text) return;

    const msg = {
      id_mensaje: crypto.randomUUID(),
      texto: text,
      id_chat: idChat,
      usuario_envia: myId,
      usuario_recibe: userId,
      fecha: Date.now()
    }

    socket.emit("send_message", msg);
    setMessajeList(prevMsg => [...prevMsg, msg]);
    setText("");
    pop();
  }

  const scrollDown = () => {
    const chatDiv = document.getElementById("chatDiv");
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }

  const handleTyping = () => {
    socket.emit("typing", idChat);
  };

  return (
    <div className={`lg:py-4 lg:px-8 lg:w-2/3 w-full h-[95vh] lg:h-screen absolute lg:static fade-in-up`}>
      <div className="px-4 h-full bg-white lg:rounded-xl lg:shadow-md">
        <header className="flex justify-between items-center border-b border-gray-300 h-[10%]">
          <div className="flex gap-4 items-center">
            {imgUser == null ? <img src="/user.svg" alt="Imagen de perfil" className="w-10 h-10 border-2 border-indigo-500 rounded-full" /> : <img src={`data:image/jpeg;base64,${imgUser}`} alt="Imagen de perfil" className="w-10 h-10 border-2 border-indigo-500 rounded-full" />}
            <div>
              <p className="text-xl">{nameUser}</p>
              {isTyping ? <p className="text-indigo-500">Escribiendo ...</p> : <p></p>}
            </div>
          </div>
          <div className="flex">
            <div className="cursor-pointer hover:text-indigo-500 transition-colors"
              onClick={() => {
                setShowChatDiv(false)
                setIdChat("");
              }}
            >
              <XIcon />
            </div>
          </div>
        </header>
        <main id="chatDiv" className="h-[80%] overflow-y-scroll p-3 scroll-smooth">
          {
            messajeList &&
            messajeList.map((msg, index) => (
              msg.usuario_envia == myId ? (
                <ChatBubble key={index} fecha={msg.fecha} idMensaje={msg.id_mensaje}>{msg.texto}</ChatBubble>
              ) : <ChatBubble2 key={index} fecha={msg.fecha} idMensaje={msg.id_mensaje} isFav={msg.favorito}>{msg.texto}</ChatBubble2>
            )
            )
          }

          {
            showScrollButton && (
              <div
                onClick={scrollDown}
                className="absolute bottom-24 right-16 w-10 h-10 flex items-center justify-center bg-white text-indigo-500 border border-indigo-500 rounded-xl transition-all cursor-pointer hover:bg-indigo-500 hover:text-white"
              >
                <ArrowDownIcon />
              </div>
            )
          }

        </main>
        <div className="flex items-center gap-5 border-t border-gray-300 h-[10%]">
          <EmojiModal text={text} setText={setText} />
          <form className="w-full flex items-center gap-5" onSubmit={sendText}>
            <input
              onKeyDown={handleTyping}
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              placeholder="Escribe un mensaje..."
              className="w-full p-2 my-4 rounded-xl bg-[#F4F8FB] shadow-md outline-none border-2 border-transparent focus:border-indigo-500"
            />
            <button className="bg-indigo-500 text-white p-2 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg">
              <SendIcon />
            </button>
          </form>
        </div>
      </div >
    </div >
  )
}