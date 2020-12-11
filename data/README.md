# Data

This folder contains all datasets used in the process of this project. Specifically, datasets have been broken out here into the following groups:

|           Name           |                                                                    Description                                                                    |   Status   |
| :----------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: | :--------: |
|     'fbi_crime_data'     |                             compilation of different types of crimes committed recorded by the FBI from 2014 to 2018                              | Deprecated |
|     'ma_court_data'      |                   main dataset we are working with to extract information on how many individuals meet expungeability criterias                   |   Active   |
|    'crime_categories'    | list of crime categories and whether or not they are expungeable. categories in this list are not mapped to the categories in ma_court_data files |  Inactive  |
| 'prosecution_categories' |                  list of crime categories mapped to categories in ma_court_data with indication on whether they are expungeable                   |   Active   |

Please note that if your data is sensitive (i.e., can be tied to an individual), we do not want it in this repo.
Please add it to the gitignore file so that it doesn't git pushed. Contact a collaborator to figure out a solution for data storage moving forward for files with sensitive information.
