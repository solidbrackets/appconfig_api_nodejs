'use strict';

// Environment
process.env.NODE_ENV = 'test';
process.env.IS_OFFLINE = true;

// Dependencies
global.expect = require('chai').expect;
global.supertest = require('supertest');
global.endpoint = 'http://localhost:7999';
global.client = supertest(endpoint);

// variables

try {
    // apikey
    const fs = require('fs');
    let contents = fs.readFileSync('config/.env.json', 'utf8');
    let contentObject = JSON.parse(contents);
    global.apiKey = require('crypto-js/md5')(contentObject.apikey);
} catch (error) {
    console.log(error);
}


