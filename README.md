# Child Care Connection
### Mercer County Subsidy Management System

#### Project setup:
Downloading and installing the package for use:
```
git clone https://github.com/markrmessmore/childcare-connection.git
cd childcare-connection
npm install
```
#### Compiling and hot-reloading for development:
```npm run serve```

#### Compiling and minifying for production:
```npm run build```

#### Linting files:
```npm run lint```

#### Pertinent Documentation:
* [VueJS Front-end Framework](https://vuejs.org/)
* [Vuetify Material Design Framework](https://vuetifyjs.com/en/getting-started/quick-start)
* [Google Firebase](https://firebase.google.com/)
* [Material Design Icons](https://material.io/tools/icons/)

#### Customize configuration
* See [Configuration Reference](https://cli.vuejs.org/config/).

#### App Structure
##### THIS APP IS SET UP IN THE FOLLOWING WAY (all files referenced are .vue files):

+ Everything in the `/src/components/directory` is a file with a ROUTE in router.js
+ Everything in the `/src/components/sub-components/` directory is NOT a routed file and instead is included within another component

App
- home
- about
- dashboard*
  - admin*
    - users
  - newCase*
    - caseInfo*
      - familyInfo
      - providerInfo
      - attendanceLog
      - notes
      - letters
  - searchCase*
    - editCase
      - caseInfo
        - familyInfo
        - providerInfo
        - attendanceLog
        - notes
        - letters

`* = this component and all sub-components require login permissions to access`
