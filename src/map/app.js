'use strict';

/**
 * Map dynamodb structure to api structure.
 * @param {object} db The first number.
 * @return {object} api API object
 *
 * @swagger
 * definitions:
 *   App:
 *     type: object
 *     required:
 *       - id
 *       - slug
 *     properties:
 *       id:
 *         type: string
 *         format: guid
 *       slug:
 *         type: string
 *       variables:
 *         type: object
 *         properties:
 *          local:
 *              $ref: '#/definitions/AppVariables'
 *          test:
 *              $ref: '#/definitions/AppVariables'
 *          development:
 *              $ref: '#/definitions/AppVariables'
 *          acceptance:
 *              $ref: '#/definitions/AppVariables'
 *          production:
 *              $ref: '#/definitions/AppVariables'
 *   AppVariables:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         format: guid
 *
 */
module.exports.mapDynamoDbToApi = (db) => {
   return {
            id: db.id,
            project: db.project,
            scm: db.scm,
            container: db.container,
            build: db.build,
            environments: db.environments,
          };
};
