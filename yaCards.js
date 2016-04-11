/**
 * 
 * @version 0.1.0
 * @author Иван Большаков
 */
 
var model = require('./model');
var view  = require('./view');

model.init('hh');
model.run(printLayout);

function printLayout(stateObject) {

  console.log( view.getScreen(stateObject) );
};
