'use strict';

describe('apps list', function() {
    it('GET apps: should return 403 without valid apiKey', function(done) {
        client
            .get('/v1/apps')
            .set('x-api-key', 'notvalid')
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.status).to.be.equal(403);
                done();
            });
    });

    it('GET apps: should return all apps', function(done) {
        client
            .get('/v1/apps')
            .set('x-api-key', apiKey)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.length(2);
                done();
            });
    });
});
