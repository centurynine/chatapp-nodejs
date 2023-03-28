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

// io.on('connect', (socket) => {
//     console.log('New user connected');
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// })


io.on('connect', (socket) => {
        socket.on('newuser', (name) => {
        let newUser = name;
        console.log(`${newUser} has joined the chat`);
         
        socket.on('disconnect', () => {
            io.emit('disconnected', `${newUser} has left the chat`);
        })

        

    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
})

server.listen(port, () => {
    console.log(`Running on port: ${port}`);
});