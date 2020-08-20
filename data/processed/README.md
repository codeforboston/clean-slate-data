# Processed datasets (and scripts to do the processing)

This folder contains datasets that have been processed into a format usable for final analyses, as well as the scripts used to convert cleaned data (stored in the cleaned folder) into the processed version. 

Please document your code (with comments mentioning how and why you've wrangled the dataset) and add your dataset to this readme with a quick blurb listing:
- its source (cleaned dataset or original source location)
- the script used to process the dataset
- extent (temporal/other windowing factors, size of the dataset, and if it's a sample, how large of a sample it is and how samples were chosen)
- any non-obvious variables (to newcomers to the dataset)
- and uses so far!

|File / Folder|Description|
|----|----|
|prosecution_northwestern.csv|Prosecution data from the Northwestern DA|
|prosecution_suffolk.csv|Prosecution data from the Suffolk DA|
|prosecution_charges.csv|Unique charges that appear in prosecution data, with markers for sex and murder charges|
|prosecution_charges_detailed.csv|Same as prosecution_charges, but some charges have additional information needed to determine expungeability|
