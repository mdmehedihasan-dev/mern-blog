import { Sidebar } from "flowbite-react"
import {HiUser} from 'react-icons/hi'
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


const DashSidebar = () => {
    const loaction = useLocation();
    const [tab,setTab] = useState('');
  
    useEffect(()=>{
      const urlParams = new URLSearchParams(loaction.search);
      const tabFromUrl = urlParams.get('tab');
      console.log(tabFromUrl)
      if(tabFromUrl){
        setTab(tabFromUrl)
      }
    },[loaction.search])
  return (
    <Sidebar className="w-full md:56 ">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Link to={'/dashboard?tab=profile'}>
          <Sidebar.Item  active={tab==="profile"} icon={HiUser} label={'user'} labelColor='dark'  >
            Profile
          </Sidebar.Item>
            </Link>

          <Sidebar.Item   icon={FaSignOutAlt}  labelColor='dark' className="cursor-pointer"  >
            Sign-Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar