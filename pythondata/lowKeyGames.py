## get the data from the file gameDataset.json and change all the keys to lower case
import json
import os
import sys
import re
import string

def main():
    # get the path of the file gameDataset.json
    path = os.path.join(os.path.dirname(__file__), "./gameDataset.json")
    # open the file gameDataset.json
    with open(path, "r") as f:
        # get the data from the file gameDataset.json
        data = json.load(f)
        # change all the keys presented in the list of objects  to lower case
        for i in range(len(data)):
            for key in list(data[i].keys()):
                data[i][key.lower()] = data[i].pop(key)
        # save the data in the file gameDataset.json
        with open(path, "w") as f:
            json.dump(data, f, indent=4)
        
        

if __name__ == "__main__":
    main()