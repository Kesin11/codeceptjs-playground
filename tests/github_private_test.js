/// <reference path="../steps.d.ts" />

Feature('GitHub private')

Before(login => {
  login('user')
})

Scenario('My Pull Requests', (I) => {
  I.amOnPage('https://github.com/')
  I.click('Pull requests')

  I.seeCurrentUrlEquals('https://github.com/pulls')
  I.seeInTitle('Pull Requests')
})

Scenario('My Issue', (I) => {
  I.amOnPage('https://github.com/')
  I.click('Issue')

  I.seeCurrentUrlEquals('https://github.com/issues')
  I.seeInTitle('Issue')
})

Scenario('My profile page', (I) => {
  I.amOnMyProfile()

  I.dontSee('Sign up')
  I.dontSee('Block or report user')
})

