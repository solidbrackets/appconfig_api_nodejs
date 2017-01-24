'use strict';

describe('apps get', function() {
    it('GET apps/{slug}: should return 403 without valid apiKey', function(done) {
        client
            .get('/v1/apps/app-all')
            .set('x-api-key', 'notvalid')
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.status).to.be.equal(403);
                done();
            });
    });

    it('GET apps/{slug}: should return specific app', function(done) {
        client
            .get('/v1/apps/app-all')
            .set('x-api-key', apiKey)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    it('GET apps/{slug}: should return 404 when it does not exists', function(done) {
        client
            .get('/v1/apps/doesnotexists')
            .set('x-api-key', apiKey)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.status).to.be.equal(404);
                done();
            });
    });
});
