import React, { useEffect, useState } from "react";
import { socket } from "./components/socket";
import Modal from "./components/modal";
import Login from "./components/login";

const App: React.FC = () => {
  interface message {
    texts: string;
    sender: string;
  }

  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);
  const [name, setName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(true);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("messages", (data: message[]): void => {
      setMessages(data);
      console.log(data);
    });
    return () => {
      socket.off("connect");
      socket.off("messages");
    };
  }, []);
  const send = (): void => {
    const trimmed = text.trim();
    if (trimmed === "") return;
    socket.emit("texts", trimmed, name);
    setText("");
  };

  return (
    <>
      {showModal ? (
        <Modal>
          <Login name={name} setName={setName} setShowModal={setShowModal} />
        </Modal>
      ) : null}
      <section className="flex flex-col h-screen bg-[#eee]">
        <div className="flex-1 max-w-300 mx-auto p-4 flex flex-col w-full overflow-y-scroll no-scrollbar wrap-anywhere gap-1">
          {messages.length == 0
            ? null
            : messages.map((msg, index) => (
                <div key={index}>
                  {msg.sender}
                  <div className="rounded-2xl text-white bg-blue-500 w-fit px-4 p-1">
                    {msg.texts}
                  </div>
                </div>
              ))}
        </div>
        <div className="bg-white h-15 ">
          <div className="max-w-300 mx-auto h-full flex gap-1 justify-center items-center">
            <input
              className="border-[#aeaeae] rounded-l-full flex-1 pl-4 rounded-r-full focus:outline-none h-9 border-2"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") send();
              }}
              placeholder="Message"
            />
            <button
              className="bg-blue-500  w-20 rounded-2xl text-white h-9 px-4"
              onClick={send}
            >
              send
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
