var runner = require('../app/runner.js');

describe('runner.js', function () {

  it('should work - sanity test', function () {
    expect(1).toBe(1);
  });

  it('has a scan function', function () {
    expect(runner.scan).toBeDefined();
  });

  it('scans a url', function (done) {
    var url = 'http://www.philcorbett.net';

    runner.scan(url, 1, 7, function (results) {
      //Url should be passed through scanning.
      expect(results.urls.length).toBe(1);

      // Test is finished.
      done();
    });

  })

  it('scans mulitple urls', function (done) {
    var urls = ['http://www.philcorbett.net', 'http://blog.philcorbett.net'];

    runner.scan(urls, 1, 7, function (summary) {
      //Urls should be passed through scanning.
      expect(summary.urls[0]).toBe(urls[0]);
      expect(summary.urls[1]).toBe(urls[1]);
      expect(summary.urls.length).toBe(2);

      // Test is finished.
      done();
    });
  });

  it('scans sub urls', function (done) {
    var url = 'http://www.philcorbett.net';

    runner.scan(url, 2, 7, function (summary) {
      // Main url should have sub urls in it.
      expect(summary.urls.length).toBeGreaterThan(1);

      // Should return phrases from the sub urls.
      expect(Object.keys(summary.phrases).length).toBeGreaterThan(1);

      // Test is finished.
      done();
    });

  })
  
  it('filters results', function (done) {
    var url = 'http://www.philcorbett.net',
      greaterThan = 7;

    runner.scan(url, 2, greaterThan, function (summary) {
      var i = 0;
      var keys = Object.keys(summary.phrases);

      for (i = 0; i < keys.length; i++) {
        expect(summary.phrases[keys[i]].qty).toBeGreaterThan(greaterThan);
      }

      done();
    });
  });

});