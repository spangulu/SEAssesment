import { Given, When, Then } from '@cucumber/cucumber';
import { TestContext } from "../support/world";
import { BBCResultsPage } from '../pages/bbcResultsPage';

let resultsPage: BBCResultsPage;

Given('I open the BBC Sport Formula 1 results homepage', async function (this: TestContext) {
  resultsPage = new BBCResultsPage(this.page!);
  await resultsPage.openFormula1Home();
});

When('I select the {string} tab for Formula 1', async function (this: TestContext, tabName: string) {
  await resultsPage.openSeasonTab(tabName);
});

When('I choose the {string} season', async function (this: TestContext, year: string) {
  await resultsPage.selectSeason(year);
});

When('I open the {string} results page', async function (this: TestContext, raceName: string) {
  await resultsPage.openRaceResultsPage(raceName);
  await resultsPage.debugPrintResultsPreview();
});

Then('the top 3 finishers should appear at the top of the race results table:', async function (this: TestContext, dataTable) {
  const expected = dataTable.hashes();
  await resultsPage.verifyDriverPositions(expected);
});

Then('the team names for these drivers should be correctly listed as:', async function (this: TestContext, dataTable) {
  const expectedTeams = dataTable.hashes();
  await resultsPage.verifyDriverTeams(expectedTeams);
});
