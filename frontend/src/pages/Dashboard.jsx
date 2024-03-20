import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
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
    <div className="flex flex-col w-full min-h-screen md:flex-row">
      <div  >
        {/* sidebar  */}
        <DashSidebar/>
      </div>

      <div>
        {/* profile...........  */}
        {tab === 'profile' && <DashProfile/>}
      </div>


    </div>
  )
}

export default Dashboard