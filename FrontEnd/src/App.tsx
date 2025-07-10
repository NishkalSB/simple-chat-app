import { useEffect, useState, useRef } from "react";
import { SendIcon } from "./components/icons/SendIcon";

function App() {
  const [messages, setMessages] = useState(["hi there", "hello"]);
  const socketRef = useRef<WebSocket | null>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (e) => {
      setMessages((m) => [...m, e.data]);
    };

    socketRef.current = ws;

    ws.onopen = (e) => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    let message = "";
    if (messageRef.current) {
      message = messageRef.current.value;
    }
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: message,
          },
        })
      );
    }
  };

  return (
    <>
      <div className="h-screen bg-black relative">
        <div className="h-[vh-85] p-5">
          {messages.map((message) => (
            <div className="m-8">
              <span className="bg-white p-4 text-black rounded-full">
                {message}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-white fixed bottom-5 left-1/2 transform -translate-x-1/2 p-2 rounded-full flex items-center gap-2 w-[90%] ">
          <input
            type="text"
            className="flex-1 h-10 px-2 rounded focus:outline-none"
            placeholder="Type a message"
            ref={messageRef}
          />
          <button
            className="bg-blue-500 text-white p-3 rounded-full flex justify-center items-center"
            onClick={sendMessage}
          >
            <span className="font-semibold pr-2 text-lg">Send</span>
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
