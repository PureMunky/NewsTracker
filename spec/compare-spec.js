var compare = require('../app/compare.js');

describe('compare.js', function () {

  it('works', function () {
    expect(1).toBe(1);
  });

  it('can compare', function () {
    expect(compare.compare).toBeDefined();
  });

  it('compares - pass through', function () {
    var first = {
      test: { phrase: 'test', qty: 1 }
    },
      second = {
        test: { phrase: 'test', qty: 1 }
      };

    var results = compare.compare(first, second);

    expect(results.test.qty).toBe(1);
  });

  it('compares - percentage', function () {
    var first = {
      test: { phrase: 'test', qty: 1 },
      mess: { phrase: 'mess', qty: 1 }
    },
      second = {
        test: { phrase: 'test', qty: 1 },
        mess: { phrase: 'mess', qty: 2 },
        hello: { phrase: 'hello', qty: 1 }
      };

    compare.compare(first, second);

    expect(second.test.perc).toBe(0);
    expect(second.mess.perc).toBe(.5);
    expect(second.hello.new).toBe(true);
    expect(second.hello.perc).toBe(Infinity);
  });

  it('compares - all new', function () {
    var second = {
      test: { phrase: 'test', qty: 1 },
      mess: { phrase: 'mess', qty: 2 },
      hello: { phrase: 'hello', qty: 1 }
    };

    compare.compare(null, second);

    expect(second.test.perc).toBe(Infinity);
    expect(second.mess.perc).toBe(Infinity);
    expect(second.hello.new).toBe(true);
    expect(second.hello.perc).toBe(Infinity);
  });

});