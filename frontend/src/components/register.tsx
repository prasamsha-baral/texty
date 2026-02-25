import type React from 'react'
import {  useState } from 'react';
import Guest from './guest'

type Props = {
  goToLogin: () => void;
  setShowModal:(arg: boolean)=> void
};
const Register = ({goToLogin,setShowModal}:Props) => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
const [error, seterror] = useState("");

  const nameRegex = /^[A-Za-z\s]+$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?.*\d)[A-Za-z\d]{6,}$/;
const passwordRegex = /^[A-Za-z0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit= (e: React.FormEvent)=>{
    e.preventDefault()
    seterror("")

    if(name.trim()=="" || email.trim()=="" || password.trim()==""){
    seterror("All fieldss are required!");
     return
    }
    
 if (!nameRegex.test(name)){
  seterror("Name format invalid !")
    }
 
   if(!emailRegex.test(email)){
 seterror("Invalid email!")
 return
    }
   if(!passwordRegex.test(password)){
    seterror("Password must be at least 6 letters")
    return
   }
   setShowModal(false);
      }  
  return (
    <>
    <form  className="flex bg-white text-blaack shadow-lg p-4 justify-center gap-2 items-center rounded-lg flex-col"
      >
        <h2 className='  border-b mb-5 '>Register to continue</h2>
        {error && (
          <p className='text-red-500 text-sm mb-3'>{error}</p>
        )}
        <label htmlFor="name">Name: <input  type="name" placeholder='   Enter username' onChange={(e)=> setname(e.target.value)} /></label>
        
         <label htmlFor=""> Mail id : <input type="email" placeholder='   Enter your email' onChange={(e)=>setemail(e.target.value)}/></label>
         <label className='mb-4' htmlFor="">Password : <input type="password" placeholder='   Enter password'  onChange={(e)=>setpassword(e.target.value)}/></label>
          <button  onClick={handleSubmit} className='bg-blue-500 px-4 cursor-pointer py-1 text-white'>Submit</button>

         <Guest goToLogin={goToLogin}/>
      </form>
   

   
    </>
  );
}

export default Register
