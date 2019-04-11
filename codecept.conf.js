exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: true,
      waitForNavigation: "networkidle2",
      windowSize: "1024x800"
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'codeceptjs-playground',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    autoLogin: {
      enabled: true,
      saveToFile: true,
      inject: 'login',
      users: {
        user: {
          login: (I) => {
            const username = process.env.USERNAME
            const password = process.env.PASSWORD
            I.amOnPage('https://github.com/login')
            I.fillField('Username or email address', username)
            I.fillField('Password', password)
            I.click('Sign in')
            I.waitUrlEquals('https://github.com') // Sign inを押してから即移動しないため明示的にwait
          },
          check: (I) => {
            I.amOnPage('https://github.com/')
            I.see('Recent activity')
          },
          restore: (I, cookies) => {
            I.amOnPage('https://github.com/')
            I.setCookie(cookies)
          },
        }
      }
    }
 }
}