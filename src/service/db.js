'use strict';

const AWS = require('aws-sdk');


let localDbHost = 'db';
if(process.env.NODE_ENV == 'test') {
    localDbHost = '127.0.0.1';
}

const dynamodbOfflineOptions = {
        region: 'db',
        endpoint: 'http://' + localDbHost + ':8000',
    };
const isOffline = () => process.env.IS_OFFLINE;


module.exports.dynamodb = isOffline() ? new AWS.DynamoDB(dynamodbOfflineOptions) : new AWS.DynamoDB();
module.exports.dynamodbDocumentClient = isOffline() ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions) : new AWS.DynamoDB.DocumentClient();


