library(here)
library(readxl)
library(dplyr)
library(stringr)
FBIData <- read_excel("../data/raw/2018_FBI_aggregate_crime_data.xls", skip = 3)
cleanColnames <- function(x) {
  x <- tolower(x)
  x <- gsub("[[:space:][:punct:]]+", " ", x)
  x <- str_remove_all(x, "[[0-9]]")
  x <- trimws(x)
  x <- gsub(" ", "_", x)
  x
}

names(FBIData) <- cleanColnames(names(FBIData))
names(FBIData)[[2]] <- "age_category"
FBIData %>%
  mutate(state = ifelse(is.na(state), lag(state, 1), state),
         state = str_to_title(state),
         state = str_remove_all(state, "\\d*,*"),
         estimated_population = ifelse(is.na(estimated_population), lag(estimated_population, 1), estimated_population),
         number_of_agencies = ifelse(is.na(number_of_agencies), lag(number_of_agencies, 1), number_of_agencies)) %>%
  head(-9)