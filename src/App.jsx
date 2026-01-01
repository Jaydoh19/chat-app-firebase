import React, { useState, useRef } from 'react'
import Auth from './components/Auth'

import Cookies from 'universal-cookie'

import Chat from './components/Chat'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'
const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }

  const logout = async  () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  return (
    <>
      <button className=' fixed top-4 left-4 bg-[#ececec] h-7 w-20 text-black text-[13px] font-bold rounded shadow-md hover:scale-105 active:scale-95 transition-all ease-out z-50'
        onClick={logout}
      >Logout</button>

      {room ? (<Chat room={room}/>) : (
        <div className='flex flex-col h-screen justify-center items-center gap-2'>
          <label className='font-bold text-3xl mb-10 text-white'>Enter Room Name:</label>
          <input className='bg-[#ececec] border-none' ref={roomInputRef} />
          <button className='bg-[#ececec] h-10 w-40 text-black text-[13px] font-bold rounded shadow-md hover:scale-105 active:bg-[#c4c4c4] active:scale-95 transition-all ease-out' onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
      )}
    </>

  )
}

export default App