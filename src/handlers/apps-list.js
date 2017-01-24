'use strict';

const dynamoDb = require('../service/db.js').dynamodbDocumentClient;
const appHelper = require('../map/app.js');


/**
 * List apps.
 * @param {object} event Serverless event.
 * @param {object} context Serverless context.
 * @param {object} callback Serverless callback.
 *
 * @swagger
 * /apps:
 *   get:
 *     description: List all applications
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: apps
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/App'
 *
 */
module.exports.main = (event, context, callback) => {
    let params = {
        TableName: 'appconfig-apps',
    };

    dynamoDb.scan(params, function(err, resultQuery) {
      if(err) {
        callback(err);
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(resultQuery.Items.map(appHelper.mapDynamoDbToApi)),
      };

      callback(err, response);
    });
};
