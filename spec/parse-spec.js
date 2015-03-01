var parse = require('../app/parse.js');

describe('parse.js', function () {

  it('should work - sanity test', function () {
    expect(1).toBe(1);
  });

  it('strips out html tags - plain text', function () {
    var html = 'testing',
      results = parse.html(html);

    expect(results).toBe(html);
  });

  it('lowercases results', function () {
    var html = 'Testing',
      results = parse.html(html);

    expect(results).toBe('testing');
  });

  it('strips out html tags - single tag', function () {
    var text = 'test',
      html = '<div>' + text + '</div>',
      results = parse.html(html);

    expect(results).toBe(text);
  });

  it('strips out html tags - multi nested tag', function () {
    var text = 'test',
      html = '<div><div>' + text + '</div></div>',
      results = parse.html(html);

    expect(results).toBe(text);
  });

  it('strips out html tags - multi non-nested tag', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.html(html);

    expect(results).toBe(text + ' ' + text2);
  });

  it('strips out html tags - simple real html test', function () {
    var html = '<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n    <title></title>\n</head>\n<body>\n    Hello\n</body>\n</html>',
      results = parse.html(html);

    expect(results).toBe('hello');
  });

  it('groups by clusters - simple test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 1, 1);

    expect(results[text].qty).toBe(1);
    expect(results[text2].qty).toBe(1);
  });

  it('groups by clusters - simple quantity test', function () {
    var text = 'test',
      text2 = 'test',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 1, 1);

    expect(results[text].qty).toBe(2);
  });

  it('groups by clusters - min test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 2, 2);

    expect(results[text + ' ' + text2].qty).toBe(1);
  });

  it('groups by clusters - min/max test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 1, 2);

    expect(results[text].qty).toBe(1);
    expect(results[text2].qty).toBe(1);
    expect(results[text + ' ' + text2].qty).toBe(1);
  });

  it('groups by clusters - simple real html test', function () {
    var html = '<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n    <title></title>\n</head>\n<body>\n    Hello\n</body>\n</html>',
      results = parse.parse(html, 1, 1);

    expect(results['hello'].qty).toBe(1);
  });

});