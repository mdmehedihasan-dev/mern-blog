/* eslint-disable no-unused-vars */
import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {app} from '../firebaseConfig'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { updateStart,updateFailure,updateSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
const DashProfile = () => {
    let dispatch = useDispatch()
    const {currentUser} = useSelector(state=>state.user)
    const [imageFile,setImageFile] = useState(null);
    const[imageFileUrl,setImageFileUrl] = useState(null);
    const [imageFileUploadProgress,setImageFileUploadProgress]= useState(null)
     const [imageFileUploadError,setImageFileUploadError]= useState(null)
     const [formData,setFormData] = useState({})
    const filePickerRef = useRef()
    console.log(imageFileUploadProgress,imageFileUploadError)

    const handleImageChange =(e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    // console.log(imageFile,imageFileUrl)
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])

    const uploadImage=async()=>{
        const storage = getStorage(app)
        const fileName = new Date().getTime()+imageFile.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error)=>{
                setImageFileUploadError('Could not upload image must be less then 2MB')
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                 setImageFileUrl(downloadURL);
                 setFormData({...formData,profilePicture:downloadURL})
            })
         }
    );
}

const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
}
console.log(formData)

const handleSubmit = async(e)=>{
    e.preventDefault();
    if(Object.keys(formData).length===0){
        return
    }
    try {
        dispatch(updateStart())
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        });
        const data = await res.json();
        if(!res.ok){
            dispatch(updateFailure(data.message))
        }else{
            dispatch(updateSuccess(data))
        }
    } catch (error) {
        dispatch(updateFailure(error.message))
    }
}




  return (
    <div className='w-full max-w-lg p-3 mx-auto '>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input className='hidden' type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} />
            <div onClick={()=>filePickerRef.current.click()} className='self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer'>
                <img src={imageFileUrl || currentUser.profilePicture} alt="user" className='object-cover w-full h-full border-8 rounded-full border-lime-50' />
            </div>
            {
                imageFileUploadError && <Alert color={'failure'}>{imageFileUploadError}</Alert>
            }



            <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
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