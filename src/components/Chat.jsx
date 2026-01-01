import React, { useEffect, useState, useRef } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '../firebase-config';



const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, 'messages')
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const queryMessages = query(messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    )
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      })
      setMessages(messages);
    });
    

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room
    });

    setNewMessage("");
  }

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 py-6">
      <div className="bg-white w-full max-w-md sm:max-w-xl md:max-w-2xl border-2 border-blue-950 rounded">
        <h1 className="bg-blue-950 text-white font-bold py-4 text-center text-lg sm:text-2xl">
          Welcome to: {room}
        </h1>

        <div className="p-3 sm:p-4 space-y-2 max-h-[55vh] overflow-y-auto">
          {messages.map((message) => (
            <div className="text-base sm:text-xl wrap-break-word" key={message.id}>
              <span className="font-bold mr-1">{message.user}:</span>
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-blue-950 p-3">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-4">
            <input
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-[#ececec] h-10 rounded shadow-md text-black px-3 flex-1 w-full"
              placeholder="Type your message here"
              value={newMessage}
            />
            <button
              type="submit"
              className="bg-[#ececec] h-10 w-20 text-black text-[13px] font-bold rounded shadow-md hover:scale-105 active:bg-[#c4c4c4] active:scale-95 transition-all ease-out shrink-0"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat