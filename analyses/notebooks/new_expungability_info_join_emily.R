# Sana provided us with expungability criteria for the criminal charges that were not identifiable with the regex criteria (see clean-slate/analyses/notebooks/MA_Data.ipynb). 
# This newly supplied data is as of 7/8/20.
# This script is to join that new data with the list of charges, and then join the charges data to the Northwestern and Suffolk prosecution data.
# The data that we are joining is from the Google spreadsheet that contains the new expungability info from Sana.

library(tidyverse)

#### import existing charges data that will be joined to ####
chg <- read.csv('clean-slate/data/processed/prosecution_charges.csv')

#### import new expungability data from Google sheets to join ####
# this comes from the spreadsheet "
no_chapter_section <- read.csv('./MA Prosecution Charges - Manual Identification of Chapter _ Section _ Expungability - Missing Chapter or Section.csv')  # get data that was missing chapter and section

has_chapter_section <- read.csv('./MA Prosecution Charges - Manual Identification of Chapter _ Section _ Expungability - Missing Expungability (has chapter & section).csv')  # get data that was not missing chapter and section
has_chapter_section$Charge <- as.character(has_chapter_section$Charge)

# I realized that I forgot to exclude the rows that already had expungability info from the has_chapter_section Google sheet when we first made it.
# So, I index it by the entries that were missing expungability info
kn <- chg[chg$Chapter != '' & chg$Section != '',]  # this is where sheet 2 in the google sheets came from
kn$missing_expung <- ifelse(kn$Expungeable. == '', TRUE, FALSE)  # make a marker for whether it's missing expungability
has_chapter_section <- has_chapter_section[which(kn$missing_expung),]  # index the items in the table by missing expungability

#### Remove strange characters from no_chapter_section and join ####
# which charge names don't appear in the master table?
no_chapter_section$Charge[!(no_chapter_section$Charge %in% chg$Charge)]  # two have weird "Â" character
no_chapter_section$Charge <- gsub('Â', '', no_chapter_section$Charge)  # remove that weird character
no_chapter_section$Charge[!(no_chapter_section$Charge %in% chg$Charge)]  # now all charge names appear in the master table

colnames(no_chapter_section)[colnames(no_chapter_section) == 'Expungeable.'] <- 'expung2'
no_chapter_section$new <- 1
chg_mod <- chg %>% left_join(no_chapter_section %>% select(Charge, NW.Counts, SF.Counts, expung2, new))
chg_mod$expung2 <- chg_mod$expung2 %>% recode(no = 'No', yes = 'Yes')  # capitalize
chg_mod$Expungeable.[!is.na(chg_mod$new)] <- chg_mod$expung2[!is.na(chg_mod$new)]  # combine new expungability info with old
chg_mod <- chg_mod %>% select(-expung2, -new)  # perfect match!

# Joining will not be as easy for has_chapter_section because copying into the Google sheets messed up some 
# of the characters in it and it's hard to tell which ones are not identical. So, we can write a special function...

#### Function that isolates just alphanumeric characters to match charge names ####
alphaonly <- function(charge) { 
  alphalist <- lapply(charge, function(x) {str_extract_all(x, '[[:alnum:]]+') %>% unlist() %>% paste(collapse = '')})
  return(unlist(alphalist))
}

#### Joining charges from has_chapter_section ####
has_chapter_section <- has_chapter_section %>% 
  mutate(alphcharge = alphaonly(Charge))  # make column with charge name minus non-alphanumeric characters

has_chapter_section %>% group_by(alphcharge, NW.Counts, SF.Counts) %>% filter(n() > 1)
# this tells us there are no duplicates by charge name and charge counts after isolating alphanumeric characters.

has_chapter_section$alphcharge[!(has_chapter_section$alphcharge %in% alphaonly(chg$Charge))]  
# there are still many charge names that are not found in the master list, but this seems to be because of the weird Â character again

has_chapter_section$Charge <- gsub('Â', '', has_chapter_section$Charge)  # remove the weird Â character
has_chapter_section <- has_chapter_section %>% mutate(alphcharge = alphaonly(Charge))
has_chapter_section$alphcharge[!(has_chapter_section$alphcharge %in% alphaonly(chg$Charge))]  # all charge names are found in the master list!

chg_mod <- chg_mod %>% mutate(alphcharge = alphaonly(Charge))  # make alphanumeric isolation column in left table
colnames(has_chapter_section)[colnames(has_chapter_section) == 'Expungeable.'] <- 'expung2'
has_chapter_section$new <- 1
# chg_mod2 <- chg_mod %>% left_join(has_chapter_section %>% select(Charge, NW.Counts, SF.Counts, expung2, new))
chg_mod2 <- chg_mod %>% left_join(has_chapter_section %>% select(alphcharge, NW.Counts, SF.Counts, expung2, new))

chg_mod2$expung2 <- chg_mod2$expung2 %>% recode(no = 'No', yes = 'Yes')  # capitalize
chg_mod2$Expungeable.[!is.na(chg_mod2$new)] <- chg_mod2$expung2[!is.na(chg_mod2$new)]  # combine new expungability info with old
chg_mod2 <- chg_mod2 %>% select(-expung2, -new, -alphcharge)  # remove junk columns

# how many charges' expungability were filled in?
nrow(chg[chg$Expungeable. != '',])  # 776 filled in
nrow(chg_mod2[chg_mod2$Expungeable. != '',])  # 1233 filled in

# export
# write.csv(chg_mod2, 'prosecution_charges_emily.csv')
write.csv(chg_mod2, 'clean-slate/data/processed/prosecution_charges.csv')

# which ones are still missing? export to CSV that everyone can edit
missing <- chg_mod2[chg_mod2$Expungeable. == '',]
missing <- select(missing, -X)

# strip only numerics from chapter/section and arrange numerically
missing$numchap <- missing$Chapter %>% str_extract_all('[[0-9]]') %>% lapply(FUN = function(x){paste(x, collapse = '')}) %>%
  unlist %>% as.numeric  # not all of the chapters are correct (some numbers were stripped out of context by Dawn's regex), may have to manually identify
missing$numsec <- missing$Section %>% str_extract_all('[[0-9]]') %>% lapply(FUN = function(x){paste(x, collapse = '')}) %>% 
  unlist %>% as.numeric
missing <- arrange(missing, numchap, numsec)
missing <- missing %>% select(-numchap, -numsec)
missing$tempID <- 1:nrow(missing) 
write.csv(missing, 'clean-slate/data/raw/missing_expungeability_07-21.csv')
