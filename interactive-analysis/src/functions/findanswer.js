/* Given an all-incident code and the incident categories associated with a specific question, this function returns:
0 if the individual is never eligible
1 if the individual is eligible today and has no missing data
2 if the individual is eligible today but has some missing disposition data
3 if the individual will become eligible in the future and has no missing data
4 if the individual will become eligible in the future but has some missing disposition data */
function determineEligibility(allIncidentCode, categories, maxEvents){
  // deep copy of categories is made so changes to categoryList do not affect categories
  let categoryList = [...categories.map(category => [...category])];
  // incidents is an array of strings, each of which is a 6-digit single-incident code taken from the all-incident code
  let incidents = allIncidentCode.match(/.{6}/g);
  let eligibleToday = true;
  let missingDispo = false;
  let categoryFound = false;

  // If total max incidents is exceeded, individual is ineligible
  if(incidents.length > maxEvents){
    return 0;
  }

  for(let incident of incidents) {
    if(incident[5] === '1'){
      eligibleToday = false;
    }
    if(incident[4] === '1'){
      missingDispo = true;
    }

    for(let category of categoryList){
      let categoryRegex = new RegExp('^' + category[1]);
      if(categoryRegex.test(incident)){
        categoryFound = true;
        // The focused incident matches the focused category; decrement the category allotment
        category[0] = category[0] - 1;
        if (category[0] < 0) {
          // If any category exceeds its allotment, this individual is never eligible
          return 0;
        }
      }
    }
    // If the incident does not belong to any of the given categories, this individual is never eligible
    if(!categoryFound){
      return 0;
    }
    // Reset categoryFound before continuing to the next category
    categoryFound = false;
  }
  // If this point is reached, the individual is eligible, but may still need to wait for the 3 or 7 years to pass
  if(eligibleToday && !missingDispo){
    return 1;
  }
  if(eligibleToday && missingDispo){
    return 2;
  }
  if(!eligibleToday && !missingDispo){
    return 3;
  }
  if(!eligibleToday && missingDispo){
    return 4;
  }
  // This point should never be reachable
  return -1;
}


export default async function findAnswer(question, hubSettings){
  let answerDf;

  // Choose the right data file to use based on the question's region
  switch(hubSettings.region){
    case 'nw':
      answerDf = window.nw;
      break;
    case 'sf':
      answerDf = window.sf;
      break;
    case 'ms':
      answerDf = window.ms;
      break;
    default:
      answerDf = window.nw;
      break;
  }

  // If the user has selected to analyze only a subset of the data based on age categorization,
  // pare the dataframe down to contain only that subset of individuals
  switch(hubSettings.ageCategory){
    case 'onlyJuvenile':
      answerDf = answerDf.where(row => row['Age Category'] == '0');
      break;
    case 'onlyAdult':
      answerDf = answerDf.where(row => row['Age Category'] == '2');
      break;
    default:
      break;
  }

  const totalIndividuals = answerDf.count();

  answerDf = answerDf.generateSeries({
    Result: row => determineEligibility(row['All Incident Codes'], question.categories, question.maxEvents)
  });

  const eligibleNever = answerDf.where(row => row['Result'] === 0).count();
  const eligibleTodayComplete = answerDf.where(row => row['Result'] === 1).count();
  const eligibleTodayIncomplete = answerDf.where(row => row['Result'] === 2).count();
  const eligibleLaterComplete = answerDf.where(row => row['Result'] === 3).count();
  const eligibleLaterIncomplete = answerDf.where(row => row['Result'] === 4).count();

  const eligibleToday = eligibleTodayComplete + eligibleTodayIncomplete;
  const eligibleLater = eligibleLaterComplete + eligibleLaterIncomplete;
  const eligibleAnytime = eligibleToday + eligibleLater;

  let answer = {
    EligibleAnytime: {
      individuals: eligibleAnytime, 
      percentOfTotal: Math.round((eligibleAnytime / totalIndividuals) * 100)
    },
    EligibleNever: {
      individuals: eligibleNever, 
      percentOfTotal: Math.round((eligibleNever / totalIndividuals) * 100)
    },
    EligibleToday: {
      individuals: eligibleToday, 
      percentOfTotal: Math.round((eligibleToday / totalIndividuals) * 100), 
      percentOfEligibleAnytime: Math.round((eligibleToday / eligibleAnytime) * 100)
    },
    EligibleTodayComplete: {
      individuals: eligibleTodayComplete, 
      percentOfEligibleToday: Math.round((eligibleTodayComplete / eligibleToday) * 100)
    },
    EligibleTodayIncomplete: {
      individuals: eligibleTodayIncomplete, 
      percentOfEligibleToday: Math.round((eligibleTodayIncomplete / eligibleToday) * 100)
    },
    EligibleLater: {
      individuals: eligibleLater, 
      percentOfTotal: Math.round((eligibleLater / totalIndividuals) * 100), 
      percentOfEligibleAnytime: Math.round((eligibleLater / eligibleAnytime) * 100)
    },
    EligibleLaterComplete: {
      individuals: eligibleLaterComplete, 
      percentOfEligibleLater: Math.round((eligibleLaterComplete / eligibleLater) * 100)
    },
    EligibleLaterIncomplete: {
      individuals: eligibleLaterIncomplete, 
      percentOfEligibleLater: Math.round((eligibleLaterIncomplete / eligibleLater) * 100)
    },
  }

  return answer;
}