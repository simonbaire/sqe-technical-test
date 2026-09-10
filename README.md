# SQE Technical Test: API & UI Automation

Test automation for the Swagger Petstore API and the Sauce Demo UI, built with
[Playwright Test](https://playwright.dev/) and TypeScript.

API and UI tests are separated into their own directories and Playwright
"projects" so they can be run, reported on, and reasoned about independently.

## Setup

Requires Node.js 18+.
latest version of Google Chrome installed on the machine.

```bash
npm install
npx playwright install --with-deps chromium
```

## Running the tests

```bash
npm test          # everything (api + ui)
npm run test:api  # Swagger Petstore only
npm run test:ui:headless   # Sauce Demo only
npm run test:ui:headed   # Sauce Demo, in a visible browser window
npm run test:ui:chrome   # Sauce Demo, in your real installed Chrome, slowed down to watch
```

```bash
npm run test:api:api-mode   # API suite in Playwright's interactive UI Mode
npm run test:web:ui-mode    # Sauce Demo suite in Playwright's interactive UI Mode
npx playwright test --project=ui --debug   # step through with the Inspector
```

Both suites run against the public hosted demo services
(`https://petstore.swagger.io` and `https://www.saucedemo.com`)

## Reporting

An HTML report is generated on every run:

```bash
npm run report
```

The default `list` reporter also prints a console summary as tests run.

## Design notes

- **API tests** use Playwright's built in `request` fixture. No extra HTTP
  client is needed.
- **UI tests** use the Page Object Model so element locators live in one
  place per page and the test bodies read as user facing steps.
- Each spec file contains one required scenario.