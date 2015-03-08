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

    runner.scan(url, function (err, results) {
      // Shouldn't return an error;
      expect(err).toBe(null);

      //Url should be passed through scanning.
      expect(results.urls.length).toBe(1);

      // Test is finished.
      done();
    });

  })

  it('scans mulitple urls', function (done) {
    var urls = ['http://www.philcorbett.net', 'http://blog.philcorbett.net'];

    runner.scan(urls, function (err, summary) {
      // Shouldn't return an error;
      expect(err).toBe(null);

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

    runner.scan(url, { depth: 2 }, function (err, summary) {
      // Shouldn't return an error;
      expect(err).toBe(null);

      // Main url should have sub urls in it.
      expect(summary.urls.length).toBeGreaterThan(1);

      // Should return phrases from the sub urls.
      expect(Object.keys(summary.phrases).length).toBeGreaterThan(1);

      // Test is finished.
      done();
    });

  })
  
  it('filters phrases based on frequency', function (done) {
    var url = 'http://www.philcorbett.net',
      greaterThan = 7;

    runner.scan(url, { depth: 2, greaterThan: greaterThan }, function (err, summary) {
      var i = 0;
      var keys = Object.keys(summary.phrases);

      // Shouldn't return an error;
      expect(err).toBe(null);
      
      for (i = 0; i < keys.length; i++) {
        // All phrases should be greater than the threshold defined.
        expect(summary.phrases[keys[i]].qty).toBeGreaterThan(greaterThan);
      }

      done();
    });
  });

  it('filters blacklists', function (done) {
    var url = 'http://www.philcorbett.net',
      blacklist = {'topic': true};

    runner.scan(url, { depth: 2, blacklist: blacklist }, function (err, summary) {
      // Shouldn't return an error;
      expect(err).toBe(null);

      expect(summary.phrases['topic']).toBeUndefined();

      done();
    });
  });

});