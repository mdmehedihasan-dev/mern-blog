import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Main from "./layout/Main";
import PrivateRoute from "./components/PrivateRoute";








function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
  
      

        <Route path="/" element={<Main/>}>
      <Route  path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route  path="/sign-in" element={<SignIn/>} />
      <Route  path="/sign-up" element={<SignUp/>} />

      <Route element={<PrivateRoute/>} >

      <Route  path="/dashboard" element={<Dashboard/>} />
      </Route>


      <Route  path="/projects" element={<Projects/>} />

      

      
 

       


      </Route>
    )
  );
  //   {
  //     path: "/",
  //     element: <Main />,

  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       {
  //         path: "/about",
  //         element: <About />,
  //       },
  //       {
  //         path: "/sign-in",
  //         element: <SignIn />,
  //       },
  //       {
  //         path: "/sign-up",
  //         element: <SignUp />,
  //       },
  //       {
  //         path: "/projects",
  //         element: <Projects />,
  //       },
  //       {
  //         path: "/dashboard",
  //         element: <Dashboard />,
  //       },
  //       {
  //         path: "/footer",
  //         element: <Footerr />,
  //       },
  //     ],
  //   },
  // ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
