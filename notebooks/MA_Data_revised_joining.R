# 8/12/20: This script is for going back and providing more detailed information by which to join charges' expungeability info, aside from chapter/section.
# We need to do this because we found certain charges within the same chapter and section of the law that had different expungeability eligibility based on very subtle differences, so we can't just join expungeability eligibility by chapter and section, even though we've already tried to do this.
# For instance, lewdness is only non-expungeable if it's an individual's subsequent offense. 

library(tidyverse)

# Our first step is to isolate each unique charge description in prosecution_charges.csv, which is a list of all unique charges that appear in the MA prosecution
chg <- read.csv('clean-slate/data/processed/prosecution_charges.csv')

# As we can see, there are multiple charge rows that have been duplicated (one row with Yes for expungeable, one row with No) due to left-joining with data that had multiple expungeability cases within the same chapter/section.
dups <- chg %>% group_by(Charge) %>% filter(n() > 1)
head(dups)

# Let's change the expungeability of those rows to some NA value. Then, we can eliminate the duplicate charges, create more specific joining criteria for them, and re-join to the new information we have on expungeability for those chapter/sections.
dup_charges <- unique(dups$Charge)  # we can see that some chapter/sections are still duplicated due to different charges within that section
chg_mod <- chg
chg_mod$Expungeable.[chg_mod$Charge %in% dup_charges] <- NA
chg_mod <- chg_mod %>% select(-X, -X.1) %>% unique  

# Just selecting duplicate rows doesn't eliminate all duplicates b/c sex-related charges were tagged as such if the corresponding expungeability for the row was Yes, and were tagged as not sex-related if the corresponding expungeability for the row was No. So next, we have to tell it to keep only the duplicates with sex marker = 1. There should be 1650 rows after that.
View(chg_mod %>% group_by(Charge) %>% filter(n() > 1))  # all remaining duplicate rows are only non-unique due to sex-based charge column
chg_mod <- chg_mod %>% group_by(Charge) %>% filter(n() == 1 | (n() > 1 & sex))  # grab all non-duplicates AND all duplicates that have sex = 1

# Now we can go through the formerly duplicated charge descriptions and start a new column that marks them with further details that would determine expungeability, formatted in the same way as in the duplicated charges Google sheet so we can eventually join the data in the modified master crime list.
chg_mod$extra_criteria <- NA  # initiate this new column with NA values, since most of the charges here don't need further criteria to identify expungeability (can change to empty string if needed)
View(chg_mod[is.na(chg_mod$Expungeable.),])  # View charges that need extra criteria

# Ch. 265 Sec. 26A: We know that kidnapping a minor is expungeable only if the minor was not endangered. Due to this section specifically talking about children, we can interpret "in custody" as a child, as in: in custody of a guardian rather than, say, of police.
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & grepl('kidnapping & endanger', tolower(chg_mod$Charge))] <- 'endangerment'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & grepl('kidnapping', tolower(chg_mod$Charge)) & 
                         !grepl('endanger', tolower(chg_mod$Charge))] <- 'no endangerment'

# Ch. 265 Sec. 37: Civil rights violations with injury are not expungeable
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         grepl('civil', tolower(chg_mod$Charge)) & 
                         grepl('injury', tolower(chg_mod$Charge))] <- 'injury'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         grepl('civil', tolower(chg_mod$Charge)) & 
                         !grepl('injury', tolower(chg_mod$Charge))] <- 'no injury'

# Ch. 266 Sec. 14: Burglary at night — should not be expungeable if done with firearm or assault. Master crime list had some of them mislabeled as expungeable before but we already changed it on the duplicates spreadsheet. 
# TODO: So we have to update this in the modified master crime list in order to join this section back based on just chapter and section.
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         chg_mod$Chapter == '266' & chg_mod$Section == '14' &
                         (grepl(' armed', tolower(chg_mod$Charge)) | grepl('firearm', tolower(chg_mod$Charge)))] <- 'armed'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         chg_mod$Chapter == '266' & chg_mod$Section == '14' &
                         grepl('unarmed', tolower(chg_mod$Charge))] <- 'assault'  # one specifically says "unarmed and assault"

# Ch. 266 Sec. 17: Burglary in daytime or enter at night — armed is not expungeable
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         chg_mod$Chapter == '266' & chg_mod$Section == '17' &
                         grepl('armed', tolower(chg_mod$Charge))] <- 'armed'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         chg_mod$Chapter == '266' & chg_mod$Section == '17' &
                         !grepl('armed', tolower(chg_mod$Charge))] <- 'unarmed'

