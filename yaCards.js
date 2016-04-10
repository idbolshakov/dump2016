/**
 * 
 * @version 0.1.0
 * @author Иван Большаков
 */
 
var model = require('./model');
var view  = require('./view');

function printLayout(stateObject) {

  console.log( view.getScreen(stateObject) );
};

model.init('h c d c h d');
model.run(printLayout);
