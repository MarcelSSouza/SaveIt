import time
import json
from kafka import KafkaProducer
import random 
from dataGenerator import generate_message
from datetime import datetime

#messages will be serializer as json
def serializer(message):
    return json.dumps(message).encode('utf-8')

#kafka producer
producer=KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=serializer
)

if __name__== '__main__':
    while True:
        dummy_message= generate_message()
        producer.send('gameHoursTopic',dummy_message)
        print("Message sent at: "+str(datetime.now()))
        
        print(str(dummy_message))
        sleeptime=random.randint(1,11)
        time.sleep(sleeptime)