FORMAT: 1A

# Oracle Fusion CRM Connector API

The Oracle Fusion CRM FeedHenry Connector API. 

# Group Oracle Fusion CRM Connector API

# Login [/cloud/login]

The login service exposes Oracle Fusion CRM login directly, when not using FH AAA Authentication.

## Login [POST] 

Login to Oracle Fusion CRM

+ Request (application/json)

    + Body
            {
              "username": "user1",
              "password": "password1"
            }

+ Response 200 (application/json)

      + Body
            {
              "status": "TODO - accesstoken or something returned??"
            }

# List Accounts [/cloud/listAccounts]

List Oracle Fusion CRM Accounts

## List Accounts [POST]

+ Request (application/json)

    + Body

            {
              "accessToken": "",
              "instanceUrl": "" 
            }

+ Response 200 (application/json)

      + Body

            {
              "accounts": ["TODO"]
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

# Group Push Topics

Registering a new Oracle Fusion CRM Push Topic to listen for. Part of the Oracle Fusion CRM connector is the ability to set up Push Notifications based on an existing topic defined by a developer in Oracle Fusion CRM. To define such a topic - in this example, changes to the Account object: 

1. Log into Oracle Fusion CRM

2. Click username - > Developer Console (pops up)

3. In dev console popup, Debug -> Open Annon Execute Window

4. Enter this code, and click execute - you have registered a push topic. Change query to alter data that comes back.

    PushTopic pushTopic = new PushTopic();
    pushTopic.Name = 'AccountChanges2';
    pushTopic.Query = 'SELECT Id, Name FROM Account';
    pushTopic.ApiVersion = 29.0;
    pushTopic.NotifyForOperationCreate = true;
    pushTopic.NotifyForOperationUpdate = true;
    pushTopic.NotifyForOperationUndelete = true;
    pushTopic.NotifyForOperationDelete = true;
    pushTopic.NotifyForFields = 'All';
    insert pushTopic;
    
5. Set up environment variables for Oracle Fusion CRM topic polling user, INCLUDING security token - process.env.SF_TOPIC_USERNAME, process.env.SF_TOPIC_PASSWORD

6. Register for this notification in node-Oracle Fusion CRM

More info: http://wiki.developerforce.com/page/Getting_Started_with_the_Force.com_Streaming_API
