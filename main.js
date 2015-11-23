var bbmodels = require('./models.js');
var collections = {};


/**
 * Get the relevant details from accounts objects.
 *
 * @param {Object} params The params from the calling service.
 * @param {Function} cb The act callback.
 */
exports.listAccounts = function(params, cb) {
  console.log('listAccounts');
  if (!collections.SalesAccounts) {
    console.log('creating SalesAccounts collection');
    collections.SalesAccounts = new bbmodels.Collections.SalesAccounts();
  }

  console.log('fetching SalesAccounts');
  collections.SalesAccounts.fetch({
    success: function(collection, response, options) {
      console.log('fetch SalesAccounts success', collection.models.length, response, options);
      var res = {
        done: true,
        records: collection.toJSON(),
      };
      res.totalSize = res.records.length;
      return cb(null, res);
    },
    error: function(err) {
      console.error('fetch SalesAccounts error', err);
      return cb(err);
    }
  });
};

exports.listCases = function(params, cb) {
  return cb('not implemented');
};

exports.listCampaigns = function(params, cb) {
  return cb('not implemented');
};

/**
 * Retrieve full details of a specified account id.
 *
 * @param {Object} params Should contain the auth object and accountId string.
 * @param {Function} cb The callback given to the act call.
 */
exports.getAccountDetails = function(params, cb) {
  return cb('not implemented');
};

exports.getCaseDetails = function(params, cb) {
  return cb('not implemented');
};


/**
 * Attempt to login to Salesforce through the SOAP mechanism given a username
 * and password.
 *
 * @param {Object} params Should contain username, password and url strings.
 * @param {Function} cb The act callback.
 */
exports.login = function(params, cb) {
  return cb(null, {
    accessToken: 'oracle-crm-test-access-token',
    instanceUrl: 'http://oracle-crm-test-instance-url.example.com'
  });
};