## get the data from the file gameDataset.json and change all the keys to lower case
import json
import os
import sys
import re
import string
import random
def main():
    # get the path of the file gameDataset.json
    path = os.path.join(os.path.dirname(__file__), "./gameDataset.json")
    # open the file gameDataset.json
    with open(path, "r") as f:
        # get the data from the file gameDataset.json
        data = json.load(f)
        #create a list of tuples with dummy comments and a rating integer from 1 to 10 for each comment
        dummyComments = [("This game is awesome", 10), ("This game is great", 9), ("This game is good", 8), ("This game is ok", 7), ("This game is bad", 6), ("This game is terrible", 5), ("This game is awful", 4), ("This game is horrible", 3), ("This game is terrible", 2), ("This game is awful", 1)]
        # add from 1 to 3 dummy comments to each comments section of each game in the dataset json file
        for game in data:
            for i in range(1, 3):
                # get a random comment from the dummy comments list
                comment = random.choice(dummyComments)
                # add the comment to the comments section of the game
                if game["comments"] is not None:
                    game["comments"].append({"comment": comment[0], "rating": comment[1]})
                else:
                    game["comments"]= [{"comment": comment[0], "rating": comment[1]}]
            game["commentcount"] = len(game["comments"])
        
        # save the data in the file gameDataset.json
        with open(path, "w") as f:
            json.dump(data, f, indent=4)
        
        

if __name__ == "__main__":
    main()