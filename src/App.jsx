import Aos from "aos"
import { useEffect } from "react"
import Header from "./components/Header"

function App() {

  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <>
    <Header />
    </>
  )
}

export default App
