const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 80;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
 
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    console.log('New user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

server.listen(port, () => {
    console.log(`Running on port: ${port}`);
});