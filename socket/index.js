const PORT = process.env.PORT;
const ROUTE = process.env.ROUTE;

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: ROUTE }})


io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id);

  socket.on('disconnect', reason => {
    console.log('Usuário desconectado!', socket.id)
  })

  socket.on('set_username', username => {
    socket.data.username = username
  })

  socket.on('message', text => {
    io.emit('receive_message', {
      text,
      author: socket.data.username
    })
  })
})

server.listen(PORT, () => console.log('Server running...'));
