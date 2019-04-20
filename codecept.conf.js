const debug = process.env.DEBUG ? true : false

exports.config = {
  tests: './tests/**/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: debug ? true : false,
      waitForNavigation: "networkidle2",
      windowSize: "1024x800"
    }
  },
  include: {
    I: './steps_file.js',
    topPage: './pages/top.js'
  },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      "codeceptjs-cli-reporter": {
        "stdout": "-",
        "options": {
          // "verbose": true,
          // "steps": true,
        }
      },
      "mocha-junit-reporter": {
        "stdout": "-",
        "options": {
          "mochaFile": "./output/result.xml"
        },
        "attachments": true //add screenshot for a failed test
      }
    }
  },
  name: 'codeceptjs-playground',
  multiple: {
    parallel: {
      chunks: 2
    }
  },
  plugins: {
    allure: {
      enabled: true
    },
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
            if (!username || !password) throw 'Env USERNAME or PASSWORD are null!!'
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