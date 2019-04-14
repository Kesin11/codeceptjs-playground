/// <reference path="../steps.d.ts" />

let repositories = new DataTable(['searchWord', 'orgReponame']); //
repositories.add(['codeceptjs', 'Codeception/CodeceptJS'])
repositories.add(['selenium', 'SeleniumHQ/selenium'])
repositories.add(['puppeteer', 'GoogleChrome/puppeteer'])

Feature('GitHub search using DataTable')

// Use special param `current` to get current data set
Data(repositories).Scenario('Search repositories', (I, current) => {
  I.amOnPage('https://github.com/')
  I.click('input.header-search-input')
  I.fillField('input.header-search-input', current.searchWord)
  I.pressKey('Enter')

  // Search result page
  within('ul.repo-list', () => {
    I.see(current.orgReponame)
    I.click(current.orgReponame)
  })

  // Repo page
  I.seeCurrentUrlEquals(`https://github.com/${current.orgReponame}`)
})
