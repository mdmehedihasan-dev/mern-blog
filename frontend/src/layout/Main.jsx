import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footerr from "../components/Footerr"

const Main = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footerr/>
    </div>
  )
}

export default Main