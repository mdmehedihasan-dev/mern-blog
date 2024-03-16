import { Link,  } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import { FaMoon, FaSearch,FaSun } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux';
import {toggleTheme} from '../redux/theme/themeSlice'

const Header = () => {
  const dispatch = useDispatch()
  // const path = useLocation().pathname;
  const {currentUser} = useSelector(state=>state.user)
  const {theme} = useSelector(state=>state.theme)
  return (
    <Navbar className="border-b-2">
      <Link
        className="self-center text-sm whitespace-nowrap sm:text-xl dark:text-white"
        to={"/"}
      >
        <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-green-400 to-gray-300">
          Mehedi
        </span>
        Blog
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Serach..."
          className="hidden lg:inline"
          rightIcon={FaSearch}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <FaSearch />
      </Button>
      {/* =========for large device ====== */}
      <Navbar.Collapse className="hidden lg:block">
        <Navbar.Link>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"/Projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>

      {/*======== button for dark theme ======== */}
      <div className="flex gap-x-2">
        <Button className="w-12 h-10 " color="gray" pill
        onClick={()=>dispatch(toggleTheme())}
        >
          {
            theme === "light" ?  <FaMoon /> : <FaSun/>
          }
         
        </Button>

        {
          currentUser?(
            <Dropdown 
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
            >
                <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item >Sign out</Dropdown.Item>

              
           

            </Dropdown>
          ):
          (
            <Link to={"sign-up"}>   
            <Button gradientMonochrome="success">
            Sign-Up
            </Button>
              </Link>
           )
        }



         
        <NavbarToggle />
      </div>

      {/*========= for mobile device ========= */}
      <Navbar.Collapse className=" md:hidden">
        <Navbar.Link>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"/Projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
