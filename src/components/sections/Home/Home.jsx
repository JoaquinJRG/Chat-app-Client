import { useState } from "react"
import { XIcon } from "../../icons/XIcon"
import { MenuIcon } from "../../icons/MenuIcon"
import { MyNavbar } from "./MyNavbar"
import { Chats } from "../Chats/Chats"
import { Favs } from "../Favs/Favs"
import { Settings } from "../Settings/Settings"

export function Home({ setIsLogged }) {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openHome, setOpenHome] = useState(true);
  const [openChats, setOpenChats] = useState(false);
  const [openFavs, setOpenFavs] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);

  const handleOutsideClick = () => {
    if (openSidebar) {
      setOpenSidebar(false);
    }
  }

  return (
    <div className="h-screen">
      <header className="flex items-center bg-white w-full h-10 lg:hidden fixed z-50 shadow-sm">
        <button
          className="px-3"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          {openSidebar ? <XIcon /> : <MenuIcon />}
        </button>
      </header>
      <main className="lg:pt-0 h-screen flex">
        <aside className={`bg-white w-60 h-screen lg:flex z-40 shadow-xl ${openSidebar ? 'flex absolute fade-in-right' : 'hidden lg:flex '}`} >
          <MyNavbar
            openHome={openHome} setOpenHome={setOpenHome}
            openChats={openChats} setOpenChats={setOpenChats}
            openFavs={openFavs} setOpenFavs={setOpenFavs}
            openConfig={openConfig} setOpenConfig={setOpenConfig}
            setIsLogged={setIsLogged}
          />
        </aside>
        <section
          onClick={handleOutsideClick}
          className={`bg-[#F4F8FB] w-screen h-screen overflow-hidden ${openSidebar ? "z-30 blur-sm select-none" : ""}`}
        >
          {openHome && <HomeSection setOpenChats={setOpenChats} setOpenHome={setOpenHome} />}
          {openChats && <Chats />}
          {openFavs && <Favs />}
          {openConfig && <Settings />}
        </section>
      </main>
    </div >
  )
}

function HomeSection({ setOpenChats, setOpenHome }) {

  const name = JSON.parse(localStorage.getItem("userData")).nombre;

  return (
    <main className="p-4 mt-10 lg:mt-0 h-full flex items-center justify-center fade-in-up">
      <div className="flex flex-col gap-10 items-center text-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-message-chatbot">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
          <path d="M9.5 9h.01" />
          <path d="M14.5 9h.01" />
          <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
        </svg>
        <h1 className="text-5xl text-center text-indigo-500">Bienvenido a MiChat👋</h1>
        <span className="text-4xl italic font-bold text-indigo-800">{name}</span>
        <button
          onClick={() => {
            setOpenHome(false);
            setOpenChats(true);
          }}
          className="bg-indigo-500 text-white rounded-lg px-3 py-2 transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          EMPEZAR A CHATEAR
        </button>
      </div>
    </main>
  )
}