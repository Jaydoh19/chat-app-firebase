import React from 'react'
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';

import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Auth = ({ setIsAuth }) => {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 h-screen">
        <p className='text-white text-3xl font-bold'>Chat App</p>
        <button
          className="bg-[#ececec] h-10 w-40 text-black text-[13px] font-bold rounded shadow-md hover:scale-105 active:bg-[#c4c4c4] active:scale-95 transition-all ease-out"
          onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </>

  );
}

export default Auth