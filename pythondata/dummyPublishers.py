## create a list of objects with dummy ID
import random
import datetime
import json
import requests
from faker import Faker
##NOW CREATING DEVELOPERS
fake = Faker()
LIST_OF_USERS = []
for i in range(10):
    LIST_OF_USERS.append({
        "id": i+1,
        "name": fake.name(),
        "email": fake.email(),
        "password": fake.password(),
        "gamesOwned": []
    })

#save the list of objects to a json file
with open('./publishers.json', 'w') as outfile:
    json.dump(LIST_OF_USERS, outfile)## create a list of objects with dummy ID
