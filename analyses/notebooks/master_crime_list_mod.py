# On 08/25/20 we agreed to make a new modified version of the Master Crime List (a.k.a. ExpungeCategories)
# where we will keep track of any extra criteria beyond chapter/section that are used to determine expungeability,
# and then this modified Master Crime List will be joined to the MA prosecution charges list by chapter, section,
# and extra criteria, rather than just chapter and section.

# This script simply re-runs the regex to identify chapter and section on the Master Crime List, after Emily manually
# added a new column for extra criteria.

import pandas as pd
import numpy as np
import regex as re
import glob, os

# Import the new version of ExpungeCategories with manually added extra_criteria column
expunge = pd.read_csv('clean-slate/data/raw/ExpungeCategories_mod.csv')

# Standardize values for 'no'
expunge['Expungeable?'] = expunge['Expungeable?'].str.strip().replace('NO', 'No')

# Use regex to create new columns for Charge Description, Chapter, and Section
expunge['Description'] = None
expunge['Chapter'] = None
expunge['Section'] = None

for i in range(len(expunge)):
    try:
        expunge.loc[i, 'Description'] = re.search('.+?(?=\sCh.\s)', expunge.iloc[i]['Untruncated Offense'])[0].upper()
    except:
        expunge.loc[i, 'Description'] = expunge.iloc[i]['Untruncated Offense'].upper()

    try:
        expunge.loc[i, 'Chapter'] = re.search('(?<=Ch.\s)\d.*?(?=\sS)', expunge.iloc[i]['Untruncated Offense'])[0]
    except:
        expunge.loc[i, 'Chapter'] = None

    try:
        expunge.loc[i, 'Section'] = re.search('(?<=\sS\s)(\d.*)', expunge.iloc[i]['Untruncated Offense'])[0]
    except:
        expunge.loc[i, 'Section'] = None

# overwrite the modified ExpungeCategories
expunge.to_csv('clean-slate/data/raw/ExpungeCategories_mod.csv')