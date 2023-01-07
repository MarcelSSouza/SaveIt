import urllib.request
import csv
import os
from bs4 import BeautifulSoup
from user_agent import generate_user_agent
import json
import time
import xlsxwriter

import pprint
pp = pprint.PrettyPrinter(width=80, compact=True)

## Link File
filepath='gamelinks.csv'

file_exists = os.path.isfile(filepath)
if (file_exists is False):
    print("Wrong filepath.!")

links = []
with open(filepath, 'r') as input:
    reader = csv.reader(input)
    for r in reader:
        links.append(r[0])
## File

## Xlsx
filepath = 'gameDataset.xlsx'

file_exists = os.path.isfile(filepath)
if (file_exists):
    os.remove(filepath)

workbook = xlsxwriter.Workbook('gameDataset.xlsx')
worksheet = workbook.add_worksheet()

worksheet.write(0, 0, "name")
worksheet.write(0, 1, "releaseDate")
worksheet.write(0, 2, "genre")
worksheet.write(0, 3, "publisher")
worksheet.write(0, 4, "metaScore")
worksheet.write(0, 5, "totalCriticism")
worksheet.write(0, 6, "userRate")
worksheet.write(0, 7, "userRateCount")
worksheet.write(0, 8, "summary")
worksheet.write(0, 9, "ID")
worksheet.write(0, 10, "comments")
worksheet.write(0, 11, "commentCount")
worksheet.write(0, 12, "imageUrl")
worksheet.write(0, 13, "multiplayer")



row = 1
## Xlsx

metacritic_base = "http://www.metacritic.com"
hdr= {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8', 'User-Agent': generate_user_agent(device_type="desktop", os=('mac', 'linux', 'win'))}


count = 1
exception_list = []

for link in links:
    print("Scraping Game {} - {} Games Left".format(count, len(links)-count))
    #
    metacritic = metacritic_base+link

    try:
        page = urllib.request.Request(metacritic, headers=hdr)
        content = urllib.request.urlopen(page).read()
        soup = BeautifulSoup(content, 'html.parser')

        data = json.loads(soup.find('script', type='application/ld+json').text)


        cl_count = soup.find('div', class_="userscore_wrap").find('span', class_="count")
        user_rate_count = cl_count.find('a').text.replace(' Ratings', '')

        resumo= soup.find('span', class_="blurb blurb_collapsed").text
        user_rating = soup.find('div', class_="user").text
        rating_count = data['aggregateRating']['ratingCount']
        rating_value = data['aggregateRating']['ratingValue']
        date = data['datePublished']
        genre_list = data['genre']
        imageUrl = soup.find('img', class_="product_image large_image")['src']
        name = data['name']
        multiplayerqty = soup.find('li', class_="summary_detail product_players").find('span', class_="data").text
        publishers_list = []
        publishers = data['publisher']
        for pb in publishers:
            publishers_list.append(pb['name'])

        
        worksheet.write(row, 0, name)
        worksheet.write(row, 1, date)
        worksheet.write(row, 2, ", ".join(genre_list))
        worksheet.write(row, 3, ", ".join(publishers_list))
        worksheet.write(row, 4, rating_value)
        worksheet.write(row, 5, rating_count)
        worksheet.write(row, 6, user_rating)
        worksheet.write(row, 7, user_rate_count)
        worksheet.write(row, 8, resumo)
        worksheet.write(row, 9, count)
        worksheet.write(row, 12, imageUrl)
        worksheet.write(row, 13, multiplayerqty)
        row += 1
        
        

        #
        #time.sleep(2)
    except BaseException as e:
            exception_list.append("On game link {}, Error : {}".format(count,str(e)))

    count += 1

workbook.close()

if(len(exception_list) > 0):
    filepath = "exceptions"
    file_exists = os.path.isfile(filepath)
    if (file_exists):
        os.remove(filepath)

    with open(filepath, 'a') as output:
        writer = csv.writer(output, lineterminator='\n')
        for e in exception_list:
            writer.writerow([e])