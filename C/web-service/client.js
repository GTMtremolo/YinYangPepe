//const IO = require('socket.io-client')('http://35.231.81.100:3000');
const IO = require('socket.io-client')('http://localhost:3000');
const socket = IO;

socket.on('connect', () => {
    socket.on('message', (message) => {
        console.log('---');
        console.log('Server-message: ' + message);
    });

    socket.on('welcome', () => {
        console.log('---');
        console.log('Welcome from server!');
    });

    socket.on('custom-event', (data) => {
        console.log('---');
        console.log('Server custom-event: ' + JSON.stringify(data, 0, 2));
    });

    let jsonObj = {
        name: 'hoang',
        action: 'Shadowless Kick',
        hp: 9001
    }

    socket.emit('client-event', jsonObj);
});