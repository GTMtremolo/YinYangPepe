from socketIO_client_nexus import SocketIO
import json

socketIO = SocketIO('localhost', 3000)

def welcome():
    print('welcome received')

socketIO.on('welcome', welcome)

message = {'name': 'hoang',
           'ids': ['54fjadb70f9756', '39f1ax451f6567'],
           'relation': 'nguoi la',
           'date': '06/05/2018'}

socketIO.emit('client-event', json.loads(json.dumps(message)))

socketIO.wait()
