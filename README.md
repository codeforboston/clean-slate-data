# Clean Slate

_Expungement with Citizens for Juvenile Justice, Code for Boston, and legal aid services._

**Expungement:** "Having a criminal record expunged means that the record will be permanently destroyed so that it's no longer accessible by the court or any other state, municipal, or county agencies." - https://www.mass.gov/expunge-your-criminal-record

_Note: Expungement is different than sealing_

## What’s Wrong

Our criminal record system is broken. If you ever got convicted of a crime or arraigned (brought to court for a criminal charge), even if it turns out someone made a mistake, you’ll have a criminal record. **Even something false or small can stop you from getting honest work, housing, education, and other opportunities.** It will show up on background checks when applying for jobs, housing, schools, loans and much more. You can find more information from [Find out if you can expunge your criminal record](https://www.mass.gov/info-details/find-out-if-you-can-expunge-your-criminal-record#who-can-expunge-their-record?-)

Massachusetts expungement laws were created in October of 2018, but almost no one can qualify and applying is hard. Sometimes it’s even a bad idea to expunge your records and people don’t know.
**[Citizens For Juvenile Justice](https://www.cfjj.org/) (CFJJ)** is working with [Code for Boston](https://www.codeforboston.org/) (a civic tech volunteer organization) and legal aid services in the Boston area to tackle this problem on a project called Clean Slate.

---

## Goal

---

### High Level

Our goal is to analyze existing data to find the best way to change policies so that expungement is more accessible to those who deserve it.

1. Make it easier for folks to apply for expungement.
1. Show what parts of the law are stopping most people from expunging their records.
1. Digitally organize to advocate for changes to the law.

&nbsp;

### Questions to Answer

We are working with Cititzens for Juvenile Justice (CFJJ) and we're helping to answer the following questions and specifically for those with criminal charges under 21 (for all questions - only concerned with those under 21).

1. **Find all the individuals who are eligible for expungement under our current policies.** Expungement is possible only for those with only one charge AND the charge must not be part of the list of ineligible offenses
2. How many would be eligible for expungment if we increase the number of charges allowed AND all charges not being part of the list of ineligible offenses

3. How many would be eligible for expungement if we allow eligibility to all charges except sex-based offenses or murder. How many would be eligible if we compare allowing only one charge vs multiple charges

4. How many would be eligible if we limit eligibility to those who have not been found guilty AND charges are not part of ineligible offenses. How many would be eligible if we compare allowing only one charge vs multiple charges
5. How many would be eligible if we limit eligibility to those who have not been found guilty and all charges except sex-based offenses or murder

Initial questions from CFJJ can be found in our github issues at [Questions for CFJJ for MA Prosecution Dataset](https://github.com/codeforboston/clean-slate/issues/152)

&nbsp;

### Overview of Repo

1. folders and files

- ISSUE_TEMPLATE: document templates for creating ticketing and documentation files ( we are not using this at the moment, should this still exist?)
- analysis - analysis and visualization of data
- data - raw, processed and cleaned data
- docs - books and pdfs for more background on the topic (these should be moved to google drive shared folders)
- scrapers - scrapers for getting publicly available crime related data
- utils - general scripts and files for cleaning and analyzing data ( this is currently empty, should we combine this with scraper folder?)

1. [Issues](https://github.com/codeforboston/clean-slate/issues) - take a look at our outstanding issues to get a sense of what we are working on what you would like to help with if you'd like to contribute
2. [Wiki](https://github.com/codeforboston/clean-slate/wiki) - more in-depth information on our project and information about our data and how we are analyzing it.

&nbsp;

### Current Stage

- Go over numbers from Northwestern District \*\*where is this exactly with CFJJ and understand priorities given results of analysis
- Middlesex and Suffolk county data do not have enough information on individual-level identifiers such as age so we can't answer questions about eligibility completely. Need to ask CFJJ how helpful approximations will be
- We need to ask CFJJ clarifying question about not guilty disposition and how they should be categorized
- Working on cleaning up documentation so on-boarding members is easier
- Generating our preliminary report so we can present and go over analysis with CFJJ

Details of can be found in our [Data questions and to-dos](https://docs.google.com/document/d/1vCSLZRlULW2NWgqU5PxA0ByAK007epukdnADk0nnZ5E/edit#) google doc

&nbsp;

### More Resources

For more information visit [Huge document about both expungement and sealing](https://www.gbls.org/sites/default/files/2019-04/know-your-cori-rights-041819.pdf) (See item #14) created by [Greater Boston Legal Services](https://gbls.org/).

---

## Get Involved

---

We need members of the community, legal professionals, community advocates, project managers, designers, technologists, and people passionate about criminal justice reform to help us understand what’s wrong with what we have and to try to make it better.

- Join and attend [Code for Boston Meetup](https://www.meetup.com/Code-for-Boston/) and attend Weekly Virutal Hack Night every Tuesday to learn more about our project and become a contributing member

- Contact us by [filling out our interest form](https://forms.gle/FZrBfNjC6JNtsQXP7).

We meet and communicate through slack. We use google drive for storing pdf and meeting notes, todo lists, and external resources. We use github for storing data, and process / analyze using python and jupyter notebook.

- Join the [Code for Boston slack](https://communityinviter.com/apps/cfb-public/code-for-boston) and talk to us on the #clean-slate channel. We use this for communicating and holding our weekly virtual hack work sessions.

- Look at what we’ve done so far - we’re collecting what we learn in [shared folders](https://drive.google.com/drive/folders/1EiEt97817QzZNip9X5yrsXAdPCqUdF0M?usp=sharing) on google drive.
- Please check out our CONTRIBUTING.md file if you want to contribute to development.
- We just started using our [github issues](https://github.com/codeforboston/clean-slate/issues) to keep track of our issues and tasks. Our [github wiki](https://github.com/codeforboston/clean-slate/wiki) contains notes on the policy impact data analysis efforts. We have a separate offshoot team that works on our online [juvenile sealing app](https://github.com/knod/docassemble-juvenilesealing).It's on a separate github repo that's currently under development.

- If interested in Data Team, read the [Data Work](https://github.com/codeforboston/clean-slate/wiki/Data-Work) section of this Wiki.
  If interested in App Team, read the [App Team](https://github.com/codeforboston/clean-slate/wiki/App-Team) section of this Wiki.
