const app = require('express')();
const http = require('http').Server(app);
const fs = require('fs');
const FCM = require('fcm-push');
const bodyParser = require("body-parser");

var serverKey = 'AAAAJpVeXrk:APA91bF4xgdo8pGIbLzyy4uv4kotwOFur_1VE31S43ExWJsolgEaceMSNnKmxa7N_moQ2qN2aH1b4sdDHDs6vWVEhxWMftoko_2XgEQ3pEWH7ealVz3kmIjgUN7r_p0BAhXBUOMLYoel';
var fcm = new FCM(serverKey);

var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

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

app.get('/imgs/:imgPath', (req, res) => {
    res.sendFile(__dirname + '/imgs/' + req.params.imgPath);
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

    // Save encoded image string into file
    socket.on('send-img', (data) => {

        console.log(data.name);
        console.log(data.time);

        let buf = Buffer.from(data.imageStr, 'base64');
        let fileName = new Date().getTime() + '.jpeg';
        fs.writeFile('imgs/' + fileName, buf, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved: ' + fileName);

            // Generate notification
            let jsonObj = {
                to: 'fy_RjeL6YZs:APA91bHdO-fGPszAjjKaXiXEfP6ZxpyljayhHngzi7OEZ-mqlXnTBNQXsJ6Qoskp3kMGj0D-ffDpDco-d-ntXSY966NQiqTsq_ezatv-5P3HgIBN_1LjRnfroXjn230brgpfSnclwNHZ',
                data: {
                    imgLink: `http://10.20.17.181:3000/imgs/${fileName}`
                },
                notification: {
                    title: 'Title of the push notification',
                    body: 'Body of the push notification',
                    "click_action": ".MainActivity"
                }
            };

            // Send notification
            sendJSONToFCM(jsonObj);

            // Handle tryPOST request
            let handler = app.post('/tryPOST', (req, res) => {
                res.send('Done!');

                let ID = req.body['ID'];
                let Action = req.body['Action'];
                console.log('ID', ID);
                console.log('Action', Action);
                socket.emit('user-action', {
                    id: ID,
                    action: Action
                });
            });

        });
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

function sendJSONToFCM(jsonObj) {
    fcm.send(jsonObj, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!");
            console.log(err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}