import { useState } from "react";
import { DotsIcon } from "../../icons/DotsIcon";
import { StarIcon } from "../../icons/StarIcon";
import { CopyIcon } from "../../icons/CopyIcon";
import { LanguajeIcon } from "../../icons/LanguajeIcon";

export function ChatBubble2({ children, fecha, idMensaje, isFav }) {
  const date = new Date(Math.trunc(fecha));
  const formattedDate = date.toLocaleTimeString();
  const [showMenu, setShowMenu] = useState(false);
  const [showFav, setShowFav] = useState(isFav);
  const [text, setText] = useState(children);

  const copyText = () => {
    navigator.clipboard.writeText(children);
    setShowMenu(false);
    //Mostrar notificación
  };

  const addToFavorites = () => {
    fetch(`https://chat-app-server-6z6f.onrender.com/addToFavorites/${idMensaje}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setShowMenu(false);
          //Mostrar notificación
        }
      });
  };

  const translate = () => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '400a945802msh3cdf8717c442aabp10c57bjsn1542e1ef9044',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: new URLSearchParams({
        source_language: 'auto',
        target_language: 'es',
        text: children
      })
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
      .then(res => res.json())
      .then(data => {
        setShowMenu(false);
        setText(data.data.translatedText);
      });

  };

  return (
    <div className="flex flex-col mb-2">
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center px-5 py-2 min-w-28 max-w-64 bg-[#F4F8FB] text-xl text-wrap text-center rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-md">
          <p>{text}</p>
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
              <li
                onClick={copyText}
                className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200"
              >
                <CopyIcon width={14} height={14} />
                <span>Copiar</span>
              </li>
              <li
                onClick={translate}
                className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-200"
              >
                <LanguajeIcon width={15} height={15} />
                <span>Traducir</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span className="flex text-xs justify-start">{formattedDate}</span>
    </div>
  )
}
