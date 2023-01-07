import random
import string
import axios
import requests
response = requests.get('http://localhost:8080/users')
response2 = requests.get('http://localhost:8080/games')
users_id=[]
games_id=[]

for user in response.json():
    users_id.append(user['id'])

for game in response2.json():
    games_id.append(game['gameid'])


def generate_message():
    random_user = random.choice(users_id)
    random_game = random.choice(games_id)
    return{
        "game_id":int(random_game),
        "hours": random.randint(1, 100)
    }

def get_random_user():
    random_user = random.choice(users_id)
    return random_user