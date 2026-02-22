import type React from "react";
import axios from "axios";
import { URL, socket } from "./socket";

interface LoginProps {
  name: string;
  setName: (arg0: string) => void;
  setShowModal: (arg: boolean) => void;
}
const Login: React.FC<LoginProps> = ({ name, setName, setShowModal }) => {
  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);
    axios
      .post(
        `${URL}/user`,
        {
          name: name,
        },
        { withCredentials: true },
      )
      .then(() => {
        socket.on("connect", () => {
          console.log("socket connected");
        });
      })
      .catch((error) => {
        console.error(error);
      });

    if (name.trim() !== "") {
      setShowModal(false);
    }
  };
  return (
    <>
      <form
        onSubmit={submit}
        className="flex bg-white shadow-lg p-4 justify-center gap-2 items-center rounded-lg flex-col"
      >
        <p>Enter your name</p>
        <input
          id="username"
          name="username"
          className="border-[#aeaeae] rounded-2xl h-8 pl-4 border-2 focus:outline-none"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <button className="text-white bg-blue-500 px-4 p-1 rounded-2xl">
          submit
        </button>
      </form>
    </>
  );
};
export default Login;
