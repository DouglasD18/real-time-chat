import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { socketClient } from '../socket';
import Users from '../components/users';
import Chat from "../components/chat";

const SERVER_ROUTE = process.env.SERVER_ROUTE || "http://localhost:3001/api/users";

export default function Home() {
  const router = useRouter();
  const [socket, setSocket] = useState(socketClient);
  
  useEffect(() => {
    async function verifyName() {
      const token = sessionStorage.getItem("authorization");

      let name;
      if (token) name = await getNameByToken(token);
      
      if (!name || name.length === 0) {
        router.push("/login");
      } else {
        connect(name);
      }
    }

    verifyName();
  });

  const getNameByToken = async (token: string) => {
    try {
      const response = await fetch(SERVER_ROUTE + "/verify", {
        method: "GET",
        body: JSON.stringify({ token })
      });

      const name = await response.json();

      return name;
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      window.alert(message);
    }
  }

  const connect = (name: string) => {
    socketClient.connect();
    socketClient.emit("set_user_name", name);
    setSocket(socketClient);
  }

  return (
    <div className="index">
      <Users socket={ socket } />
      <Chat socket={ socket } />
    </div>
  )
}
