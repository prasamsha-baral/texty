import { useEffect, useState } from "react";
import { socket } from "./components/socket";

const App = () => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("messages", (data: string[]): void => {
      setMessages(data);
    });
    return () => {
      socket.off("connect");
      socket.off("messages");
    };
  }, []);
  const send = (): void => {
    if (text.trim() === "") return;
    socket.emit("texts", text.trim());
    setText("");
  };

  return (
    <>
      <section className="flex flex-col h-screen bg-[#eee]">
        <div className="flex-1 max-w-300 mx-auto p-4 flex flex-col w-full overflow-y-scroll no-scrollbar wrap-anywhere gap-1">
          {messages.map((msg, index) => (
            <div
              className="rounded-2xl text-white bg-blue-500 w-fit px-4 p-1"
              key={index}
            >
              {msg}
            </div>
          ))}
        </div>
        <div className="bg-white h-15 ">
          <div className="max-w-300 mx-auto h-full flex gap-1 justify-center items-center">
            <input
              className="border-[#aeaeae] rounded-l-full flex-1 pl-4 rounded-r-full focus:outline-none h-9 border-2"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="Message"
            />
            <button
              className="bg-blue-500 rounded-l-full w-20 rounded-r-full text-white h-9 px-4"
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
