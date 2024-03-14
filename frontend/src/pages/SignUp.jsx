import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

  const [formData,setFormData] = useState({})
  const [errorMessage,setErrorMessage] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();



  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})

  }
  // console.log(formData)
   
  const handleSubmit= async(e)=>{
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please fill all required fields")
    }



    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch ('/api/auth/singup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
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
            This is blog Website📒! You can Sing-up with email , password or
            Google account
          </p>
        </div>

        {/* right side  */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput onChange={handleChange} type="text" id="username" placeholder="Username" />
            </div>
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
                "Sign-up"
              }
            </Button>
          </form>
          <div className="mt-10 font-semibold ">
            <span>  Have already an Account ?</span>
            <Link className="text-blue-700 " to={"/sign-in"}>
              Please Sing-In
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

export default SignUp;
