var EventEmitter = require('events').EventEmitter;

var model = (function() {
  
  /** @private */ var MAX_LENGTH = 8; 	
  
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
    
    throwErrorIfLengthTooLarge(inputCardsPosition);

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
  var throwErrorIfLengthTooLarge = function(inputString) { 
    
    if (inputString > MAX_LENGTH) {
	  throw new 
	    Error('Cards position too large');
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
    
    callback(getStartScreenStateObject());
    
    
    var screensTree = [];
    generateScreensTree(function(screenId) {
		
	  screensTree.push(screenId);}
	);
	
	for (var i=0; i<screensTree.length; i++) {
  
	  callback( getScreenStateObject(screensTree, screensTree[i]) );
	};
  };
  
  /**
   * @private
   */
  var getStartScreenStateObject = function() {
	
	var startsLinks = function() {
	  var links = [];
	  for (var i=0; i<cardsCount; i++) {
	    links[i] = i+1;
	  };
		
	  return links;
	};
	
	return {
	  cardsCount: cardsCount,
	  screenId: 0,
	  hideRules: false,
	  className: getClassNamesArray(),
	  links: startsLinks()
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
	  
	  className[i] += unfixIfNeed(screenPosition, i+1);
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
    
    if (typeof screenPosition === 'string' 
      &&  !~screenPosition.indexOf(currentCard)) {
		
	  return 'hidden ';
	} else {
		
	  return '';
	};
  }; 
  
  /**
   * @private
   */
  var unfixIfNeed = function(screenPosition, cardNumber) {
	
	if (typeof screenPosition === 'string' 
	  && screenPosition.length > 2
	  && screenPosition.length % 2 === 0) {
	    
	    var a  = screenPosition[(screenPosition.length-2)];
	    var b  = screenPosition[(screenPosition.length-1)];
	      
	    if (cardsPosition[a-1] === cardsPosition[b-1]
	      || screenPosition
	        .substring(0, screenPosition.length-2)
	        .indexOf(cardNumber) !== -1) {
		  return 'fixed ';
		};	  
	};
	
	if (typeof screenPosition === 'string' 
	  && screenPosition.length > 2
	  && screenPosition.length % 2 !== 0) {
	    
	  if (screenPosition
	    .substring(0, screenPosition.length-1)
	    .indexOf(cardNumber) !== -1 
	    || screenPosition[screenPosition.length-1] == cardNumber) {
	  
	    return 'fixed ';
	  }
	};	
	
	return 'notFixed ';	
	
  };  
  
  /**
   * @private
   */
  var getLinks = function(screensTree, screenId) {
    
    var linksArray = [];
    for (var i=0; i<cardsCount; i++) {
	  
      if (screenId.length == 0 || screenId.length % 2 === 0) { // четный экран
	    
	    if (screensTree.indexOf(screenId + String(i+1)) !== -1) {  // если есть такой экран в дереве
		  
		  linksArray[i] = screenId + String(i+1);
		  
		} else {
			
		  var a  = screenId[(screenId.length-2)];
	      var b  = screenId[(screenId.length-1)];
	      
	      if (cardsPosition[a-1] === cardsPosition[b-1]) {
		    linksArray[i] = screenId;
		  } else {
		    if (screenId.substring(0, screenId.length-2)
		      .indexOf(i+1) === -1) {
				  
			  linksArray[i] = screenId.substring(0, screenId.length-2) 
			    + String(i+1);	
			} else {
			  
			  linksArray[i] = screenId;
			};
		    
		  };		  
		  
		 };
	    
	  } else { // нечетный экран
		  
	    if (screensTree.indexOf(screenId + String(i+1)) !== -1) {  // если есть такой экран в дереве
		  
		  linksArray[i] = screenId + String(i+1);
		  
		} else {
			
		  linksArray[i] = screenId;
		};        
	  };
	};
	
	return linksArray;
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
				callback(screenId + String(i));
				generateScreensTree(callback, screenId + String(i));
			};
		  } 
		};
	};    
  };
  
  /**
   * @private
   */
  var getScreenStateObject = function(screensTree, screenId) {
	
	return {
	  cardsCount: cardsCount,
	  screenId: screenId,
	  hideRules: checkHideRules(screenId),
	  className: getClassNamesArray(screenId),
	  links: getLinks(screensTree, screenId)
	};
  };   
  
  /**
   * @private
   */
  var checkHideRules = function(screenId) {
    
    var hideRules = false;
    
    if (screenId.length > 1) {
	
      var firstSelectedCard  = screenId[(screenId.length-2)];
	  var secondSelectedCard = screenId[(screenId.length-1)];

      if ( cardsPosition[firstSelectedCard-1] 
        === cardsPosition[secondSelectedCard-1] ) {
		  	  
        hideRules = false;
	  } else {
		  
	    hideRules = true;
	  };	
	};    	
	
	return hideRules;
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
