var uow = require('../app/uow.js').config('mock');
var logger = require('../app/app/logger.js');

describe('logger.js', function () {
  
  beforeEach(function () {
    logger.clear();
  });
  
  it('works', function () {
    expect(1).toBe(1);
  });
  
  it('has a write function', function () {
    expect(logger.write).toBeDefined();
  });
  
  it('writes to a log', function (){
    var msg = 'hello';
    logger.write(msg);
    
    var results = logger.getLog();
    
    expect(results.length).toBe(1);
    expect(results[0].Message).toBe(msg);
  });
  
  it('clears the log', function () {
    logger.write('Hey');
    
    expect(logger.getLog().length).toBe(1);
   	
    logger.write('Another');
    
    expect(logger.getLog().length).toBe(2);
    
    logger.clear();
    
    expect(logger.getLog().length).toBe(0);
  });
  
});