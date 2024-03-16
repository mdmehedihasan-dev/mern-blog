/* eslint-disable no-unused-vars */
import { Button } from "flowbite-react"
import { FaGoogle } from "react-icons/fa"
import { GoogleAuthProvider, getAuth,signInWithPopup } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const OAuth = () => {
    const navigate = useNavigate()
    const auth = getAuth(app);
    const dispatch = useDispatch()

    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
          });
          try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('api/auth/google',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    googlePhotoUrl:resultsFromGoogle.user.photoURL
                }),
            })      
            const data = await res.json()
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
            
          } catch (error) {
            console.log(error)
          }

    }



  return (
   



        <Button onClick={handleGoogleClick}  type="button" outline> <FaGoogle className="w-4 h-4 mr-2"/>
        Continue With Google
        </Button>
    
  )
}

export default OAuth