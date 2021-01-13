export default async function findAnswer(question, hubSettings){
  let answerDf = window.nw;
  let answer;
  let totalIndividuals;
  
  if(hubSettings.onlyJuveniles){
    totalIndividuals = answerDf.where(row =>
      parseInt(row['Age at Offense']) <= parseInt(question.maxAge)
    )
    .distinct(row => row['Person ID'])
    .count();
  } else {
    totalIndividuals = answerDf.distinct(row => row['Person ID']).count();
  }

  if(question.eventType === 'offenses'){
    // IF OFFENSES ARE BEING CONSIDERED
    // Alter dataframe to only contain individuals with no more offenses than the max allowed by the question
    answerDf = answerDf.where(row =>
      question.maxEvents === '' ||
      parseInt(row['Total Offenses per Person']) <= question.maxEvents
    );

    // Alter dataframe to only contain offenses that are eligible under the question criteria
    answerDf = answerDf.where(row =>
      (question.ineligibleIneligible === false ||
      row['Expungeable'] !== 'No') &&
      (question.guiltyIneligible === false ||
      row['guilty'] === 'False') &&
      (question.sexIneligible === false ||
      row['sex'] === '0') &&
      (question.murderIneligible === false ||
      row['murder'] === '0') &&
      (question.maxAge === '' ||
      parseInt(row['Age at Offense']) <= parseInt(question.maxAge))
    );

    // Alter dataframe to contain one row per unique individual, with these columns:
    // 'Person ID', 'Total Offenses', 'Eligible Offenses'
    answerDf = answerDf
    .groupBy(row => row['Person ID'])
    .select(group => ({
      'Person ID': group.first()['Person ID'],
      'Total Offenses': group.first()['Total Offenses per Person'],
      'Eligible Offenses': group.deflate(row => row['Person ID'])
        .count(),
    }))
    .inflate();

    // Alter dataframe to contain only individuals with no more ineligible offenses than allowed by the question criteria
    answerDf = answerDf.where(row =>
      question.maxIneligibleEvents === '' ||
      (parseInt(row['Total Offenses']) - row['Eligible Offenses']) <= question.maxIneligibleEvents
    );

    // The dataframe now contains one row for each eligible individual
    answer = answerDf.count();


  } else{
    // IF INCIDENTS ARE BEING CONSIDERED
    // Alter dataframe to only contain individuals with no more incidents than the max allowed by the question
    answerDf = answerDf.where(row =>
      question.maxEvents === '' ||
      parseInt(row['Incidents per Person']) <= question.maxEvents
    );

    // Alter dataframe to only contain incidents that are eligible under the question criteria
    answerDf = answerDf.where(row =>
      (question.ineligibleIneligible === false ||
      row['Inc_Expungeable_Attempts_Are'] === 'True') &&
      (question.guiltyIneligible === false ||
      row['Incident_Guilty_or_missing'] === 'False') &&
      (question.sexIneligible === false ||
      row['Incident Sex'] === '0') &&
      (question.murderIneligible === false ||
      row['Incident Murder'] === '0') &&
      (question.maxAge === '' ||
      parseInt(row['Age at Offense']) <= parseInt(question.maxAge))
    );

    // Alter dataframe to contain one row per unique individual, with these columns:
    // 'Person ID', 'Total Incidents', 'Eligible Incidents'
    answerDf = answerDf
    .groupBy(row => row['Person ID'])
    .select(group => ({
      'Person ID': group.first()['Person ID'],
      'Total Incidents': group.first()['Incidents per Person'],
      'Eligible Incidents': group.deflate(row => row['Offense Date'])
        .distinct()
        .count(),
    }))
    .inflate();

    //console.log(answerDf.toString());

    // Alter dataframe to contain only individuals with no more ineligible offenses than allowed by the question criteria
    answerDf = answerDf.where(row =>
      question.maxIneligibleEvents === '' ||
      (parseInt(row['Total Incidents']) - row['Eligible Incidents']) <= question.maxIneligibleEvents
    );

    // The dataframe now contains one row for each eligible individual
    answer = answerDf.count();
  }

  // Determine the percentage answer
  const percentageAnswer = Math.round((answer / totalIndividuals) * 100);

  // Return the answer and percentage answer
  return [answer, percentageAnswer];
}