# Ch. 266 Sec. 18: Burglary in daytime — armed is not expungeable
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         chg_mod$Chapter == '266' & chg_mod$Section == '18' &
                         grepl('armed', tolower(chg_mod$Charge))] <- 'armed'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         chg_mod$Chapter == '266' & chg_mod$Section == '18' &
                         !grepl('armed', tolower(chg_mod$Charge))] <- 'unarmed'

# Ch. 266 Sec. 25: Larceny not expungeable if from elderly person
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         chg_mod$Chapter == '266' & chg_mod$Section == '25' &
                         grepl('65', chg_mod$Charge)] <- 'on elderly'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         chg_mod$Chapter == '266' & chg_mod$Section == '25' &
                         !grepl('65', chg_mod$Charge)] <- 'not on elderly'

# Ch. 272 Sec. 16: ("habitual" lewdness means not the first offense) Not expungeable because if it's the subsequent offense.
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         grepl('lewdness', tolower(chg_mod$Charge)) &
                         (grepl('subsq', tolower(chg_mod$Charge)) | grepl('habitual', tolower(chg_mod$Charge)))] <- 'subsequent'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & 
                         grepl('lewdness', tolower(chg_mod$Charge)) &
                         !(grepl('subsq', tolower(chg_mod$Charge)) | grepl('habitual', tolower(chg_mod$Charge)))] <- 'not subsequent'

# Ch. 272 Sec. 53: Many different charges under this section!
# TODO: Lewdness in this case is inexpungeable according to the crime list, not sure what differentiates from section 16
# Indecent exposure, annoying person of opposite sex, not expungeable
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & chg_mod$Chapter == '272' & chg_mod$Section == '53' & 
                         chg_mod$sex == 1] <- 'sex-related'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) & chg_mod$Chapter == '272' & chg_mod$Section == '53' &
                         chg_mod$sex != 1] <- 'not sex-related'

# Ch. 274 Sec. 6: "Attempt to commit crime" punishable by death or 5-year felony is definitely not expungeable. But this is also a very vague description and we should measure to see how our counts are impacted with and without including this category. There are a lot of cases in both districts where the general "attempt to commit crime" label is used, and this could include more serious inexpungeable crimes.
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) &
                         grepl('attempt to commit crime', tolower(chg_mod$Charge)) & 
                         grepl('death', tolower(chg_mod$Charge))] <- 'punishable by death'
chg_mod$extra_criteria[is.na(chg_mod$Expungeable.) &
                         grepl('attempt to commit crime', tolower(chg_mod$Charge)) & 
                         !grepl('death', tolower(chg_mod$Charge))] <- 'not punishable by death'

# Write to a new CSV
write.csv(chg_mod, 'clean-slate/data/processed/prosecution_charges_detailed.csv')

#### Post- Master Crime List modifications ####
# Now we will get the missing expungeability for charges with extra criteria, using a modified Master Crime List that has also a column for extra criteria.

mclmod <- read.csv('clean-slate/data/raw/ExpungeCategories_mod.csv')  # import modified master crime list (as of 08/26/20)

# Get unique combos of chapter, section, and extra criteria w/ expungeability. We do this because some of the charges on the master crime list have multiple variations with the same chapter, section, and extra criteria. 
# Filter just rows that had extra criteria filled in, since we haven't covered all of the charges on the Master Crime List yet.
# Also filter out rows that have no chapter and section, because those may lead to a false match and the only rows we are concerned about now are ones that had previously been matched by chapter and section.
criteria <- unique(mclmod %>% select(Chapter, Section, extra_criteria, Expungeable.) %>% 
                     filter(extra_criteria != '' & Chapter != ''))  

colnames(criteria)[colnames(criteria) == 'Expungeable.'] <- 'exp2'  # rename this column to avoid mixup with "Expungeable."
chg_mod2 <- chg_mod %>% left_join(criteria)  # join the master crime list data
chg_mod2$Expungeable.[is.na(chg_mod2$Expungeable.)] <- chg_mod2$exp2[is.na(chg_mod2$Expungeable.)]  # add new expungeability data from throwaway column
chg_mod2 <- chg_mod2 %>% select(-exp2)  # remove throwaway column

write.csv(chg_mod2, 'clean-slate/data/processed/prosecution_charges_detailed.csv')
