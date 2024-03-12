import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
    
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/sing-in" element={<SingIn/>} />
          <Route path="/sing-up" element={<SingUp/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
      
       
      </Route>
    )
  );

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
