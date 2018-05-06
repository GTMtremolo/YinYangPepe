const app = require('express')();
const http = require('http').Server(app);
const fs = require('fs');
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    fs.readFile('index.html', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.send(data);
        }
    });
});

app.get('/code', function (req, res) {
    fs.readFile('getcode.html', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        } else {
            res.send(data);
        }
    });
});

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    socket.emit('welcome');

    // Send a message after 2 seconds
    setTimeout(() => {
        socket.send('What is up?');
    }, 2000);

    // Emit a event after 3 seconds
    setTimeout(() => {
        socket.emit('custom-event', {
            name: 'Just a name',
            message: 'Just a simple message'
        })
    }, 3000);

    // Handle client-event
    socket.on('client-event', (message) => {
        console.log('client-event: ' + JSON.stringify(message));
    });

    // Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });

    // // Keep spamming to everyone
    // setInterval(() => {
    //     io.sockets.send('' + new Date().getSeconds() + ' - Spam...!');
    // }, 5000);
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});