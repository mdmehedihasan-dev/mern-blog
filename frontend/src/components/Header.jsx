import {Link} from 'react-router-dom'
import {Button, Navbar,  NavbarToggle, TextInput} from 'flowbite-react'
import { FaMoon, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar className='border-b-2'>

      <Link className='self-center text-sm whitespace-nowrap sm:text-xl dark:text-white' to={"/"}>
        <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-green-400 to-gray-300' >Mehedi</span>
        Blog
      </Link>

      <form>
        <TextInput
        type='text'
        placeholder='Serach...'
        className='hidden lg:inline'
        rightIcon={FaSearch}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color="gray" pill>
            <FaSearch/>
      </Button>

      <Navbar.Collapse className='hidden lg:block'>
        <Navbar.Link >
          <Link to={"/"}>
          Home
          </Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"/about"}>
          About
          </Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"/Projects"}>
          Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
     
     
     



      <div className='flex gap-x-2'>
        <Button className='w-12 h-10 ' color="gray" pill>
          <FaMoon/>
        </Button>
        <Button  gradientMonochrome="success" >
          <Link to={"sign-up"} >SingUp</Link>
        </Button>
        <NavbarToggle/>
      </div>

      <Navbar.Collapse className=' md:hidden'>
        <Navbar.Link >
          <Link to={"/"}>
          Home
          </Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"/about"}>
          About
          </Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"/Projects"}>
          Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>

  
    
      
    </Navbar>
    
  )
}

export default Header