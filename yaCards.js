/**
 * 
 * @version 0.2.3
 * @author Иван Большаков
 */
 
var model = require('./model');
var view  = require('./view');

model.init('hssh');

console.log( view.getStyles(model.getCardsPosition()) );

model.run(printLayout);

function printLayout(stateObject) {

  console.log( view.getScreen(stateObject) );
};

