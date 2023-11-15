from bs4 import BeautifulSoup
import requests
import json
import re
import sys
import pyodbc
import struct
from azure import identity

# List of URLs to scrape from
urls = ['https://we.umg.edu.pl/kao/konsultacje',
       'https://we.umg.edu.pl/kem/konsultacje',
       'https://we.umg.edu.pl/keo/konsultacje',
       'https://we.umg.edu.pl/ktm/konsultacje']

response = requests.get(urls[3])

soup = BeautifulSoup(response.content, 'html.parser')

trs = soup.find_all('tr')

for tr in trs:
    for td in tr.find_all('td'):
        if td.string:
            if td.string.strip() == '':
                td.string.replace_with('')
            td.string.replace_with(td.string.replace('\t', ''))
            td.string.replace_with(td.string.replace('\n', ''))
            if td.string.strip() == '':
                td.decompose()

    if tr is None:
        tr.decompose()
        continue
    if tr.string:
        tr.string.replace_with(tr.string.replace('\n', ''))
        tr.string.replace_with(tr.string.replace('\t', ''))
        if tr.string.strip() == '':
            tr.string.replace_with('')

items = []

# list of science titles
titles = [
    re.compile('prof'), 
    re.compile('dr'), 
    re.compile('hab'), 
    re.compile('inż')
]
days = [
    re.compile('poniedziałek'), 
    re.compile('wtorek'), 
    re.compile('środa'), 
    re.compile('czwartek'),
    re.compile('piątek')
]

stacjonarne = re.compile('stacjonarne')
niestacjonarne = re.compile('niestacjonarne')

class Professor:
    prof_id = ''
    faculty = ''
    name = ''
    room = ''
    stac = []
    nstac = []

    def __init__(self, prof_id, name, faculty, room, stac, nstac): 
        self.prof_id = prof_id
        self.faculty = faculty
        self.name = name
        self.room = room
        self.stac = stac
        self.nstac = nstac

    def __repr__(self):
        return f"Item(id={self.prof_id}, name={self.name}, room={self.room})\n \
        Hours(stac={len(self.stac)}, nstac={len(self.nstac)})"

# 0 -> stacjonarne, 1 -> niestacjonarne
appender = 0
numerator = 0
consultation = [[], []]

professor = None
room = None
for url in urls:
    faculty = url.split('/')[3].upper()

    for tr in trs:
        tr = tr.get_text().replace('\n', '')
    
        if any(title.search(tr) for title in titles):
            if professor is not None and room is not None:
                items.append(Professor(numerator, professor, faculty, room, consultation[0], consultation[1]))
                numerator = numerator + 1
                consultation = [[], []]

            professor, room = tr.split('pok.')
            continue

        if stacjonarne.search(tr) and appender == 1:
            appender = 0
            continue
        if niestacjonarne.search(tr):
            appender = 1
            continue

        if any(day.search(tr) for day in days):
            index_to_add = len(tr) - 11
            new_tr = tr[:index_to_add] + ' -> ' + tr[index_to_add:]
            consultation[appender].append(new_tr)

        if tr.count('.') == 3:
            consultation[appender].append(tr)

    print(len(items))

for item in items:
    print(item)


server = '{project}.database.windows.net'
database = '{db}'
username = '{username}'
password = '{password}'
driver= '{driver}'


with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password) as conn:
    with conn.cursor() as cursor:
        for item in items:
            for stac in item.stac:
                result = ''.join(a for i, a in enumerate(stac) if a != '\t' or '\t' not in stac[:i])
                cursor.execute(f"INSERT INTO Consultation (ProfessorId, Data) VALUES (?, ?)", item.prof_id, result)

        conn.commit()