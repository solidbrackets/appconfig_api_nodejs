'use strict';

const db = require('../db/init.js');


before(function(done) {
    db.init(function prepareDb() {
        db.seed(function prepareDb() {
            done();
        });
    });
});
