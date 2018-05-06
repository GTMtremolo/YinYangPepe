

# def on_connect():
#     print('connect')

# def on_disconnect():
#     print('disconnect')

# def on_reconnect():
#     print('reconnect')

# def on_custom_event(*args):
# 	print('custom-event', args)

# socketIO = SocketIO('http://10.20.17.181', 3000, LoggingNamespace)
# socketIO.on('connect', on_connect)
# socketIO.on('disconnect', on_disconnect)
# socketIO.on('reconnect', on_reconnect)http://35.231.81.100

# # Listen
# socketIO.on('custom-event', on_custom_event)
# socketIO.emit('client-event')
from socketIO_client_nexus import SocketIO, LoggingNamespace
import json
import base64

socketIO = SocketIO('localhost', 3000, verify=False)


def welcome():
    print('welcome received')

def printUserAction(*args):
    print('User action received:\n')
    print(args[0]['id'])
    print(args[0]['action'])

socketIO.on('welcome', welcome)

socketIO.on('user-action', printUserAction)

with open("img.jpeg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

message = {'name': 'hoang',
           'imageStr': encoded_string,
           'relation': 'nguoi la',
           'time': '11:00 06/05/2018'}

socketIO.emit('send-img', json.loads(json.dumps(message)))

# while True:
#     pass

socketIO.wait()
