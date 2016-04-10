var assert  = require('assert');

var model   = require('../model'); 


//model ////////////////////////////////////////////////////////////////
describe('model', function(){
  
  it('Должен быть объектом', function(){
	  
    assert.equal(typeof model, 'object');
  });
  
  it('Должен быть публичный метод init', function(){
	 
    assert.equal(typeof model.init, 'function');
  });
  
  it('Должен быть публичный метод run', function(){
	 
    assert.equal(typeof model.run, 'function');
  });    
  
  it('Должен быть публичный метод getCardsPosition', function(){
	 
    assert.equal(typeof model.getCardsPosition, 'function');
  });     
});


//model.init  //////////////////////////////////////////////////////////
describe('model.init', function(){
	
  it('Принимает строковый аргумент inputCardsPosition содержащий шаблон расположения карт для игры', 
    function(){
	  
      model.init('aabbcc');
  }); 
  
  it(
    'Выбрасывает исключение, если после удаления лишних символов в шаблоне осталось нечетное кол-во символов', 
    function(){
	  
	  assert.throws(
	    function(){model.init('');}, 
	    Error, 
	    'After formatting input string length is odd'
	  );
  });  
  
  it(
    'Выбрасывает исключение, если в шаблоне нет символов', 
    function(){
	  
	  assert.throws(
	    function(){model.init('')},  // пустая строка
	    Error, 
	    'After formatting input string length is nil'
	  );
	  
	  assert.throws(
	    function(){model.init('   ')}, // Пробелы
	    Error, 
	    'After spaces deleting input string length is nil'
	  );		    
  });   
  
  it(
    'Выбрасывает исключение, если для каждой карты нет пары', 
    function(){
      
      assert.throws(
        function(){model.init('aaabb');},
        Error,
        'Cards should be divided in pairs'
      );
  });    
});



//model.getCardsPosition  //////////////////////////////////////////////
describe('model.getCardsPosition', function(){
  
  it('Возвращает поле cardsPosition в котором хранится шаблон расположения карт', 
    function(){
		
	  model.init('hh dd cc');	
	  
	  assert.equal(model.getCardsPosition(), 'hhddcc');  
  });   
});
