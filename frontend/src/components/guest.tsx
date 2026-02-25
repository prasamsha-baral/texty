import type React from 'react'


type Props = {
  goToLogin: () => void;
};

const Guest = ({goToLogin}:Props) => {
   
  return (
    <div >
       
         <h3 className='mt-10 mb-3'>Continue as guest ?</h3>
    <button onClick={goToLogin} className='bg-gray-500 border rounded-2xl cursor-pointer text-white px-4 py-1'>guest mode</button>



    </div>
  )
}

export default Guest

