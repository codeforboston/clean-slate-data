# Notebooks

Does your fantastic analysis not really _need_ much? Is it contained inside a single file, and doesn't generate any outputs? Is it well documented internally, and not need a separate documentation file?

This is a good home for that code, then! Make sure your code is actually well documented, add it to this folder, and then update this readme with a quick blurb below about what it does!

|Notebook|Description|
|---|---|
|[NIBRS_2018.ipynb](NIBRS_2018.ipynb)|Summarize offenses in our NIBRS 2018 data and determine the percent of records eligible for expungement involving people 21 and younger.|
|[MA_Data.ipynb](MA_Data.ipynb)|Anonymizes the MA prosecution data from Northwestern DA and Suffolk County and provides only fields required to answer our guiding questions.|
|[new_expungability_info_join_emily.R](new_expungability_info_join_emily.R)|Joins new expungeability info from Sana into data/processed/prosecution_charges.csv, since not all charges were successfully matched to expungeability eligibilities in the last step.| 
|[sex_murder_columns.R](sex_murder_columns.R)|Adds columns for inexpungeable sex/murder related charges to data/processed/prosecution_charges.csv, and sorts by chapter and section, to the best of our ability.|
