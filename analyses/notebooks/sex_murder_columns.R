# 7/29/20, marking columns that are related to sex or murder to help with answering our main questions

library(tidyverse)

chg_sorted <- read.csv('clean-slate/data/processed/prosecution_charges.csv') 
# make numeric columns isolating the numeric characters of the chapter/section strings (note this makes some of them inaccurate)
chg_sorted$numchap <- chg_sorted$Chapter %>% str_extract_all('[[0-9]]') %>% lapply(FUN = function(x){paste(x, collapse = '')}) %>%
  unlist %>% as.numeric
chg_sorted$numsec <- chg_sorted$Section %>% str_extract_all('[[0-9]]') %>% lapply(FUN = function(x){paste(x, collapse = '')}) %>%
  unlist %>% as.numeric
  

chg_sorted <- chg_sorted %>% arrange(numchap, numsec)

#### Make new column for sex-related charges where all items are 0 at first, then mark related charges as 1 ####
chg_sorted$sex <- 0

# Chapter 6 seems to be sex-based (have to use the which() function when dealing with numchap and numsec to avoid picking up NAs)
chg_sorted$sex[which(chg_sorted$numchap == 6 &
                       !grepl('registry info', chg_sorted$Description %>% tolower) &
                 !grepl('cori', chg_sorted$Description %>% tolower))] <- 1  # exclude sex registry info misuse and 
# TODO: some of the offenses here are marked as expungeable, such as "SEX OFFENDER REGISTRY INFO, MISUSE". Do we need to double check these?

# Chapter 123A: sexually dangerous person
chg_sorted$sex[chg_sorted$Chapter == '123A'] <- 1

# Chapter 265: many different charges with rape
chg_sorted$sex[which(chg_sorted$numchap == 265 & grepl('rape', chg_sorted$Description %>% tolower))] <- 1

# Chapter 265: Kidnapping w/ sexual assault, sex trafficking
chg_sorted$sex[which(chg_sorted$numchap == 265 & grepl('sex', chg_sorted$Description %>% tolower))] <- 1

# Chapter 268 section 21A: Prison guard have sexual relations w/ prisoner? I think this qualifies b/c it says "In a prosecution commenced under this section, an inmate shall be deemed incapable of consent to sexual relations with such person". So this is essentially rape and would qualify as a crime under chapter 265.
chg_sorted$sex[grepl('prison guard', chg_sorted$Description %>% tolower)] <- 1

## Decided to reference chapter 123A "sexual offense" definitions for chapter 272

# Abducting person for prostitution (Chapter 272 section 2)
chg_sorted$sex[grepl('prostitution', chg_sorted$Description %>% tolower) &
                 grepl('abduct', chg_sorted$Description %>% tolower)] <- 1

# Offering drugs for sex (Chapter 272 section 3)
chg_sorted$sex[grepl('intercourse', chg_sorted$Description %>% tolower) &
                 grepl('drug', chg_sorted$Description %>% tolower)] <- 1

# Everything in Ch. 272 section 4 (enticing minor, enticing person into prostitution)
chg_sorted$sex[which(chg_sorted$numchap == 272 & chg_sorted$numsec == 4)] <- 1

# TODO: Procuring someone into prostitution sec 12??? not listed on 123a. it's a felony but it's marked as expungeable, so not including.

# 123A: "any other offense, the facts of which, under the totality of the circumstances, manifest a sexual motivation or pattern of conduct or series of acts of sexually-motivated offenses." seems like procuring someone into prostitution or photographing nude person would count, but both are exempt, so I'm not including either or those.

# Also, note for future modification if needed: the section for photographing unsuspecting nude person is wrong (it's supposed to be 105b)

# Lewdness (Chapter 272 section 16 and 53), but need to only mark the ones that are not expungeable (because it's expungeable under certain conditions)
chg_sorted$sex[grepl('lewd', chg_sorted$Description %>% tolower) & chg_sorted$Expungeable. == 'No'] <- 1

# Incest (Chapter 272 section)
chg_sorted$sex[grepl('incest', chg_sorted$Description %>% tolower)] <- 1

# Everything in section 28
chg_sorted$sex[which(chg_sorted$numchap == 272 & chg_sorted$numsec == 28)] <- 1

# Only section 29a, 29b, and 29c are not expungeable. These all regard child pornography
chg_sorted$sex[which(chg_sorted$numchap == 272 & chg_sorted$numsec == 29 & chg_sorted$Section != 29)] <- 1

# Unnatural acts with a child under 18 (section 35A, but not section 35)
chg_sorted$sex[which(chg_sorted$numchap == 272 & chg_sorted$Section == '35A')] <- 1

# Sex-related offenses in chapter 53: only mark the sex-based charges where expungeability is marked as No
# note: lewdness already marked earlier
chg_sorted$sex[which(chg_sorted$numchap == 272 & chg_sorted$numsec == 53 & 
                       (grepl('exposure', chg_sorted$Description %>% tolower) |  # indecent exposure
                          grepl('opposite sex', chg_sorted$Description %>% tolower)) &  # annoying someone of opposite sex
                       chg_sorted$Expungeable. == 'No')] <- 1
chg_sorted$sex[which(chg_sorted$numchap == 272 & chg_sorted$Section == '53A')] <- 1  # anything in 53A



## Charges that aren't labeled with chapter/section:

# Statutory rape of child
chg_sorted$sex[grepl('rape of child', chg_sorted$Description %>% tolower)] <- 1

# Sex offender fail to register
chg_sorted$sex[grepl('sex offender fail', chg_sorted$Description %>% tolower)] <- 1

# Sexually dangerous person
chg_sorted$sex[grepl('sexually dangerous person', chg_sorted$Description %>% tolower)] <- 1

## Check if all of these charges marked as sex-related are indeed not expungeable
chg_sorted[chg_sorted$sex == 1,] %>% View





#### Make new column for murder-related charges where all items are 0 at first, then mark related charges as 1 ####
chg_sorted$murder <- 0

# Mark anything with homicide, murder, manslaughter
chg_sorted$murder[grepl('homicide', chg_sorted$Description %>% tolower)] <- 1
chg_sorted$murder[grepl('murder', chg_sorted$Description %>% tolower)] <- 1  # includes attempted murder
chg_sorted$murder[grepl('manslaughter', chg_sorted$Description %>% tolower)] <- 1

# TODO: I'm assuming we're counting assault to murder? (crimes with intent to murder are indeed inexpungeable)
# TODO: I'm assuming we're *not* counting severe bodily injury? charges have to explicitly relate to murder

## Check if all of these charges marked as murder-related are indeed not expungeable
chg_sorted[chg_sorted$murder == 1,] %>% View

#### Remove temporary columns ####
chg_sorted <- chg_sorted %>% select(-numchap, -numsec)

# Write to CSV
write.csv(chg_sorted, 'clean-slate/data/processed/prosecution_charges.csv')

