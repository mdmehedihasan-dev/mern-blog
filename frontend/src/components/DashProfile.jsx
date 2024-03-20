/* eslint-disable no-unused-vars */
import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {app} from '../firebaseConfig'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
const DashProfile = () => {
    const {currentUser} = useSelector(state=>state.user)
    const [imageFile,setImageFile] = useState(null);
    const[imageFileUrl,setImageFileUrl] = useState(null);
    const [imageFileUploadProgress,setImageFileUploadProgress]= useState(null)
     const [imageFileUploadError,setImageFileUploadError]= useState(null)
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
        // service firebase.storage {
        //       match /b/{bucket}/o {
        //         match /{allPaths=**} {
        //           allow read;
        //           allow write: if
        //           request.resource.size <2*1024*1024 && 
        //           request.resource.contentType.matches('image/.*');
        //         }
        //       }
        //     }
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
            })
         }
    );
}

  return (
    <div className='w-full max-w-lg p-3 mx-auto '>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
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