import os
import random
import requests
import urllib3
import logging
import time
import urllib.error
from datetime import datetime

#Configuration to avoid SSL errors in servers
requests.packages.urllib3.disable_warnings()
requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS += 'HIGH:!DH:!aNULL'
try:
    requests.packages.urllib3.contrib.pyopenssl.DEFAULT_SSL_CIPHER_LIST += 'HIGH:!DH:!aNULL'
except AttributeError:
    # no pyopenssl support used / needed / available
    pass
http = urllib3.PoolManager()
cnt_Gets = 1
try:
    os.mkdir('json')
except:
    pass

def get_random_case_url():
    arr = [0,1399,16791,17754,20264,20987,26377,28658,29534,36711,38784,40496,40496,
            42052,43936,48389,48986,50154,50751,51919,52980,56324,62848,70025,70517,73861,
            76623,76623,78904,78904,79239,80115,81283,81880,81880,84390,91567,92531,94415,
            99805,103853,105737,106334,108615,109272,112034,119929,119929,123977,125689,
            126231,134916,135458,135458,137739,138186,139150,139150,139692,140139,140508,
            141384,141926,144688,145180,150079,150485,157662]
    case_number = random.randint(1,157662)
    ind_cp = 0
    while case_number > arr[ind_cp]:
        ind_cp+=1
    case_number -= arr[ind_cp-1]
    str_cp   = format(ind_cp,"02d")
    str_case = format(case_number,"07d")
    return f'https://services.pacourts.us/public/v1/cases/CP-{str_cp}-CR-{str_case}-2018'

while True:
    curr_url = get_random_case_url()
    time.sleep(1)
    webpage = http.request('GET',curr_url)
    if webpage.status == 200:
        print('Request Number ' + str(cnt_Gets) + ': Successfully got ' + curr_url)
        save_file = open(f'json/{curr_url[45:]}.json','wb+')
        save_file.write(webpage.data)
        save_file.close()
    elif webpage.status == 404:
        print('Request Number ' + str(cnt_Gets) + ': Could not get ' + curr_url)
    elif webpage.status == 429:
        print('Reached error 429, waiting for an hour')
        time.sleep(3605)
    cnt_Gets += 1

