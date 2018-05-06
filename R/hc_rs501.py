import RPi.GPIO  as GPIO
import time
GPIO.setmode(GPIO.BOARD)
GPIO.setup(24,GPIO.IN)

try:
    time.sleep(2)
    i = 0
    while True:
        if GPIO.input(24):
            
                # todo
            
        time.sleep(0.5)
except:
    GPIO.cleanup()
