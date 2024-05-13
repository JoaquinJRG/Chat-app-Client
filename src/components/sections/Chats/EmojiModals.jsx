import { useEffect, useState } from "react";
import { SmileIcon } from "../../icons/SmileIcon";

const API_KEY = "c2dca8e36ec2ea3878f1f60ba4ed693ba86fcb24";
const API = `https://emoji-api.com/emojis?access_key=${API_KEY}`;

export function EmojiModal({ text, setText }) {

  const [emojis, setEmojis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const addEmoji = (emoji) => {
    let newText = "";
    newText = text + emoji;
    setText(newText);
  }

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setEmojis(data);
      })
  }, []);


  let filteredEmojis = emojis;

  if (category !== "all") {
    filteredEmojis = emojis.filter(emoji => emoji.group === category);
  }

  filteredEmojis = filteredEmojis.filter((emoji) =>
    emoji.unicodeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <main
        className={`${showModal ? "flex" : "hidden"} absolute w-80 h-80 flex-col items-center bg-[#F4F8FB] p-2 rounded-xl shadow-xl `}
        style={{ bottom: 'calc(100% + 15px)', left: '0%', zIndex: 999 }}
      >
        <input
          type="text"
          placeholder="Buscar emoji"
          className="w-full bg-white p-2 rounded-xl mb-2 outline-none border-2 border-transparent focus:border-indigo-500"
          onChange={(e) => setSearch(e.target.value)}
        />
        <section className="w-72 h-72 grid grid-cols-6 overflow-y-scroll ">

          {
            filteredEmojis.map((emoji, index) => (
              <div
                onClick={() => addEmoji(emoji.character)}
                className="w-8 h-8 flex place-content-center cursor-pointer select-none text-2xl hover:bg-white rounded-md hover:shadow-xl"
                key={index}
                title={emoji.unicodeName}
              >
                {emoji.character}
              </div>
            ))
          }
        </section>
        <section className="flex gap-2 mt-2">
          <button
            className=""
            onClick={() => setCategory("all")}
          >
            All
          </button>
          <button
            className=""
            onClick={() => setCategory("smileys-emotion")}
          >
            Emociones
          </button>
          <button
            className=""
            onClick={() => setCategory("animals-nature")}
          >
            Animales
          </button>
          <button
            className=""
            onClick={() => setCategory("food-drink")}
          >
            Comida
          </button>
        </section>
      </main>
      <button
        className="flex items-center justify-center bg-indigo-500 p-2 rounded-xl text-white transition-all hover:-translate-y-1 hover:shadow-lg"
        onClick={() => setShowModal(!showModal)}
      >
        <SmileIcon />
      </button>
    </div>
  )

}