import { useCallback, useEffect, useRef, useState } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*(){}[]`~?/-_=+*|"
    let char;
    for(let i=0; i<length; i++){
      char = Math.floor(Math.random() * str.length) 
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect( () => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator]
  )

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
    <div className='flex flex-wrap justify-center w-full h-screen bg-gray-600'>
      <div className='h-40 w-120 px-4 py-5 rounded-xl bg-black m-30'>
        <input 
        type="text" 
        placeholder='Password' 
        readOnly
        value={password}
        ref={passwordRef}
        className='bg-white my-5 px-3 rounded h-8 w-90'  
        />
        <button 
        className='bg-blue-500 rounded px-3 py-1' 
        onClick={copyPasswordToClipboard}
        >copy
          
        </button>
        <div className='flex flex-wrap'>
          <input 
          type="range"
          id='lenghtInput' 
          max={100}
          min={8}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="lengthInput"
          className='text-white p-3'
          >Length: {length}</label>

          <input 
          type="checkbox" 
          id='numInput'
          className='m-2'
          value={numAllowed}
          onChange={() => setNumAllowed(!numAllowed)}
          />
          <label htmlFor="numInput" className='text-white py-2.5'>Number</label>
          <input 
          type="checkbox" 
          id='charInput'
          className='m-2'
          onChange={() => setCharAllowed(!charAllowed)}
          />
          <label htmlFor="charInput" className='text-white py-2.5'>Character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
