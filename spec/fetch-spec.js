var fetch = require('../app/fetch.js');

describe('fetch.js', function () {

  // Sanity test.
  it('should work - sanity test', function () {
    expect(1).toBe(1);
  });

  // Test local pull.
  it('should fetch locally', function (done) {
    fetch.File('index.html', function (err, data) {
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });

  // Test url pull.
  it('should fetch www.philcorbett.net', function (done) {
    fetch.URL('http://www.philcorbett.net', function (body) {
      expect(body.length).toBeGreaterThan(0);
      done();
    });
  });

});