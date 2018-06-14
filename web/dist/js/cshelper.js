/*	Customer Service Helper making 
	@author Hyowon Choi
*/

$.fn.cshelper = function () {
	cshelper._initButton(this);
	cshelper._initModal(this);
}

var cshelper = {
	_openState: false,
	_fileArray: []
};

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
	var $dialog_template = '<div id="cshelper_dialog">'
						 + '<div class="cshelper_dialog-header"><h6 class="cshelper_dialog-header-text">관리자에게 문의하기</h6></div>'
						 + '<div class="cshelper_dialog-body"><form>'
						 + '<div class="form-group">'
						 + '<input type="text" class="form-control" id="cshelper_form-name" placeholder="이름"></div>'
						 + '<div class="form-group">'
						 + '<input type="email" class="form-control" id="cshelper_form-email" placeholder="E-mail"></div>'
						 + '<div>'
						 + '<textarea class="form-control" id="cshelper_form-text" rows="4" placeholder="문의 사항이나 제품에 대한 피드백을 써주세요."></textarea></div>'
						 + '<label class="cshelper_fileContainer"></label></form>'
						 + '<label class="cshelper_fileContainer">'
						 + '<div class="cshelper_file-contents"><img src = "dist/img/attachment_ic.png">&nbsp;&nbsp;파일을 추가하거나 여기에 드롭</div><input type="file" class="cshelper_select-file" id="cshelper_files" name="cshelper_files[]" multiple /></label>'
						 + '<div id="cshelper_file-list"></div>'
						 + '<div class="cshelper_approval-personal-info"><span class="cshelper_star">★</span> 문의 접수는 개인정보 (이메일) 취급에 동의하는 것으로 간주합니다.</div>'
						 + '<div class="cshelper_btn-wrapper">'
						 + '<button class="cshelper_btn-sending">보내기</button></ssdiv></div></div>';

	$("body").append($dialog_template);
	document.getElementById('cshelper_files').addEventListener('change', cshelper._handleFileSelect, false);

	$('.cshelper_btn-sending').on('click', function() {
		cshelper._sendArticle();
	});
}

cshelper._handleFileSelect = function (evt) {	
	console.log(evt.target.files);
	var files = evt.target.files;
	for (var i = 0, f; f = files[i]; i++) {
		cshelper._fileArray.push(f);
	}
	console.log(cshelper._fileArray);		
	cshelper._renderFiles();
}

cshelper._renderFiles = function () {
	if (cshelper._fileArray.length == 0) {
		$("#cshelper_file-list").css({
			"display" : "none"
		});
		return;
	}

	$("#cshelper_file-list").html(cshelper._fileArray.map(function(f, i) {
		return '<div class="cshelper_file-content-wrapper"><span class="cshelper_file-name">' + f.name + '</span>' + ' <div class="cshelper_btn-delete-wrapper"><button type="button" class="cshelper_btn-warning cshelper_btn-delete-file" onclick="cshelper._deleteFiles(' + i + ')">삭제</button></div></div>'
	}).join(""));

	$("#cshelper_file-list").css({
		"display" : "block"
	});
}

cshelper._deleteFiles = function(index) {
	cshelper._fileArray.splice(index, 1);
	cshelper._renderFiles();
}

cshelper._toggleModal = function () {
	(cshelper._openState) ? cshelper._closeModal() : cshelper._openModal();
	console.log("Toggled : " + cshelper._openState);
}

cshelper._openModal = function () {
	cshelper._openState = true;
	$("#cshelper_dialog").css({
		"display" : "block"
	});
	// $(".helper").css("background-image", 'url("dist/img/ask_close_ic.png")');
}

cshelper._closeModal = function () {
	cshelper._openState = false;
	$("#cshelper_dialog").css({
		"display" : "none"
	});

	$(".helper").css("background-image", 'url("dist/img/ask_ic.png")');
}

cshelper._sendArticle = function () {
	// Form
	var ret = {
        name: $("#cshelper_form-name").val(),
        email: $("#cshelper_form-email").val(),
        content: $("#cshelper_form-text").val()
 	};

    // Validation
    var nameForm = $("#cshelper_form-name").val();
    var emailAddrForm = $("#cshelper_form-email").val();
    var nameExp = /^[a-zA-Z가-힣]*$/;
    var emailExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	if (!(cshelper._fileArray.map((v) => (v.name.match(/\.(jpg|gif|tif|bmp|png)$/i)) ? true : false).every((v) => v))) {
		// Assertion Failed 
		alert("파일을 형식에 맞게 다시 올려주세요.\n이미지 파일(.jpg, .gif, .tif, .bmp, .png)만을 업로드 하실 수 있습니다.");
		return;
	}

	if (nameForm.match(nameExp) == null || nameForm == "") {
		alert("이름을 형식에 맞게 다시 입력해 주세요.");
		return;
	}

	if (emailAddrForm.match(emailExp) == null || emailAddrForm == "") {
		alert("이메일을 형식에 맞게 다시 입력해 주세요.");
		return;
	}

	// Packaging
	var form_data = new FormData();
	form_data.append("name", ret.name);
	form_data.append("email", ret.email);
	form_data.append("content", ret.content);
	cshelper._fileArray.forEach(function (value, index, array) {
		form_data.append("files[]", value, value.name);
	});

	console.log(form_data);

    // Send
    // $.ajax({
    //     url: 'upload.php', // TODO Need to change
    //     type: 'POST',

    //     data: form_data,
    //     cache: false,
    //     contentType: false,
    //     processData: false,

    // });
}
