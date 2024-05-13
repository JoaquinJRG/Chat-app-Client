import { HomeIcon } from "../../icons/HomeIcon";
import { LogOutIcon } from "../../icons/LogOutIcon";
import { MessageIcon } from "../../icons/MessageIcon";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { StarIcon } from "../../icons/StarIcon";
import { ProfilePic } from "./ProfilePic";

export function MyNavbar({ openHome, setOpenHome, openChats, setOpenChats, openFavs, setOpenFavs, openConfig, setOpenConfig, setIsLogged }) {

  const handleHomeClick = () => {
    setOpenHome(true);
    setOpenChats(false);
    setOpenFavs(false);
    setOpenConfig(false);
  };

  const handleChatsClick = () => {
    setOpenHome(false);
    setOpenChats(true);
    setOpenFavs(false);
    setOpenConfig(false);
  };

  const handleFavsClick = () => {
    setOpenHome(false);
    setOpenChats(false);
    setOpenFavs(true);
    setOpenConfig(false);
  };

  const handleConfigClick = () => {
    setOpenHome(false);
    setOpenChats(false);
    setOpenFavs(false);
    setOpenConfig(true);
  };


  const handleLogOut = () => {
    setIsLogged(false);
    localStorage.removeItem("isLogged"); //Esto creo que va a cambiar
  }

  return (
    <nav className="flex flex-col items-center justify-between py-10 w-full" >
      <ul className="flex flex-col gap-4 ">
        <li className="mb-5">
          <ProfilePic />
        </li>
        <li
          onClick={handleHomeClick}
          className={`flex items-center gap-2 hover:text-indigo-500 border-l-2 border-transparent select-none cursor-pointer transition-colors px-2 ${openHome ? "text-indigo-500 border-l-indigo-500" : ""}`}
        >
          <HomeIcon /> Inicio
        </li>
        <li
          onClick={handleChatsClick}
          className={`flex items-center gap-2 hover:text-indigo-500 border-l-2 border-transparent select-none cursor-pointer transition-colors px-2 ${openChats ? "text-indigo-500 border-l-indigo-500" : ""}`}
        >
          <MessageIcon /> Chats
        </li>
        <li
          onClick={handleFavsClick}
          className={`flex items-center gap-2 hover:text-indigo-500 border-l-2 border-transparent select-none cursor-pointer transition-colors px-2 ${openFavs ? "text-indigo-500 border-l-indigo-500" : ""}`}
        >
          <StarIcon /> Favoritos
        </li>
      </ul>
      <ul className="flex flex-col gap-4 ">
        <li
          onClick={handleConfigClick}
          className={`flex items-center gap-2 hover:text-indigo-500 border-l-2 border-transparent select-none cursor-pointer transition-colors px-2 ${openConfig ? "text-indigo-500 border-l-indigo-500" : ""}`}
        >
          <SettingsIcon /> Configuración
        </li>
        <li
          onClick={handleLogOut}
          className={`flex items-center gap-2 hover:text-indigo-500 border-l-2 border-transparent select-none cursor-pointer transition-colors px-2`}
        >
          <LogOutIcon /> Cerrar Sesión
        </li>
      </ul>
    </nav >
  )
}