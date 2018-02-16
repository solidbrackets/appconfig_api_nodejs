'use strict';

const dynamoDb = require('../service/db.js').dynamodbDocumentClient;
const lbHelper = require('../map/certificates.js');


/**
 * List apps.
 * @param {object} event Serverless event.
 * @param {object} context Serverless context.
 * @param {object} callback Serverless callback.
 *
 * @swagger
 * /certificates:
 *   get:
 *     description: List all applications
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: certificates
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Certificates'
 *
 */
module.exports.main = (event, context, callback) => {
    let params = {
        TableName: 'appconfig-certificates',
    };

    dynamoDb.scan(params, function(err, resultQuery) {
      if(err) {
        callback(err);
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(resultQuery.Items.map(lbHelper.mapDynamoDbToApi)),
      };

      callback(err, response);
    });
};
