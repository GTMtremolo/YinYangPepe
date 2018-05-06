

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
# socketIO.emit('client-event')http://35.231.81.100
from socketIO_client_nexus import SocketIO
import json
import base64

socketIO = SocketIO('http://35.231.81.100', 3000, verify=False)

def welcome():
    print('welcome received')

socketIO.on('welcome', welcome)
#wait command from Android
def control_command(*args):
	print(args[0]['command'])
	#dieu khien raspberry



socketIO.on('control_command', control_command)

#sau khi nhan dien
with open("kitten.jpeg", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

message = {
			'name': 'hoang',
			'imageStr': encoded_string,
			'relation': 'nguoi la'
           }

socketIO.emit('client-event', json.loads(json.dumps(message)))
socketIO.wait()

# while True:
#     pass