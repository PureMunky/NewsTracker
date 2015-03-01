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

  it('groups by clusters - simple test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 1, 1);

    //expect(JSON.stringify(results)).toBe('');
    expect(results[text].qty).toBe(1);
    expect(results[text2].qty).toBe(1);
  });

  it('groups by clusters - min test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 2, 2);

    //expect(JSON.stringify(results)).toBe('');
    expect(results[text + ' ' + text2].qty).toBe(1);
  });

  it('groups by clusters - min/max test', function () {
    var text = 'test',
      text2 = 'something',
      html = '<div>' + text + '</div><div>' + text2 + '</div>',
      results = parse.parse(html, 1, 2);

    //expect(JSON.stringify(results)).toBe('');
    expect(results[text].qty).toBe(1);
    expect(results[text2].qty).toBe(1);
    expect(results[text + ' ' + text2].qty).toBe(1);
  });
});