import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { socketClient } from '../socket';
import Users from '../components/users';
import Chat from "../components/chat";

const SERVER_ROUTE = process.env.SERVER_ROUTE || "http://localhost:3001";

export default function Home() {
  const router = useRouter();
  const [socket, setSocket] = useState(socketClient);
  
  useEffect(() => {
    async function verifyEmail() {
      const token = sessionStorage.getItem("authorization");

      let email;
      if (token) email = await getEmailByToken(token);
      
      if (!email || email.length === 0) {
        router.push("/login");
      } else {
        connect(email);
      }
    }

    verifyEmail();
  });

  const getEmailByToken = async (token: string) => {
    try {
      const response = await fetch(SERVER_ROUTE + "/verify", {
        method: "GET",
        body: JSON.stringify({ token })
      });

      const email = await response.json();

      return email;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      window.alert(message);
    }
  }

  const connect = (email: string) => {
    socketClient.connect();
    socketClient.emit("set_user_email", email);
    setSocket(socketClient);
  }

  return (
    <div>
      <Users socket={ socket } />
      <Chat socket={ socket } />
    </div>
  )
}
