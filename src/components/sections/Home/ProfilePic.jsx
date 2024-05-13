import { useEffect, useState } from "react";
import { UserIcon } from "../../icons/UserIcon";

export function ProfilePic() {

  const userData = JSON.parse(localStorage.getItem("userData"));
  const [id, setId] = useState(userData.id);
  const [imageBase64, setImageBase64] = useState(false);

  useEffect(() => {
    fetch(`https://chat-app-server-6z6f.onrender.com/img/${id}`)
      .then(res => res.json())
      .then(data => {
        setImageBase64(data[0].img_perfil)
      })
  }, [])

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="border-2 border-indigo-500 rounded-full text-indigo-500">
        {imageBase64 ? ( // Verifica si la imagen en base64 está disponible
          <img className="w-28 h-28 rounded-full" src={`data:image/jpeg;base64,${imageBase64}`} alt="Imagen de perfil" />
        ) : <UserIcon width={80} height={80} />}
      </div>
      <p className="text-sm text-slate-800">{userData.nombre}</p>
    </div >
  )
}