var uow = require('../app/uow.js').config('mock');
var robots = require('../app/app/robots.js');

describe('robots.js', function () {

  it('works', function (){
    expect(1).toBe(1);
  });

  it('can check against a robots.txt', function () {
    expect(robots.check).toBeDefined();
  });

  it('validates against robots.txt', function () {
    var robot = '',
      url = '',
      result = robots.check(robot, url);

      expect(result).toBe(true);
  });

  it('validates a real url against robots.txt', function () {
    var robot = 'User-agent: *\nDisallow: /',
      url = 'http://www.philcorbett.net/about.html',
      result = robots.check(robot, url);

      expect(result).toBe(false);
  });

  it('validates a real https url against robots.txt', function () {
    var robot = 'User-agent: *\nDisallow: /',
      url = 'https://www.philcorbett.net/about.html',
      result = robots.check(robot, url);

      expect(result).toBe(false);
  });

  it('parses robots.txt contents', function () {
    var robot = 'User-agent: Newt\nDisallow: /',
      result = robots.parse(robot);

    expect(result.UserAgent).toBe('Newt');
    expect(result.Disallow[0]).toBe('/');
  });

  it('stores robots.txt contents', function () {
    var robot = 'User-agent: Newt\nDisallow: /',
      url = 'http://www.philcorbett.net/about.html';
    
    robots.store(robot);

    var result = robots.check(url);

    expect(result).toBe(false);
  });

  it('determines the robots.txt location for a url', function () {
    var url = 'http://www.philcorbett.net/about/index.html',
      result = robots.getLocation(url);

    expect(result).toBe('http://www.philcorbett.net/robots.txt');
  });
});