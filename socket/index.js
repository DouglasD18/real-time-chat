require('dotenv').config();

const PORT = process.env.PORT;
const ROUTE = process.env.ROUTE;

const express = require('express');

const app = express();

const server = app.listen(PORT, () => {
  console.log('Listening at port ', PORT);
});

const io = require('socket.io')(server, { cors: ROUTE });


io.on('connect', socket => {
  socket.on('disconnect', reason => {
    io.emit('disconnect', {
      reason,
      author: socket.data.email
    })
  })

  socket.on('set_user_email', email => {
    socket.data.email = email
  })

  socket.on('message', text => {
    io.emit('receive_message', {
      text,
      author: socket.data.email
    })
  })
})
