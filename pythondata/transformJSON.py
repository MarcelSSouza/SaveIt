##Get the gameDataset.xlsx file from the same folder and transform it to JSON format. The  keys of the column Genre are splited.

import pandas as pd
import json

#Read the excel file
df = pd.read_excel('gameDataset.xlsx')

#Convert the excel file to JSON format
df.to_json('gameDataset.json', orient='records')


#Read the JSON file
with open('gameDataset.json') as f:
    data = json.load(f)

#Print the JSON file
print(data)





