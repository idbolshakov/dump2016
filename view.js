var view = (function() {
  
  /**
   * @public
   */
  var getScreen = function(stateObject) {

    if (checkStateObject(stateObject)) {
      return buildScreenLayout(stateObject);
	};      
  };
  
  /**
   * @private
   */   
  var checkStateObject = function(stateObject) {
	  
	  throwErrorIfStateObjectNotSend(stateObject);
	  throwErrorIfCardsCountNotSet(stateObject);
	  
	  return true;
  };
  
  /**
   * @private
   */    
  var throwErrorIfStateObjectNotSend = function(stateObject) {
  
    if (typeof stateObject !== 'object') {
	  throw new Error('State Object not send');
	};
  };
  
  /**
   * @private
   */    
  var throwErrorIfCardsCountNotSet = function(stateObject) {
  
    if ( !('cardsCount' in stateObject) ) {
	  throw new Error('Cards count not set in state Object');
	};
  };  
  
  /**
   * @private
   */    
  var buildScreenLayout = function(stateObject) { 
	  
    var layout = String();
    
    layout += buildHideRulesIfNeeds(stateObject);
    
    layout += buildHeaderScreenLayout(stateObject);
    
    layout += buildBodyScreenLayout(stateObject);
    
    layout += buildFooterScreenLayout();
    
    return layout;	   
  };
  
  /**
   * @private
   */    
  var buildHideRulesIfNeeds = function(stateObject) { 
    
    if ( stateObject.hideRules === true ) {
	
      return String()
        +'<style>\n'
          +'#s'+stateObject.screenId+':target .notFixed {\n'
            +'-moz-animation-name: hide;\n'
            +'-moz-animation-delay: 0.25s;\n'
            +'-moz-animation-duration: 0.25s;\n'
            +'-moz-animation-fill-mode: forwards;\n'
            
            +'-webkit-animation-name: hide;\n'
            +'-webkit-animation-delay: 0.25s;\n'
            +'-webkit-animation-duration: 0.25s;\n'
            +'-webkit-animation-fill-mode: forwards;\n'
            
            +'-o-animation-name: hide;\n'
            +'-o-animation-delay: 0.25s;\n'
            +'-o-animation-duration: 0.25s;\n'
            +'-o-animation-fill-mode: forwards;\n'       
            
            +'-animation-name: hide;\n'
            +'-animation-delay: 0.25s;\n'
            +'-animation-duration: 0.25s;\n'
            +'-animation-fill-mode: forwards;\n'                             
          +'}'
        +'</style>\n'	
	}
	
	return '';	    
  }; 
  
  /**
   * @private
   */    
  var buildHeaderScreenLayout = function(stateObject) { 
    return String()
      +'<div class="wrapper" id="s'+stateObject.screenId+'">\n'   
        +'<div class="cardsContainer">\n'
        + buildYouWinBlockIfNeeds(stateObject);	    
  };
  
  /**
   * @private
   */    
  var buildYouWinBlockIfNeeds = function(stateObject) { 
    
    if ( stateObject.cardsCount === stateObject.screenId.length ) {
	
      return String()
        +'<div class="youWinBlock">\n'
          +'<a href="yaCards.html">YOU WIN!</a>\n'
        +'</div>\n'	
	}
	
	return '';	    
  };    
    
  /**
   * @private
   */    
  var buildFooterScreenLayout = function() { 
    return String()
        +'</div>\n' 
      +'</div>\n'	    
  };  
  
  /**
   * @private
   */    
  var buildBodyScreenLayout = function(stateObject) { 
    
    var bodyLayout = String();
    
    for (var i=0; i<stateObject.cardsCount; i++) {
	  bodyLayout += '<div><a class="'+stateObject.className[i]+'" href="#s'+stateObject.links[i]+'"></a></div>\n';
	};
	
	return bodyLayout;	    
  };  
  
  
  
  /**
   * @public
   */
  var getStyles = function(cardsPosition) {
 
    return String()
      +'<style>\n'
        +'.cardsContainer {\n'
          +'width: ' + 100*cardsPosition.length + 'px;\n'
          +'height: 380px;\n'
        +'}\n'
      +'</style>\n'      
  };  
  
  /**
   * @return
   */  
  return {
    getScreen: getScreen,
    getStyles: getStyles};
})();	

module.exports = view;
