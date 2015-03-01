var fetch = require('../app/fetch.js');

describe('fetch.js', function () {

  it('should work - sanity test', function () {
    expect(1).toBe(1);
  });

  it('should fetch locally', function (done) {
    fetch.File('index.html', function (err, data) {
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });

  //it('should fetch google', function (done) {
  //  fetch.URL('http://www.google.com', function (res) {
  //    expect(JSON.stringify(res)).toBe('');
  //    done();
  //  });
  //});

  //it('should fetch facebook', function (done) {
  //  fetch.URL('http://www.facebook.com', function (res) {
  //    expect(JSON.stringify(res)).toBe('');
  //    done();
  //  });
  //});

});