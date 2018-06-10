var uow = require('../app/uow.js').config('mock');
var compare = require('../app/app/compare.js');

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

    compare.compare(first, second);

    expect(second.test.qty).toBe(1);
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

  it('compares - all new changes', function () {
    var second = {
      test: { phrase: 'test', qty: 1 },
      mess: { phrase: 'mess', qty: 2 },
      hello: { phrase: 'hello', qty: 1 }
    };

    var changes = compare.compare(null, second);

    expect(changes.test.perc).toBe(Infinity);
    expect(changes.mess.perc).toBe(Infinity);
    expect(changes.hello.new).toBe(true);
    expect(changes.hello.perc).toBe(Infinity);
  });

  it('compares - changes', function () {
    var first = {
      test: { phrase: 'test', qty: 1 },
      mess: { phrase: 'mess', qty: 1 }
    },
      second = {
        test: { phrase: 'test', qty: 1 },
        mess: { phrase: 'mess', qty: 2 },
        hello: { phrase: 'hello', qty: 1 }
      };

    var changes = compare.compare(first, second);

    expect(changes.test).toBeUndefined();
    expect(changes.mess.perc).toBe(.5);
    expect(changes.hello.new).toBe(true);
    expect(changes.hello.perc).toBe(Infinity);
  });

  it('compares - change threshold', function () {
    var first = {
      test: { phrase: 'test', qty: 1 },
      mess: { phrase: 'mess', qty: 1 }
    },
      second = {
        test: { phrase: 'test', qty: 1 },
        mess: { phrase: 'mess', qty: 2 },
        hello: { phrase: 'hello', qty: 1 }
      };

    var changes = compare.compare(first, second, { percChange: .5 });

    expect(changes.test).toBeUndefined();
    expect(changes.mess).toBeUndefined();
    expect(changes.hello.new).toBe(true);
    expect(changes.hello.perc).toBe(Infinity);
  });
});