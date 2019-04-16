/// <reference path="../../steps.d.ts" />

Feature('GitHub public').retry(2)

Before((I) => {
  I.amOnPage('https://github.com/')
})

Scenario('Top page', (I) => {
  I.see('Sign up')
})

Scenario('Trending', (I) => {
  I.amOnPage('https://github.com/trending')
  I.see('Trending')
  // リスト要素があること
})

Scenario('Search codeceptjs repository', (I, topPage) => {
  topPage.search('codeceptjs')

  // Search result page
  I.see('Codeception/CodeceptJS')
  I.click('Codeception/CodeceptJS')

  // Repo page
  I.seeCurrentUrlEquals('https://github.com/Codeception/CodeceptJS')
})

Scenario('Search me', (I, topPage) => {
  topPage.search('Kesin11')

  // Search result page
  I.click('Users')

  // Search result user page
  // locate only search result list elements
  within('#user_search_results', () => {
    I.see('Kesin11')
    I.click('Kesin11')
  })

  // My profile page
  I.seeCurrentUrlEquals('https://github.com/Kesin11')
})

Scenario('My profile page', (I) => {
  I.amOnMyProfile()

  I.see('Sign up')
  I.see('Block or report user')
})
