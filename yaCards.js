/**
 * 
 * @version 0.2.1
 * @author Иван Большаков
 */
 
var model = require('./model');
var view  = require('./view');

model.init('hcd chd');

console.log( view.getStyles(model.getCardsPosition()) );

model.run(printLayout);

function printLayout(stateObject) {

  console.log( view.getScreen(stateObject) );
};

