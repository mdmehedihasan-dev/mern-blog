/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { signInSuccess, signInFailure, signInStart } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {

  const [formData,setFormData] = useState({})
 const {loading,error:errorMessage}= useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();



  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})

  }
  // console.log(formData)
   
  const handleSubmit= async(e)=>{
    e.preventDefault()
    if(!formData.email || !formData.password){
      return dispatch(signInFailure("Please fill all required fields"))
    }



    try {
      dispatch(signInStart());
      const res = await fetch ('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))

      }
     
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }


  return (
    <div className="min-h-screen mt-40">
      <div className="flex flex-col items-center max-w-5xl gap-20 mx-auto md:flex-row">
        {/* left side   */}
        <div className="flex-1 px-5 sm:px-0">
          <Link className="text-4xl font-bold dark:text-white" to={"/"}>
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-green-400 to-gray-300">
              Mehedi
            </span>
            Blog
          </Link>
          <p className="mt-5 text-lg md:text-xl md:mt-10">
            This is blog Website📒! You can Sing-In with email & password 🙂
          </p>
        </div>

        {/* right side  */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your email" />
              <TextInput onChange={handleChange}
                type="email"
                id="email"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput onChange={handleChange} type="password" id="password" placeholder="password" />
            </div>

            <Button disabled={loading} type="submit" gradientMonochrome="success">
              {
                loading ?
                <>
                <Spinner size={'lg'} className="pl-2" />
                <span>Loading.....😟</span>
                </>
                :
                "Sign-In"
              }
            </Button>
            <OAuth/>
          </form>
          <div className="mt-10 font-semibold ">
            <span>  Don't Have an Account</span>
            <Link className="text-blue-700 " to={"/sign-up"}>
              Please Sign-Up
            </Link>
          </div>
          <div>
            {errorMessage && <Alert className="mt-5" color={"red"}>{errorMessage}</Alert>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
