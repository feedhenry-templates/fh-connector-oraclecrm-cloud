var Backbone = require('backbone');
require('node-soap-backbone')(Backbone);
var Models = exports.Models = {};
var Collections = exports.Collections = {};


var getUserNameFromUserId = function(userId) {
  var username = [];
  var parts = userId.split('.').forEach(function(part) {
    username.push(part.charAt(0).toUpperCase() + part.slice(1));
  });
  username = username.join(' ');
  console.log('username', username);
  return username;
};

Models.SalesAccount = Backbone.Model.extend({
  parse: function(json) {
    var parsed = {};
    // for(var key in json) {
    //   if(json[key] instanceof Array || typeof json[key] === 'object') {
    //     delete json[key];
    //   }
    // }
    // return json;
    /*
        "AccountDirectorId": "300000000514037",
    "CreatedBy": "BULK_IMPORT",
    "CreationDate": "2012-05-17T10:34:25.0-05:00",
    "ExistingFlag": "false",
    "ExistingFlgLastUpdDate": "2012-05-17",
    "LastAssignedDate": "2013-08-28",
    "LastUpdateDate": "2013-08-28T18:32:43.214-05:00",
    "LastUpdateLogin": "E50AF5A78D243358E043D100548CA9BB",
    "LastUpdatedBy": "FUSION_APPS_CRM_ESS_APPID",
    "NamedAccountFlag": "false",
    "ObjectVersionNumber": "17",
    "PartyId": "100000067434380",
    "UserLastUpdateDate": "2012-05-17T10:34:33.326706-05:00",
    "AssgnExceptionFlag": "false",
    "PartyUniqueName": "A. C. Networks",
    "Meaning": "Communications",
    "PartyUniqueName1": "Lisa Jones",
    "Status1": "A",
    "PartyType": "ORGANIZATION",
    "PartyName": "Lisa Jones",
    "PartyNumber": "1200",
    "SalesAccountId": "100000067442057",
    "SellToPartySiteId": "100000067435470",
    "SalesAccountStatus": "ACTIVE",
    "UserSalesAccountId": "300000093149676",
    "UpdateRating": "1"
    */
    //     'Id',
    //     'AccountNumber',
    //     'Industry',
    //     'Name',
    //     'Rating',
    //     'Website',
    //     'Type',
    //     'BillingStreet',
    //     'BillingCity',
    //     'BillingState',
    //     'BillingPostalCode',
    //     'BillingCountry',
    //     'Phone'
    var getField = function(obj, name) {
      if (obj == null || obj[name] == null || (typeof obj[name] === 'object')) {
        return null;
      }
      return obj[name];
    };

    parsed.Id = json.SalesAccountId;
    parsed.AccountNumber = json.PartyNumber;
    parsed.Industry = getField(json.OrganizationD, 'LineOfBusiness');
    parsed.Name = json.PartyUniqueName;
    parsed.Rating = json.UpdateRating;
    parsed.Website = getField(json.OrganizationD, 'PrimaryURL');
    parsed.Type = json.PartyType;
    parsed.BillingStreet = getField(json.OrganizationD, 'PrimaryAddressLine1');
    parsed.BillingCity = getField(json.OrganizationD, 'PrimaryAddressCity');
    parsed.BillingState = getField(json.OrganizationD, 'PrimaryAddressState');
    parsed.BillingPostalCode = getField(json.OrganizationD, 'PrimaryAddressPostalCode');
    parsed.BillingCountry = getField(json.OrganizationD, 'PrimaryAddressCountry');
    parsed.Phone = getField(json.OrganizationD, 'PrimaryFormattedPhoneNumber');
    parsed.attributes = { // salesforce demo app support
      type: 'Account',
      url: '/'
    }
    return parsed;
  }
});

Collections.SalesAccounts = Backbone.Collection.extend({
  model: Models.SalesAccount,
  wsdl: 'https://trialawzr.crm.us2.oraclecloud.com/crmCommonSalesParties/SalesPartyService?WSDL',
  soapOperationForMethod: function(method, collection, options) {
    switch (method) {
      case 'read':
        return 'findSalesAccount';
      default:
        throw new Error('unsupported_method');
    }
  },
  soapBodyForMethod: function(method, collection, options) {
    switch (method) {
      case 'read':
        return {
          "findCriteria": {
            "ns1::http://xmlns.oracle.com/adf/svc/types/::fetchSize": 10, // discoverd 64 belonging to user
            "ns1::http://xmlns.oracle.com/adf/svc/types/::filter": {
              "ns1::http://xmlns.oracle.com/adf/svc/types/::group": {
                "ns1::http://xmlns.oracle.com/adf/svc/types/::item": {
                  "ns1::http://xmlns.oracle.com/adf/svc/types/::attribute": "PartyUniqueName1",
                  "ns1::http://xmlns.oracle.com/adf/svc/types/::operator": "=",
                  "ns1::http://xmlns.oracle.com/adf/svc/types/::value": getUserNameFromUserId(process.env.SOAP_USER) // e.g. 'Lisa Jones'
                }
              }
            }
          }
        };
      default:
        throw new Error('unsupported_method');
    }
  },
  soapUser: process.env.SOAP_USER,
  soapPass: process.env.SOAP_PASS
});