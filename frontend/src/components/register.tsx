import type React from 'react'
import { useEffect, useState } from 'react';
import Guest from './guest'

type Props = {
  goToLogin: () => void;
};
const Register = ({goToLogin}:Props) => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [Disabled, setDisabled] = useState(true);

  const nameRegex = /^[A-Za-z\s]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  

  const handleSubmit=()=>{
    if(name.trim()==""){
      alert("Enter name")
     
    }
   else if (!nameRegex.test(name)){
      alert("Invalid name !!");
    }
    else if(email.trim()==""){
      alert("Enter Email")
    } 
    else if(!emailRegex.test(email)){
      alert("Invalid email!!");
    }
    else if(!passwordRegex.test(password)){
      alert("Passoword must contain at least 6 characters with letters and numbers")
    }
    else{
    alert("Submitted")
   
      }  }

  
  return (
    <>
    <form  className="flex bg-gray-400 text-blaack shadow-lg p-4 justify-center gap-2 items-center rounded-lg flex-col"
      >
        <h2 className='  border-b mb-5 '>Register to continue</h2>
        <label htmlFor="name">Name: <input  type="name" placeholder='   Enter username' onChange={(e)=> setname(e.target.value)} /></label>
        
         <label htmlFor=""> Mail id : <input type="email" placeholder='   Enter your email' onChange={(e)=>setemail(e.target.value)}/></label>
         <label className='mb-4' htmlFor="">Password : <input type="password" placeholder='   Enter password'  onChange={(e)=>setpassword(e.target.value)}/></label>
          <button  onClick={handleSubmit} className='bg-gray-500 px-4 cursor-pointer py-2 text-white'>Submit</button>

         <Guest goToLogin={goToLogin}/>
      </form>
   

   
    </>
  )
}

export default Register