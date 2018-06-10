var uow = require('../app/uow.js').config('mock');
var parse = require('../app/app/parse.js');

describe('parse.js', function () {

  // Sanity test.
  it('should work - sanity test', function () {
    expect(1).toBe(1);
  });

  // Strips out html tags but leaves plain text alone.
  it('strips out html tags - plain text', function () {
    var html = 'testing',
      results = parse.html(html);

    expect(results).toBe(html);
  });

  // Anything coming through parsing gets lowercased.
  it('lowercases results', function () {
    var html = 'Testing',
      results = parse.html(html);

    expect(results).toBe('testing');
  });

  // Strips out the html tag from around content.
  it('strips out html tags - single tag', function () {
    var text = 'test',
      html = '<div>' + text + '</div>',
      results = parse.html(html);

    expect(results).toBe(text);
  });

  // Strips out all the tags around a piece of content.
  it('strips out html tags - multi nested tag', function () {
    var text = 'test',
      html = '<div><div>' + text + '</div></div>',
      results = parse.html(html);

    expect(results).toBe(text);
  });

  // Strips out all the tags and adds a space delimiter between words.
  it('strips out html tags - multi non-nested tag', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.html(html);

    expect(results).toBe(text + ' ' + text2);
  });

  // Strips all of the html from a sample page.
  it('strips out html tags - simple real html test', function () {
    var html = '<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n    <title></title>\n</head>\n<body>\n    Hello\n</body>\n</html>',
      results = parse.html(html);

    expect(results).toBe('hello');
  });

  // Groups clusters of content into separate phrases.
  it('groups by clusters - simple test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 1, 1);

    expect(results.phrases[text].qty).toBe(1);
    expect(results.phrases[text2].qty).toBe(1);
  });

  // Groups clusters of content and sums up duplicated phrases.
  it('groups by clusters - simple quantity test', function () {
    var text = 'test',
      text2 = 'test',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 1, 1);

    expect(results.phrases[text].qty).toBe(2);
  });

  // Groups clusters that are equal to or larger than the minimum.
  it('groups by clusters - min test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 2, 2);

    expect(results.phrases[text + ' ' + text2].qty).toBe(1);
  });

  // Groups by clusters and creates phrases of multiple words.
  it('groups by clusters - min/max test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 1, 2);

    expect(results.phrases[text].qty).toBe(1);
    expect(results.phrases[text2].qty).toBe(1);
    expect(results.phrases[text + ' ' + text2].qty).toBe(1);
  });

  // Groups phrases using a real html test.
  it('groups by clusters - simple real html test', function () {
    var html = '<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n    <title></title>\n</head>\n<body>\n    Hello\n</body>\n</html>',
      results = parse.parse(html, 1, 1);

    expect(results.phrases['hello'].qty).toBe(1);
  });

  // Find urls in the content.
  it('locates urls', function () {
    var html = '<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n    <title></title>\n</head>\n<body>\n    Hello\n<a href="http://www.google.com">Google</a>\n</body>\n</html>',
      results = parse.parse(html, 1, 1);

    expect(results.urls.length).toBe(1);
    expect(results.urls[0]).toBe('http://www.google.com');
  });

  it('ignores blacklist phrases', function () {
    var text = 'test testing hello',
      blacklist = { 'hello': true },
      results = parse.parse(text, 1, 1, blacklist);

    expect(results.phrases['test'].qty).toBe(1);
    expect(results.phrases['testing'].qty).toBe(1);
    expect(results.phrases['hello']).toBeUndefined();
  });

});