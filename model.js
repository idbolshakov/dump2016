var EventEmitter = require('events').EventEmitter;

var model = (function() {
	
  /** @private */ var cardsPosition;  
  /** @private */ var cardsCount;
  
  
  /**
   * Принимает аргумент, который пытается распарсить в шаблон
   * расположения карт для игры
   *  
   * @param {string} inputCardsPosition
   * @public
   */
  var init = function(inputCardsPosition) {
    
    var formattedCardsPosition = 
      formateCardsPositionInput(inputCardsPosition);
      
    checkCardsPosition(formattedCardsPosition);
    
    setCardsPositionData(formattedCardsPosition);       
  };
  
  /**
   * @private
   */
  var formateCardsPositionInput = function(inputCardsPosition) {
	  
    return deleteIllegalSymbols(
      toString(
        inputCardsPosition
    ));
  };  
    
  /**
   * @private
   */
  var toString = function(unknownTypeArgument) {
	  
    return unknownTypeArgument.toString();
  };
  
  /**
   * @private
   */
  var deleteIllegalSymbols = function(inputString) {
    
    return inputString.replace(/[^hdcs]/gim, '');
  };  
  
  /**
   * @private
   */
  var checkCardsPosition = function(inputCardsPosition) {  
  
    throwErrorIfLengthIsOdd(inputCardsPosition);
    
    throwErrorIfLengthIsNil(inputCardsPosition);
    
    throwErrorIfCardsNotDividenInPairs(inputCardsPosition);

  }; 
  
  /**
   * @private
   */
  var throwErrorIfLengthIsOdd = function(inputString) { 
    
    if (inputString.length % 2 !== 0) {
	  throw new 
	    Error('After formatting input string length is odd');
	}; 
  };
  
  /**
   * @private
   */
  var throwErrorIfLengthIsNil = function(inputString) { 
    
    if (inputString.length === 0) {
	  throw new 
	    Error('After spaces deleting input string length is nil');
	}; 
  }; 
  
  /**
   * @private
   */
  var throwErrorIfCardsNotDividenInPairs = function(inputString) { 
    
    if (!checkPairs(inputString)) {
	  throw new 
	    Error('Cards should be divided in pairs');
	}; 
  }; 
  
  /**
   * @private
   */
  var checkPairs = function(inputString) { 
    
    var visited = [ inputString[inputString.length] ];
    
    for (var i=0; i<(inputString.length-1); i++) {
	
	  if (visited[i]) {
	    
	    continue;
	  } else {
		  
		  var index = inputString.indexOf(inputString[i], i+1)
		  
		  if (index !== -1) {
		    
		    visited[i] = visited[index] = true;
		  } else {
		    
		    return false;
		  };
	  };
	};
    
    return true;
  };     
  
  /**
   * @private
   */
  var setCardsPositionData = function(inputCardsPosition) {
    
    setCardsPosition(inputCardsPosition);
    setCardsCount(inputCardsPosition.length);
  };  
  
  /**
   * @private
   */
  var setCardsPosition = function(inputCardsPosition) {
    
    cardsPosition = inputCardsPosition;
  };
  
  /**
   * @private
   */
  var setCardsCount = function(count) {
    
    cardsCount = count;
  };  
  
  
  /**
   * Генерирует state-объекты для экранов игры на основе cardsPosition
   * и передает его в callback
   * 
   * Не покрыт юнит-тестами
   * 
   * @param {function} callback 
   * @public
   */
  var run = function(callback) {  
    
    callback(getStartScreenStateObject());
  };
  
  /**
   * @private
   */
  var getStartScreenStateObject = function() {
    
    var className = [];
    for (var i=0; i<cardsCount; i++) {
	  	  
      switch (cardsPosition[i]) {
	  
	    case 'h': 
	      className[i] = 'heart hide';
	      break;
	      
	    case 'd': 
	      className[i] = 'diamond hide';
	      break;
	      
	    case 'c': 
	      className[i] = 'club hide';
	      break;
	      
	    case 's': 
	      className[i] = 'spade hide';
	      break;	      	      
	  };
	  
	};
	
	var links = [];
    for (var j=0; j<cardsCount; j++) {
	  
	  links[j] = j+1;
	};	
	
	return {
	  cardsCount: cardsCount,
	  screenId: 0,
	  className: className,
	  links: links
	};
  };   
  
    
  /**
   * Возвращает поле cardsPosition в котором хранится шаблон 
   * расположения карт
   *  
   * @public
   */
  var getCardsPosition = function() {  
    
    return cardsPosition;
  }; 


  
  /**
   * @return
   */  
  return {    
    init: init,
    run: run,
    getCardsPosition: getCardsPosition};
})();

module.exports = model;
