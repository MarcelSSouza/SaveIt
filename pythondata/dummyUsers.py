## create a list of objects with dummy ID
import random
import datetime
import json
import requests
from faker import Faker
LIST_OF_ALL_THE_GENRES = ['General', 'Western-Style', 'Role-Playing', 'First-Person', 'Shooter', 'Arcade', 'Action', 'Sci-Fi', 'Action Adventure', 'Modern', 'Open-World', 'Traditional', 'Sports', 'Management', 'Team', 'Baseball', 'Sim', 'Compilation', 'Miscellaneous', 'PC-style RPG', 'Japanese-Style', 'Strategy', 'Real-Time', 'Command', 'Action RPG', 'Turn-Based', '4X', 'Historic', '3D', 'Third-Person', 'Adventure', 'Fantasy', 'Puzzle', 'Stacking', 'Sandbox', 'Linear', 'Music', 'Rhythm', 'Massively Multiplayer Online', 'Board / Card Game', 'Massively Multiplayer', 'Wargame', 'Virtual Life', 'Virtual', 'Simulation', 'Soccer', 'Tactical', 'Survival', 'Golf', 'Individual', 'Flight', 'Civilian', 'Formula One', 'Racing', 'Driving', 'Automobile', 'WWII', 'Combat', 'Space', 'Small Spaceship', '2D', 'Fighting', 'Skate / Skateboard', 'Alternative', 'Skateboarding', 'Point-and-Click', 'Platformer', 'Football', 'Business / Tycoon', 'Ice Hockey', 'Marine', 'Submarine', 'Modern Jet', 'MOBA', 'Tactics', 'GT / Street', 'Card Battle', 'Console-style RPG', "Beat-'Em-Up", 'Top-Down', "Shoot-'Em-Up", 'Stock Car', 'Rail', 'Tycoon', 'Civilian Plane', '', 'Metroidvania', 'Roguelike', 'Defense', 'Basketball', 'Visual Novel', 'Mech', 'Vehicle', 'Government', 'Rally / Offroad', 'Military', 'Helicopter', 'Vertical', 'Horizontal', 'Scrolling', 'Horror', 'Tank', 'City Building', 'Light Gun', 'Parlor', 'Pinball', 'Other', 'Matching', 'Breeding/Constructing', 'Boxing / Martial Arts', 'Motorcycle', 'Street', 'Train', 'Text', 'Career', 'Static', 'Edutainment', 'Logic', 'Futuristic Jet', 'Large Spaceship', 'Trainer', 'Hidden Object', 'Surfing', 'Surf / Wakeboard', 'Billiards', 'Mission-based', 'Board Games', 'Futuristic', 'Party  Minigame', 'Biking', 'Car Combat', 'Ski  Snowboard', 'Demolition Derby', 'Boxing', 'Trivia  Game Show', 'Ship', 'Interactive Movie', 'Wrestling', 'Gambling', 'Motocross', 'Artillery', 'Application']
# create a list of objects with dummy ID, name, email, password
response = requests.get('http://localhost:8080/users')
response2 = requests.get('http://localhost:8080/games')
users_id=[]
games_id=[]

for user in response.json():
    users_id.append(user['id'])

for game in response2.json():
    games_id.append(game['id'])

fake = Faker()
LIST_OF_USERS = []
for i in range(1000):
    LIST_OF_USERS.append({
        "userId": i,
        "name": fake.name(),
        "email": fake.email(),
        "password": fake.password(),
        "playedHours": { random.choice(games_id) : random.randint(0, 100)}, #dictionary of gameID:playedHours
        "playing": [random.choice(games_id) ,random.choice(games_id) ,random.choice(games_id) ],
        "toBePlayed": [random.choice(games_id) ,random.choice(games_id) ,random.choice(games_id) ],
        "played": [random.choice(games_id) ,random.choice(games_id) ,random.choice(games_id), random.choice(games_id) ,random.choice(games_id) ],
        "favoriteGenre":[random.choice(LIST_OF_ALL_THE_GENRES)]
        
    })

#save the list of objects to a json file
with open('./users.json', 'w') as outfile:
    json.dump(LIST_OF_USERS, outfile)






