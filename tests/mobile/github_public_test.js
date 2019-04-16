/// <reference path="../../steps.d.ts" />

Feature('GitHub public mobile').retry(2)

Before((I) => {
  I.resizeWindow(375, 667)
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
  I.click('div.d-flex.flex-items-center > button')
  I.fillField('input.header-search-input', 'codeceptjs')
  I.pressKey('Enter')

  // Search result page
  I.see('Codeception/CodeceptJS')
  I.click('Codeception/CodeceptJS')

  // Repo page
  I.seeCurrentUrlEquals('https://github.com/Codeception/CodeceptJS')
})

Scenario('Search me', (I, topPage) => {
  I.click('div.d-flex.flex-items-center > button')
  I.fillField('input.header-search-input', 'Kesin11')
  I.pressKey('Enter')

  // Search result page
  I.scrollTo('div.overflow-auto > a:nth-child(8)')
  I.click('div.overflow-auto > a:nth-child(8)')

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
