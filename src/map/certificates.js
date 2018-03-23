'use strict';

/**
 * Map dynamodb structure to api structure.
 * @param {object} db The first number.
 * @return {object} api API object
 *
 * @swagger
 * definitions:
 *   Certificates:
 *     type: object
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 *         format: guid
 *       description:
 *         type: string
 *       source:
 *         type: string
 *       domain:
 *         type: array
 *         items:
 *          type: string
 *
 */
module.exports.mapDynamoDbToApi = (db) => {
   return {
        id: db.id,
        source: db.source,
        description: db.description,
        domains: db.domains
    };
};
