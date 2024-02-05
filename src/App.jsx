import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      str = str + "0123456789";
    }
    if (charAllowed) {
      str = str + "!@#$%^&*{}[]~_+-";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]); //dependencies for optimization

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]); //dependencies for re-running incase of change of dependencies

  const copytoclip = useCallback(() => {
    passwordRef.current?.select(); // "?" is being used to check if there exists a current value or not
    passwordRef.current?.setSelectionRange(0, 100); //to use a particular range
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-9 py-3 text-orange-500 bg-gray-800 mt-40 ml-80">
      <h1 className="text-white text-center my-4 text-4xl">
        Password Generator
      </h1>

      <div className="flex">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 rounded-md"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button
          className="text-white outline-none bg-cyan-500 rounded-2xl my-1 mx-2 px-4 py-2 shrink-0 hover:scale-110 ease-in-out "
          onClick={copytoclip}
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-8 mt-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <label>Length: {length}</label>
        </div>

        <div className="flex p-2 gap-x-2">
          <input
            type="checkbox"
            className="flex items-center gap-x-1"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
          <input
            type="checkbox"
            className="flex items-center gap-x-1 ml-3"
            defaultChecked={charAllowed}
            id="numberInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
