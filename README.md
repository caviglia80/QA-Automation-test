# Capitole Consulting Technical Assignment

<br>

## Prerequisites

---

- [Node.js] **4.2.x** or above installed.
- Have _Node.js_ installation path added to **PATH** environment variable.

<br>

## Installation

---

All need node packages and its dependencies are specified in the `package.json` file located in the repository root. So all you need is to run the following command from the repository root:

```sh
$ npm install
$ npx playwright install
```

<br>

## Execution

---

If you want to execute the tests, you should type the next command in the terminal:
<br>

FRONT Cypress:

```sh
$ npm run cypress
```

FRONT Playwright:

```sh
$ npm run playwright
```

BACK:

```sh
$ npm run backend
```

When the Cypress UI starts, double click on the test set you want to run, or click on run all specs to run all of them.
You should run the test on chrome browser (normally preselected)
<br>

## FRONTEND - Scenarios of expected tests

---

We want you to create 2 scenarios using the following Cypress and Playwright projects. You can find the details of the expected steps as follows.<br>
About the "way" of programming:<br>
  - use clear variable names<br>
  - avoid as much as possible hardcoding expected results or inputs<br>
  - feel free to comment those functions you might consider not clear enough by its own name<br>
  - add the assertions you may consider<br><br>

- First Scenario - Cypress:<br>
  1. Go to https://capitole-consulting.com/ and make sure language is English<br>
  2. Access to Services<br>
  3. Scroll to "Our areas of expertise"<br>
  4. Verify that "Cucumber" appears in Automated Testing<br>
  5. Verify that "Visual Studio" appears in Programming Tools<br><br>

- Second Scenario - Playwright:<br>
  
  <br>
  Precondition: You are not logged in<br>

  1. Go to http://ecommerce.test.k6.io/<br>
  2. Access to the Home<br>
  3. Press on the first article that has a discount applied to access to the PDP page and verify the article has a discount<br>
  4. Check the item has its proper "Additional information"<br>
  5. Go back to the Home
  6. Press on the first article that doesn't have any discount applied to access to the PDP page and verify the article doesn't have a discounted price<br>
  7. Check the item has its proper "Description"<br><br>


<br>

## BACKEND - Scenarios of expected tests

---

We want you to create 1 scenario using this mocha project and the Axios lib. If you never used Axios before, find the documentation here https://www.npmjs.com/package/axios<br>
You can find the details of the expected steps as follows.<br>

About the "way" of programming:<br>
  - use clear variable names<br>
  - avoid as much as possible hardcoding expected results or inputs<br>
  - feel free to comment those functions you might consider not clear enough by its own name<br>
  - add the assertions you consider<br><br>

- Scenario:<br>
  1. Do a GET on https://test-api.k6.io/public/crocodiles<br>
  2. Verify the number of entries<br>
  3. Check the "Name" and "Date of Birth" values of the 3rd and 7th "entries"<br>
