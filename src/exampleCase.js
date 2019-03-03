//CCC-NJ MERCER CO. SUBSIDY MGMT SYSTEM - DATA STRUCTURE

export default [
  {
    caseId      : 99999,
    caseStatus  : [
      {
        status: "Active",
        date  : "02/10/2019"
      }
    ],       //COULD BE: APPROVED WITH CONDITIONS, REACTIVATED, APPROVED, PENDING, INELIGIBLE, WAITING LIST OR RECEIVED - NOT YET REVIEWED.
    activeDate  : "02/01/2019",
    endDate     : "01/31/2020",
    familyInfo  : {
      address     : "555 Oak Ave.",
      address2    : "",
      city        : "Trenton",
      state       : "NJ",
      zip         : "08601",
      homephone   : "777-777-7777",
      cellphone   : "444-444-4444",
      numAdults   : 1,
      numKids     : 2,
      applicant   : {
        firstName             : "John",
        midInitial            : "H",
        lastName              : "Smith",
        ssn                   : "000000000",
        appRelation           : "Father",
        income    : [
          {
            title   : "Wages & Salary",
            weekly  : 0,
            biWeekly: 0,
            monthly : 2000,
            annually: 0,
            total   : 0
          },
          {
            title: "Pension/Retirement/Supplemental/Social Security",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title   : "Unemployment/Worker's Comp.",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title   : "Public Assistance/TANF",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title   : "Child Support/Alimony",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title   : "Other Income",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          }
        ],
        primaryWork : {
          locationName        : "NJ Lawn Care", //NAME OF THE LOCATION
          type                : "Work",         //CLASSIFICATION: WORK, SCHOOL OR TRAINING PROGRAM
          address             : "123 Main St.",
          city                : "Trenton",
          state               : "NJ",
          zip                 : "08602",
          phone               : "3333333333",
          phoneext            : "",             //PHONE EXTENSION IF APPLICABLE
          startDate           : "01/01/2019",
          status              : "Full Time",    //FULL TIME/PART TIME/SEASONAL
          hoursPerWeek        : 40,           //HOURS PER WEEK
          monthsPerYear       : 12,           //MONTHS PER YEAR
        },
        secondaryWork : {
          locationName        : "Ottowa St. Technical College", //NAME OF THE LOCATION
          type                : "Training Program",         //CLASSIFICATION: WORK, SCHOOL OR TRAINING PROGRAM
          address             : "458 Elm St.",
          city                : "Trenton",
          state               : "NJ",
          zip                 : "08603",
          phone               : "2222222222",
          phoneext            : "44",            //PHONE EXTENSION IF APPLICABLE
          startDate           : "09/09/2018",
          status              : "Part Time",    //FULL TIME/PART TIME/SEASONAL
          hoursPerWeek        : 8,              //HOURS PER WEEK
          monthsPerYear       : 8,              //MONTHS PER YEAR
        }
      },
      coapplicant   : {
        firstName             : "",
        midInitial            : "",
        lastName              : "",
        ssn                   : "",
        appRelation           : "",
        income    : [
          {
            title   : "Wages & Salary",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title: "Pension/Retirement/Supplemental/Social Security",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title   : "Unemployment/Worker's Comp.",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title   : "Public Assistance/TANF",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title   : "Child Support/Alimony",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          },
          {
            title   : "Other Income",
            weekly  : 0,
            biWeekly: 0,
            monthly : 0,
            annually: 0,
            total   : 0
          }
        ],
        primaryWork  : {
          locationName        : "",               //NAME OF THE LOCATION
          type                : "",               //CLASSIFICATION: WORK, SCHOOL OR TRAINING PROGRAM
          address             : "",
          city                : "",
          state               : "",
          zip                 : "",
          phone               : "",
          phoneext            : "",             //PHONE EXTENSION IF APPLICABLE
          startDate           : "",
          status              : "",             //FULL TIME/PART TIME/SEASONAL
          hoursPerWeek        : null,           //HOURS PER WEEK
          monthsPerYear       : null,           //MONTHS PER YEAR
        },
        secondaryWork : {
          locationName        : "",             //NAME OF THE LOCATION
          type                : "",             //CLASSIFICATION: WORK, SCHOOL OR TRAINING PROGRAM
          address             : ".",
          city                : "",
          state               : "",
          zip                 : "",
          phone               : "",
          phoneext            : "",             //PHONE EXTENSION IF APPLICABLE
          startDate           : "",
          status              : "",             //FULL TIME/PART TIME/SEASONAL
          hoursPerWeek        : null,           //HOURS PER WEEK
          monthsPerYear       : null,           //MONTHS PER YEAR
        }
      },
      children    : [                           //ABILITY TO ADD AS MANY AS NEEDED
        {
          childId             : 1,
          lastName            : "Smith",
          midInitial          : "Q",
          firstName           : "Elizabeth",
          gender              : "Female",
          ssn                 : "222222222",
          dob                 : "04152014",
          age                 : 4,
          typeOfCare          : "Full Day"      //FULL DAY/BEFORE SCHOOL/AFTER SCHOOL/SUMMER CAMP/NONE
        },
        {
          childId             : 2,
          lastName            : "Smith",
          midInitial          : "Q",
          firstName           : "Levi",
          gender              : "Male",
          ssn                 : "111-22-3333",
          dob                 : "08182012",
          age                 : 6,
          typeOfCare          : "After School"      //FULL DAY/BEFORE SCHOOL/AFTER SCHOOL/SUMMER CAMP/NONE
        }
      ],
    },
    notes: [                                      //ABILITY TO ADD AS MANY AS NEEDED
      {
        date            : "1/26/2019",
        text            : "John faxed in the application."
      }
    ],
    providers: [                                  //ABILITY TO ADD AS MANY AS NEEDED
      {
        name              : "ABC Childcare",
        federalId         : "11111-11",
        licenseNum        : "11111111",
        typeOfProvider    : "Licensed Center",    //COULD BE LICENSED CENTER OR REGISTERED FAMILY CHILD CARE
        typeOfCare        : "Full Day",         //COULD SELECT MULTIPLE: FULL DAY, BEFORE SCHOOL, AFTER SCHOOL, SUMMER CAMP
        address           : "987 6th St.",
        address2          : "Suite 201",
        city              : "Trenton",
        state             : "NJ",
        zip               : "08638",
        phone             : "9876543210",
        papaStart         : "2/1/2019",
        papaEnd           : "1/31/2019",
        monthlyAmt        : 300,
      },
      {
        name              : "Little Einsteins",
        federalId         : "2222-11",
        licenseNum        : "222222",
        typeOfProvider    : "Registered Family Child Care",    //COULD BE LICENSED CENTER OR REGISTERED FAMILY CHILD CARE
        typeOfCare        : "After School",
        address           : "441 8th St.",
        address2          : "",
        city              : "Trenton",
        state             : "NJ",
        zip               : "08642",
        phone             : "9874443333",
        papaStart         : "2/1/2019",
        papaEnd           : "1/31/2019",
        monthlyAmt        : 75
      }
    ],
    attendance: [
      {
        child             : "Elizabeth",
        facility          : "ABC Childcare",
        month             : "February",
        attendance        : 20,
        amount            : 300,
      },
      {
        child             : "Levi",
        facility          : "Little Einsteins",
        month             : "February",
        attendance        : 24,
        amount            : 75,
      }
    ]
  }
]
