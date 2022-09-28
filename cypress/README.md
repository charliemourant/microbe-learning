# Cypress UI Test Template

## Introduction
This UI automation test template provides a basic set of tests to continue building the rest of
the tests from as more features are added to the site.

The template tests should be removed/updated once the new site is created and new tests must
be added each time a new feature is created or an existing feature is updated.

If the site will not be using Cypress for the UI testing then the Cypress folder, environment files,
and any other mentions of Cypress, e.g. in `package.json` or the environment files, should
be removed.

## Authentication
### Standard
If the site will not be using the global login or is not a backoffice site then the `loginUi`
command can be removed as it not required.

The tests will need to implement whatever method of authentication is required for the test user
to enter the site.

The `reservation portal ui` repository has an example of this type of login.

### Global Login
If the site will be using the global login or is a backoffice site then the `loginUI` command will
need to be used to log into the site. The cypress library for social logins will need to be added
to the `package.json` file. The files with `.global.login` suffix can be renamed and replace the
existing files with the similar names.

The `ecom booking portal` and `passport pass management` repositories have an example of this type of login.

## CI/CD Pipeline
If the site will be part of the CI/CD pipeline then the UI tests will need to be included in the
pipeline configuration.

The `ecom booking portal` and `reservation portal ui` repositories have examples of the configuration
required.

For each of the environments `cypress.env.json` files will need to be created and encrypted using
GPG with the correct encryption key. The pipeline configuration will use these files during
the various stages of the pipeline.

All or some of the following files will be needed, depending on the pipeline configuration required
for the site.
* `cypress.dev.json.gpg`,
* `cypress.ext.json.gpg`,
* `cypress.sit.json.gpg`,
* `cypress.prod.json.gpg`

## Local running
To run the tests locally you will need to copy and rename the `cypress.env.example.json` file
to `cypress.env.json`, updating any values required by the new site. By changing the values in that
file you can run against any other environment, e.g. dev or sit, if you want to verify your changes
before pushing.

Once this is done you will need to start the sites local server, usually `npm run dev`, and then
`npm run cypress:open` to start the Cypress UI.

If you want to run the tests without the Cypress UI then you can use
`npm run cypress:run` or `CYPRESS_INCLUDE_TAGS=modal npm run cypress:run` if you want to run only
tests tagged with a specific name.
