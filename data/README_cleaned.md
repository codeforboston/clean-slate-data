# Cleaned datasets (and scripts to do the cleaning)

This folder contains datasets that have been cleaned of errors and challenges and are ready to be processed into a format usable for final analyses, as well as the scripts used to convert raw data (stored in the raw folder) into the cleaned version. 

Please document your code (with comments mentioning what sort of errors are being cleaned and why you're cleaning them) and add your dataset to this readme with a quick blurb listing:
- its source (raw dataset or original source location)
- the script used to clean the dataset
- extent (temporal/other windowing factors, size of the dataset, and if it's a sample, how large of a sample it is and how samples were chosen)
- any non-obvious variables (to newcomers to the dataset)
- and uses so far!

|File / Folder|Description|
|----|----|
|[FBI aggregated 2018](fbi_aggregated_2018)|The cleaned version of the [raw 2018 FBI dataset](../raw/2018_FBI_aggregate_crime_data.xls), with non-data rows removed, footnotes and other variable name oddities stripped, and missing values (for state names, agency counts, and populations) filled in.|
|[FBI aggregated data combined](fbi_aggregated_data_combined)|A variant of the above including data from 2014 through 2018, binding them into a single dataframe spanning multiple years.|
