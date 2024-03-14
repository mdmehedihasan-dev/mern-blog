import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Main from "./layout/Main";
import Footerr from "./components/Footerr";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/sing-in",
          element: <SingIn />,
        },
        {
          path: "/sing-up",
          element: <SingUp />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/footer",
          element: <Footerr />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
