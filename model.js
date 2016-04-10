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
   * 
   * Не покрыт юнит-тестами
   * 
   * @param {function} callback 
   * @public
   */
  var run = function(callback) {  
    
    var screensTree = [];
    generateScreensTree(function(screenId) {
		
	  screensTree.push(screenId);}
	);
	
	for (var i=0; i<screensTree.length; i++) {
	  
	  var stateObject = {
	    
	    screenId: screensTree[i],
	    cardsCount: cardsCount,
	    className: [],
	    links: []
	  };
	  
	  callback(stateObject);
	};
  };
  
  /**
   * @private
   */
  var generateScreensTree = function(callback, screenId) {
    
	screenId = screenId || '';
	
	if ( screenId.length === 0 || screenId.length%2 === 1 ) { // не выбрано первой карты из неизвестной пары
		
		for (var i=1; i<=cardsPosition.length; i++) {
			
			if (!~screenId.indexOf(i)) {
				callback(screenId + String(i));
			
				generateScreensTree(callback, screenId + String(i));
			};
		};
		
	} else { // выбрана первая карта из неизвестной пары

		var firstSelectedCard  = screenId[(screenId.length-2)];
		var secondSelectedCard = screenId[(screenId.length-1)];

		if (cardsPosition[firstSelectedCard-1] === cardsPosition[secondSelectedCard-1] && screenId.length <cardsPosition.length) {
		  for (var i=1; i<=cardsPosition.length; i++) {
			if (!~screenId.indexOf(i)) {			
				generateScreensTree(callback, screenId + String(i));
			};
		  } 
		};
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
