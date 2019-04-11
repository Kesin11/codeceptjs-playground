/// <reference path="./steps.d.ts" />

Feature('GitHub')

Before(login => {
  login('user')
})

Scenario('Pull Requests', (I) => {
  I.amOnPage('https://github.com/')
  I.click('Pull requests')
  I.seeInTitle('Pull Requests')
})

Scenario('Issue', (I) => {
  I.amOnPage('https://github.com/')
  I.click('Issue')
  I.seeInTitle('Issue')
})

Scenario('Search repository', (I) => {
  I.amOnPage('https://github.com/')
  I.click('input.header-search-input')
  I.fillField('input.header-search-input', 'codeceptjs')
  I.pressKey('Enter')

  I.see('Codeception/CodeceptJS')
  I.click('Codeception/CodeceptJS')

  I.see('CodeceptJS')
})

