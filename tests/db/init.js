'use strict';


const async = require('async');
const dynamoDb = require('../../src/service/db.js').dynamodb;
const dynamoDbDocumentClient = require('../../src/service/db.js').dynamodbDocumentClient;


const yaml = require('js-yaml');
const fs = require('fs');

module.exports.init = (callback) => {
     try {

         let resources = [];

        const serverlessConfig = yaml.safeLoad(fs.readFileSync('serverless.yml', 'utf8'));
        const resourcesObject = serverlessConfig.resources.Resources;
        for (let key in resourcesObject) {
            if (resourcesObject.hasOwnProperty(key)) {

                const resource = resourcesObject[key];
                resources.push(resource);



                // const resource = resourcesObject[key];
                //
                // // delete the tables if it exists
                // dynamoDb.deleteTable({TableName: resource.Properties.TableName}, function(err, data) {
                //     if(err) {
                //         // console.log(err);
                //     }
                //
                //     // create tables
                //     dynamoDb.createTable(resource.Properties, function(err, data) {
                //         if(err) {
                //             console.log(err);
                //         }
                //
                //     });
                // });
            }
        }

         // create each table
         async.map(
             resources,
             function deleteTable(params, callback) {
                 // delete the tables if it exists
                 dynamoDb.deleteTable({TableName: params.Properties.TableName}, function(err, data) {
                     if(err) {
                         // console.log(err);
                     }

                     // create tables
                     dynamoDb.createTable(params.Properties, function(err, data) {
                         if(err) {
                             console.log(err);
                         }
                         callback();
                     });
                 });
             },
             function afterAllDocumentsHaveBeenInserted(err, results) {
                 if(err) {
                     callback(err);
                 }
                 callback();
             }
         );


        } catch (e) {
            console.log(e);
        }
};


module.exports.seed = (callback) => {
     try {
            const path = 'tests/db/data';
            const files = fs.readdirSync(path);

            // create a dynamodb insert object
            const documents = [];
            for (let i in files) {
                if (files.hasOwnProperty(i)) {
                    let docString = fs.readFileSync(path + '/' + files[i], 'utf8');

                    let arr = files[i].split("-");

                    const params = {
                        TableName:  'appconfig-' + arr[0],
                        Item: JSON.parse(docString),
                    };
                    documents.push(params);
                }
            }


            // insert each document
            async.map(
                documents,
                function insertDocument(params, callback) {
                    dynamoDbDocumentClient.put(params, (error, resultPut) => {
                        if(error) {
                            console.log(error);
                        }
                        callback(error, resultPut);
                    });
                },
                function afterAllDocumentsHaveBeenInserted(err, results) {
                    if(err) {
                        callback(err);
                    }
                    callback();
                }
            );
        } catch (e) {
            console.log(e);
        }
};
