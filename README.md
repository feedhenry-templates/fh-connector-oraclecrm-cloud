FORMAT: 1A

# Oracle Fusion CRM Connector API

The Oracle Fusion CRM FeedHenry Connector API. 

# Group Oracle Fusion CRM Connector API

# List Accounts [/cloud/listAccounts]

List Oracle Fusion CRM Accounts

## List Accounts [POST]

+ Request (application/json)

    + Body

            {
              "parse": true,
              "session": "f6Wo2zYcIUUsL2WgTLpyzrcv"
            }

+ Response 200 (application/json)

      + Body

            {
              "done":true,
              "records":[{
                "Id": "000000000000001",
                "AccountNumber": "0001",
                "Industry": "Enterprise Mobility",
                "Name": "FeedHenry",
                "Rating": "1",
                "Website": "http://www.feedhenry.com",
                "Type": "ORGANIZATION",
                "BillingStreet": "Unit 3B Cleaboy Industrial Estate",
                "BillingCity": "Waterford",
                "BillingState": "n/a",
                "BillingPostalCode": "000000",
                "BillingCountry": "IRL",
                "Phone": "+353 51 000 000",
                "attributes": {
                  "type": "Account",
                  "url": "/"
                }
              }],
              "totalSize":1
            }

# Get Account Details [/cloud/getAccountDetails]

Get Oracle Fusion CRM Account

## Get Account Details [POST]

+ Request (application/json)

    + Body

            {
              "accountId": "",
              "auth": {
                "instanceUrl": "",
                "accessToken": ""
              }
            }

+ Response 200 (application/json)

      + Body

            {
              "account": ["TODO"]
            }


# List Cases [/cloud/listCases]

List Oracle Fusion CRM Cases

## List Cases [POST]

+ Request (application/json)

    + Body

            {
              "accessToken": "",
              "instanceUrl": "" 
            }

+ Response 200 (application/json)

      + Body

            {
              "cases": ["TODO"]
            }

# Get Case Details [/cloud/getCaseDetails]

Get Oracle Fusion CRM Case

## Get Case Details [POST]

+ Request (application/json)

    + Body

            {
              "accountId": "",
              "auth": {
                "instanceUrl": "",
                "accessToken": ""
              }
            }

+ Response 200 (application/json)

      + Body

            {
              "account": ["TODO"]
            }


# List Campaigns [/cloud/listCampaigns]

List Oracle Fusion CRM Campaigns

## List Campaigns [POST]

+ Request (application/json)

    + Body

            {
              "accessToken": "",
              "instanceUrl": "" 
            }

+ Response 200 (application/json)

      + Body

            {
              "Campaigns": ["TODO"]
            }
