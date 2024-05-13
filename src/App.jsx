import { useState } from "react"
import { Login } from "./components/sections/Login/Login"
import { Home } from "./components/sections/Home/Home"

function App() {

  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged")) //Cambiar esto para que guarde también los datos

  return (
    <>
      {isLogged ? <Home setIsLogged={setIsLogged} /> : <Login setIsLogged={setIsLogged} />}
    </>
  )
}

export default App
