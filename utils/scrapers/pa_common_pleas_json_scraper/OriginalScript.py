from urllib.request import urlopen,Request
import logging
for item1 in range(10):
    i = format(item1,"02d")
    for item2 in range(9999999):
        j = format(item2, "07d")
            for item3 in range(2018,2019):
                try:
                    file = f'https://services.pacourts.us/public/v1/cases/CP-{i}-CR-{j}-{item3}'
                    req = Request(file,headers={'User-Agent': 'Mozilla/5.0'})
                    webpage = urlopen(req).read()
                    file1 = open(f"/Users/abhijit/Desktop/code-for-boston/clean-slate/json_scripts/{i}_{j}_{item3}.json", "wb")  # append mode
                    file1.write(webpage)
                    file1.close()
                except Exception as e:
                    logging.error('error is',)
                    file2 = open("/Users/abhijit/Desktop/code-for-boston/clean-slate/logs.csv", "a")
                    log = f'{file},{e} \n'
                    file2.write(log)
