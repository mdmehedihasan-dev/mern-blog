import { Button, TextInput } from 'flowbite-react'
import {useSelector} from 'react-redux'
const DashProfile = () => {
    const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='w-full max-w-lg p-3 mx-auto '>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer'>
                <img src={currentUser.profilePicture} alt="user" className='object-cover w-full h-full border-8 rounded-full border-lime-50' />
            </div>
            <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        //   onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        //   onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
        //   onChange={handleChange}
        />
        <Button type='submit' outline>Update</Button>
        </form>
        <div className='flex justify-between mt-2 text-red-500'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign-Out</span>
        </div>

    </div>
  )
}

export default DashProfile