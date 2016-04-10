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
    
    getScreenStateObject(callback);    
  };
  
  /**
   * @private
   */
  var getStartScreenStateObject = function() {
	
	return {
	  cardsCount: cardsCount,
	  screenId: 0,
	  className: getClassNamesArray(),
	  links: getLinksArray()
	};
  };  
  
  /**
   * @private
   */
  var getScreenStateObject = function(callback, position) {   
    
	position = position || '';
	
	// не выбрано первой карты из неизвестной пары
	if ( position.length === 0 || position.length%2 === 1 ) { 
		
		for (var i=1; i<=cardsPosition.length; i++) {
			
			if (!~position.indexOf(i)) {
				callback({
				  cardsCount: cardsCount,
				  screenId: position + String(i),
				  className: getClassNamesArray(position + String(i)),
				  links: getLinksArray(position + String(i))
				});

				getScreenStateObject(callback, position + String(i));
			};
		};
		
	} else { // выбрана первая карта из неизвестной пары

		var firstSelectedCard  = position[(position.length-2)];
		var secondSelectedCard = position[(position.length-1)];

		if (cardsPosition[firstSelectedCard-1] === cardsPosition[secondSelectedCard-1] 
		  && position.length <cardsPosition.length) {
		  for (var i=1; i<=cardsPosition.length; i++) {
			if (!~position.indexOf(i)) {			
				getScreenStateObject(callback, position + String(i));
			};
		  } 
		};
	};    
  };
  
  /**
   * @private
   */
  var getClassNamesArray = function(screenPosition) {  
	  
    var className = [];
    
    for (var i=0; i<cardsCount; i++) {
	  
	  className[i]  = getCardSuit(cardsPosition[i]); 
	  
	  className[i] += fadeIfStartScreen(screenPosition);
	  
	  className[i] += hideIfUnselect(screenPosition, i+1);
	};
	
	return className;	 
  };
  
  /**
   * @private
   */
  var getCardSuit = function(char) {
    
    switch (char) {
	  
	  case 'h': 
	    return 'heart ';
	    break;
	      
	  case 'd': 
	    return 'diamond ';
        break;
	      
	  case 'c': 
	    return 'club ';
	    break;
	      
	  case 's': 
	    return 'spade ';
	    break;	      	      
	};    
  };
    
  /**
   * @private
   */
  var getLinksArray = function(screenPosition) {  
    
    if ( (screenPosition % 2 === 1) 
      || (typeof screenPosition == 'undefined') ) {
	  
	  return linksArrayFromFirstCardSelectedScreen(screenPosition);
	} else {
	  
	  return linksArrayFromSecondCardSelectedScreen(screenPosition);
	};	 
  };  
  
  /**
   * @private
   */
  var linksArrayFromFirstCardSelectedScreen = function(screenPosition) {  
    
    var links = [];
    
    for (var j=0; j<cardsCount; j++) {
	  
	  if (!~screenPosition.indexOf(j+1)) { 
		  
	    links[j] = screenPosition + String(j+1);
	  } else {
	    
	    links[j] = screenPosition;
	  };
	};
	
	return links;	 
  }; 
  
  /**
   * @private
   */
  var linksArrayFromSecondCardSelectedScreen = 
    function(screenPosition) {  
   
    var links = [];
    
    var firstSelectedCard  = screenPosition[(screenPosition.length-2)];
	var secondSelectedCard = screenPosition[(screenPosition.length-1)];
   
    if (cardsPosition[firstSelectedCard] 
      === cardsPosition[firstSelectedCard]) {
	  
	  return linksArrayFromFirstCardSelectedScreen(ScreenPosition);	  
	};
  };
  
  /**
   * @private
   */
  var fadeIfStartScreen = function(screenPosition) {
    
    if (typeof screenPosition === 'undefined') {
		
	  return 'hide ';
	} else {
		
	  return '';
	};
  }; 
  
  /**
   * @private
   */
  var hideIfUnselect = function(screenPosition, currentCard) {
    
    if (typeof screenPosition === 'string' && 
      !~screenPosition.indexOf(currentCard)) {
		
	  return 'hidden ';
	} else {
		
	  return '';
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
