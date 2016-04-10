var assert  = require('assert');

var view   = require('../view'); 


//view /////////////////////////////////////////////////////////////////
describe('view', function(){
  
  it('Должен быть объектом', function(){
	  
    assert.equal(typeof view, 'object');
  });
  
  it('Должен быть публичный метод getScreen', function(){
	 
    assert.equal(typeof view.getScreen, 'function');
  });       
});


//view.getScreen ///////////////////////////////////////////////////////
describe('view.getScreen', function() {
	  
  describe('state-объект', function() {
    
    it('Вызывает исключение, если не передали state-объект', function(){
  
      assert.throws(
        function(){
	      view.getScreen()},
	    Error,
	    'State Ojbect not send' 
      );
    });    
    
    it('Вызывает исключение, если не указано количество карт', 
      function(){
		
		var stateObject = {};
				
        assert.throws(
          function(){
	        view.getScreen(stateObject)},
	      Error,
	      'Cards count not set in state Object' 
        );
	  });
  });
  
  it('Должен возвращать разметку одного экрана игры по заданному state-объекту', function(){
    
    var stateObject = {
	
	  cardsCount: 6,
	  screenId: 0,
	  
	  className: [
	    'heart',
	    'diamond',
	    'club',
	    'heart',
	    'diamond',
	    'club'
	  ],
	  links: [
	    1,
	    2,
	    3,
	    4,
	    5,
	    6
	  ]
	};
    
    var screenTemplate = String()
      +'<div class="wrapper" id="s0">\n'    
        +'<div class="cardsContainer">\n'		
          +'<div><a class="heart" href="#s1"></a></div>\n'
          +'<div><a class="diamond" href="#s2"></a></div>\n'
          +'<div><a class="club" href="#s3"></a></div>\n'
          +'<div><a class="heart" href="#s4"></a></div>\n'
          +'<div><a class="diamond" href="#s5"></a></div>\n'
          +'<div><a class="club" href="#s6"></a></div>\n'  
        +'</div>\n' 
      +'</div>\n';      
	 
    assert.equal(screenTemplate, view.getScreen(stateObject));
  });  
        
});
