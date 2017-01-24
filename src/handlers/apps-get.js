'use strict';

const dynamoDb = require('../service/db.js').dynamodbDocumentClient;
const appHelper = require('../map/app.js');


/**
 * Get app.
 * @param {object} event Serverless event.
 * @param {object} context Serverless context.
 * @param {object} callback Serverless callback.
 *
 * @swagger
 * /apps/{id}:
 *   get:
 *     description: Get a specific application
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        in: path
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *        description: apps
 *        schema:
 *          $ref: '#/definitions/App'
 *
 */
module.exports.main = (event, context, callback) => {
    let params = {
        TableName: 'appconfig-apps',
        Key: {
          'id': event.pathParameters.id,
        },

    };

    dynamoDb.get(params, function(err, resultQuery) {
      if(err) {
        callback(err);
      }

      const response = {
        statusCode: 200,
      };

      if(resultQuery.Item) {
        response.body = JSON.stringify(appHelper.mapDynamoDbToApi(resultQuery.Item));
      }else{
        response.statusCode = 404;
      }

      callback(err, response);
    });
};
