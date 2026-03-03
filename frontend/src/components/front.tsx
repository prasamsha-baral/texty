type Props = {
  goToLogin: () => void;
  goToRegister: () => void;
};

const Front = ({ goToLogin, goToRegister }: Props) => {
  return (
    <>
      <div
        className="w-[90vw]
          bg-[#eee]
         sm:w-[85vw]
          md:w-[75vw]
          p-4
        lg:w-[69vw]
        h-fit
        overflow-hidden
    border-[#1c1001] border-13 rounded-4xl shadow-md  "
      >
        <nav className="flex flex-col items-start sm:flex-row  sm:justify-between sm:items-center md:justify-center  md:gap-5  lg:justify-between lg:gap-8">
          <div className=" flex flex-col sm:flex-row justify-center sm:gap-2 p-4 md:gap-1 lg:gap-6 lg:p-5">
            <button className="border-black border-2 text-xs p-1 text-black rounded-2xl cursor-pointer shadow-md hover:shadow-gray-400">
              Individual
            </button>
            <p className="navItem">Business</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:gap-1 p-4  md:gap-1  lg:gap-5 lg:p-4 ">
            <p className="navItem">Features</p>
            <p className="navItem">Privary</p>
            <p className="navItem">Help center</p>
          </div>
          <div className="flex flex-col pt-4 sm:p-4  md:flex-row justify-center sm:gap-1 p-3 md:gap-2 lg:gap-6 lg:p-5">
            <p className="navItem">Web</p>
            <button className="btn">download</button>
          </div>
        </nav>

        <div className="px-4 sm:px-6 md:px-10">
          <h1 className=" text-black underline text-xl sm:text-2xl md:text-3xl lg:4xl px-1.5 font-serif">
            Designed for <br />
            Productivity in <br />
            Everyday Conversations
          </h1>
          <br />
          <h3 className="text-black font-mono text-lg sm:text-base md:text-lg">
            Stay Connected, Stay Texty.
          </h3>

          <div className=" gap-4 my-4">
            <button className="btn" onClick={goToRegister}>
              Get Started
            </button>
            <select className="border-black border-2 rounded-sm outline-0 text-black text-xs mx-3 p-1 ">
              <option>Try chat for personal</option>
              <option>Try chat for business</option>
            </select>
          </div>
          <button
            className="mx-auto hover:cursor-pointer underline"
            onClick={goToLogin}
          >
            continue as guest
          </button>
        </div>
      </div>
    </>
  );
};

export default Front;
