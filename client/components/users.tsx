import { Socket } from "socket.io-client"
import { useEffect, useState } from 'react';

type Props = {
  socket: Socket
}

const BASE: string[] = [];

export default function Users({ socket }: Props) {
const [usersList, setUsersList] = useState(BASE);

  useEffect(() => {
    socket.on('message', data => {
      setUsersList((current) => [...current, data.author])
    })
  }, [socket])

  return (
    <div>
      { usersList && usersList.map((user, index) => (
        <div className="user-box" key={ index }>
          { user }
        </div>
      )) }
    </div>
  )
}