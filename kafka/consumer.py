import datetime
import json 
from kafka import KafkaConsumer
from dataGenerator import get_random_user
import requests
if __name__ == '__main__':
    consumer= KafkaConsumer(
    'gameHoursTopic',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest'
    )

    for message in consumer:
        #print("Message received at: " + str(datetime.now()))
        print(json.loads(message.value)) 
        #send the message to the api usign the user id
        user_id = get_random_user()
        print("Dados enviados ao user:  " + str(user_id))
        url = 'http://localhost:8080/users/' + str(user_id) + '/hours'   
        if requests.put(url, json=json.loads(message.value)):
            print("Success")
        else:
            print("Failed")





