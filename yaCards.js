/**
 * 
 * @version 1.0.0
 * @author Иван Большаков
 */
 
var model = require('./model');
var view  = require('./view');

function beep(stateObj) {
	
	console.log( view.getScreen(stateObj) );
};

model.init('h c d c h d');
model.run(beep);
