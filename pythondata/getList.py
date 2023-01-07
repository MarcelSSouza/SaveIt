import json
import os
with open('./gameDataset.json') as data:
    data1 = data.read()

data2 = json.loads(data1)

LIST_OF_ALL_THE_GENRES = []



for i in data2:
    for j in i['Genre']:
        if j not in LIST_OF_ALL_THE_GENRES:
            LIST_OF_ALL_THE_GENRES.append(j)


