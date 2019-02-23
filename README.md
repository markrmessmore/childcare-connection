# Child Care Connection
### Mercer County Subsidy Management System

<details>
  <summary>Project setup</summary>
  <p>
    ```
    npm install
    ```

    ### Compiles and hot-reloads for development
    ```
    npm run serve
    ```

    ### Compiles and minifies for production
    ```
    npm run build
    ```

    ### Lints and fixes files
    ```
    npm run lint
    ```
  </p>
</details>
<details>
  <summary>Pertinent Documentation</summary>
  <p>
    * [VueJS Front-end Framework](https://vuejs.org/)
    * [Vuetify Material Design Framework](https://vuetifyjs.com/en/getting-started/quick-start)
    * [Database](https://www.mongodb.com/)
    * [Material Design Icons](https://material.io/tools/icons/)

    ### Customize configuration
    See [Configuration Reference](https://cli.vuejs.org/config/).
  </p>
</details>
<details>
  <summary>App Structure</summary>
  <p>
### THIS APP IS SET UP IN THE FOLLOWING WAY (all files referenced are .vue files):

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
  </p>
</details>
