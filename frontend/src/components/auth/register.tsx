import type React from "react";
import { useState } from "react";
import User from "./zod";

import card from "../../../../assets/poster.png"

interface RegisterProps {
  name: string;
  setName: (arg: string) => void;
  setShowModal: (arg: boolean) => void;
}
const Register = ({ name, setName, setShowModal }: RegisterProps) => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, seterror] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    seterror("");

    const result = User.safeParse({
      name: name,
      email: email,
      password: password,
      confirmPassword:confirmPassword,
    });

    if (!result.success) {
      const errorMessages = result.error.issues[0].message;
      seterror(errorMessages);
      return;
    }
    setShowModal(false);
  };
  return (
    <>
     <div
        className="w-[80vw]
      blacky
         sm:w-[69vw] 
          md:w-[62vw]
          p-4
        lg:w-[52vw]
        h-fit
    shadow-md flex "
      >

    <div className=" md:block md:w-1/2">
    <img 
      src={card}
      className="w-full h-full object-cover"
      alt=""
    />
  </div>

      <div className="bg-[#ffffff] md:w-1/2 w-full p-8 text-black shadow-md flex flex-col justify-center">
        <form className="flex    gap-5   flex-col">
          <h2 className="  text-3xl font-semibold text-center mb-4 ">Register</h2>
         
           

          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            className="reg"
            />


          <input
            type="email"
            placeholder="Email or Phone"
            onChange={(e) => setemail(e.target.value)}
            className="reg"
            />


              <input
            type="password"
            placeholder="Password"
            onChange={(e) =>  setpassword(e.target.value)}
            className="reg"
            />


              <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) =>  setConfirmPassword(e.target.value)}
            className="reg"
            />

            {error && (<p className="text-red-500 text-sm mb-3">{error}</p>)}
           

         
          
         
          <button
            onClick={handleSubmit}
            className="blacky  py-2 cursor-pointer rounded-3xl hover:blacky transition text-white"
          >
            Submit
          </button>
        </form>
      </div>

             
      </div>
    </>
  );
};

export default Register;
