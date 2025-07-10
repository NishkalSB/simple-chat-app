import { useState } from "react";
import { SendIcon } from "./components/icons/SendIcon";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-screen bg-black relative">
        <div className="bg-white fixed bottom-5 left-1/2 transform -translate-x-1/2 p-2 rounded-full flex items-center gap-2 w-[90%] ">
          <input
            type="text"
            className="flex-1 h-10 px-2 rounded focus:outline-none"
            placeholder="Type a message"
          />
          <button className="bg-blue-500 text-white p-3 rounded-full flex justify-center items-center ">
            <span className="font-semibold pr-2 text-lg">Send</span>
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
