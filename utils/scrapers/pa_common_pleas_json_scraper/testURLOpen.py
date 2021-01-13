import requests
import urllib3
import urllib.error
requests.packages.urllib3.disable_warnings()
requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS += 'HIGH:!DH:!aNULL'

try:
   requests.packages.urllib3.contrib.pyopenssl.DEFAULT_SSL_CIPHER_LIST += 'HIGH:!DH:!aNULL'
except AttributeError:
    # no pyopenssl support used / needed / available
    pass

http = urllib3.PoolManager()
webpage = http.request('GET', f'https://services.pacourts.us/public/v1/cases/CP-01-CR-0101399-2018')
print(webpage.status)
if webpage.status == 200 :
    print("That address does exist")
elif webpage.status == 404:
    print("That address does not exist")

