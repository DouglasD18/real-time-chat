import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useState } from 'react';

type Props = {
  socket: Socket
}

interface Message {
  text: string
  author: string
}

const BASE: Message[] = [];

export default function Chat({ socket }: Props) {
  const [messageList, setMessageList] = useState(BASE);

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList((current) => [...current, data])
    })
  }, [socket]);

  return (
    <div>
      { messageList && messageList.map((message, index) => (
        <div className="message-box" key={ index }>
          <h4>{ message.author }</h4>
          <p>{ message.text }</p>
        </div>
      )) }
    </div>
  )
}
