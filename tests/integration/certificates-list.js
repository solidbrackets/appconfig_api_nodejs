'use strict';

describe('certificates list', function() {
    it('GET certificates: should return 403 without valid apiKey', function(done) {
        client
            .get('/v1/certificates')
            .set('x-api-key', 'notvalid')
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.status).to.be.equal(403);
                done();
            });
    });

    it('GET certificates: should return all certificates', function(done) {
        client
            .get('/v1/certificates')
            .set('x-api-key', apiKey)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.length(1);

                let lbObject = res.body[0];
                expect(lbObject.id).to.be.equal('123');
                expect(lbObject.source).to.be.equal('static|letsencrypt');
                expect(lbObject.folder).to.be.equal('/appconfig');
                expect(lbObject.domains).to.have.length(2);


                done();
            });
    });
});