
import paho.mqtt.client as mqtt
import paho.mqtt.client as paho
import time
# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("$SYS/#")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, message):
    print("message received " ,str(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    print("message qos=",message.qos)
    print("message retain flag=",message.retain)


def on_publish(client,userdata,result):             #create function for callback
    print("data published \n")
    pass

broker="iot.eclipse.org"
port=1883
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.on_publish = on_publish

#client.connect("iot.eclipse.org", 1883, 60)

#ret= client.publish("house/bulb1","on")
# client1= paho.Client("control1")                         #assign function to callback
# client1.connect(broker,port)                                 #establish connection
# ret= client1.publish("house/bulb1","on")
# print(ret)
#client.loop_forever()


print("creating new instance")
client = mqtt.Client("P1") #create new instance
client.on_message=on_message #attach function to callback
print("connecting to broker")
client.connect(broker, port) #connect to broker
client.loop_start() #start the loop
print("Subscribing to topic","house/bulbs/bulb1")
client.subscribe("house/bulbs/bulb1")
print("Publishing message to topic","house/bulbs/bulb1")
client.publish("house/bulbs/bulb1","OFF")
time.sleep(4) # wait
client.loop_stop() #stop the loop
