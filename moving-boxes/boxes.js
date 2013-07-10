// @author Michael Vorburger
// LICENSE GPL v3

jQuery.uiBackCompat = false; // http://blog.jqueryui.com/2011/03/api-redesigns-the-past-present-and-future/

var myRootRef = new Firebase('https://mui1.firebaseIO.com/');

var model2dom = function(model, dom) {
	dom.innerHTML = model.label;
	
/* commented out because it didn't really work - Firebase never actually deleted the old values
	// TODO DevGuide: This is how to support "on-the-fly model migration" - support both old & new:
	if (!model.pos) {
		model.pos = { x: model.x, y: model.y };		
		// clear/delete the old model.x & model.y properties:
		delete model.x;
		delete model.y;
		// Note this MUST use set() instead of update()
		dom.mui.ref.set(model); // TODO Should be automatic.. note set() vs. update()
	}		
*/	
	dom.style.left = model.pos.x + 'px';
	dom.style.top = model.pos.y + 'px';
};

var dragableOptions = {
	cursor: 'crosshair',
	stop: function(e, ui) {
		var newPos = ui.position; // TODO ui.position vs. ui.offset is unclear to me..
		var domO = e.target;

		var model = domO.mui.model;
		model.pos = { x: newPos.left, y: newPos.top };
		domO.mui.ref.update(model); // TODO Should be automatic?
    }
};

var newDOM = function(model, ref) {
	var boxDOM = document.createElement('div');
	
	boxDOM.mui = {};
	boxDOM.mui.model = model;
	boxDOM.mui.ref = ref;

	boxDOM.className = 'box';
	model2dom(model, boxDOM);
	document.getElementById('body').appendChild(boxDOM);

	$(boxDOM).draggable(dragableOptions);
	
	// TODO separate the DnD DIV from the Box DIV/Span.. use handle to allow DnD + contentEditable together:
	// 		http://stackoverflow.com/questions/10317128/how-to-make-a-div-contenteditable-and-draggable
	//		http://stackoverflow.com/questions/4954994/how-can-i-enable-draggable-on-a-element-with-contenteditable/6603190#6603190
	// boxDOM.contentEditable = true;
	// TODO where function() { model.label = dom.innerHTML }
	// TODO use better editor? http://stackoverflow.com/questions/6259112/is-there-a-cross-browser-jquery-contenteditable-library
	
	return boxDOM;
};

$(function() {
	myRootRef.on('child_added', function(snapshot) {
		var boxDOM = newDOM(snapshot.val(), snapshot.ref());
		
		boxDOM.mui.ref.on('value', function(snapshot) {
			var model = snapshot.val();
			model2dom(model, boxDOM);
		});
	});
	
});
