/*	Customer Service Helper making 
	@author Hyowon Choi
*/

$.fn.cshelper = function () {
	cshelper._initButton(this);
	cshelper._initModal(this);
}

var cshelper = {};

cshelper._openState = false;

cshelper._initButton = function($this) {
	var $helper_wrapper = $('<div class="helper-wrapper"></div>');
	var $helper = $('<div class="helper" onclick="cshelper._toggleModal();"></div>');
	
	$helper_wrapper.css({
		"position": "fixed",
		"bottom": "40px",
		"right": "40px",
		"z-index": "0"
	});
	
	$helper.css({
		"position": "relative",
		"overflow": "hidden",
		"margin": "0",
		"padding": "0",
		"float": "right",
		"width": "70px",
		"height": "70px",
		"cursor": "pointer",
		"transition": "background 0.3s",
		"border-radius": "35px",
		"background-repeat": "no-repeat",
		"background-size": "cover",
		"box-shadow": "1px 1px 3px black",
		"background-image": 'url("dist/img/ask_ic.png")'
	});
	
	$helper_wrapper.append($helper);
	$this.append($helper_wrapper);
}

cshelper._initModal = function($this) {
	var $dialog_form = $('<div id="dialog-form"></div>');
	var $dialog_name = $('<input type="text" placeholder="name">');
	var $dialog_email = $('<input type="text" placeholder="email">');
	var $dialog_content = $('<textarea rows="8" placeholder="contents"></textarea>');

	$dialog_form.css({
		"position": "fixed",
		"bottom": "120px",
		"right": "110px",
		"z-index": "0",
		"width" : "300px",
		"height" : "200px",
		"padding": "30px",
		"background-color": "red"
	});
	
	$dialog_name.css({
		"display" : "block",
		"width" : "100%"
	});
	
	$dialog_email.css({
		"display" : "block",
		"width" : "100%"
	});
	
	$dialog_content.css({
		"display" : "block",
		"width" : "100%"
	});
	
	$dialog_form.append($dialog_name);
	$dialog_form.append($dialog_email);
	$dialog_form.append($dialog_content);
	
	$("body").append($dialog_form);
	
	var $dialog = $("#dialog-form").dialog({
		autoOpen: false,
		height: 400,
		width: 350,
		modal: true,
	});
}

cshelper._toggleModal = function () {
	(cshelper._openState) ? cshelper._closeModal() : cshelper._openModal();
	console.log("Toggled : " + cshelper._openState);
}

cshelper._openModal = function () {
	cshelper._openState = true;
	$("#dialog-form").dialog( "open" );
}

cshelper._closeModal = function () {
	cshelper._openState = false;
	$("#dialog-form").dialog( "close" );
}
/***********************************************************************************************************/
