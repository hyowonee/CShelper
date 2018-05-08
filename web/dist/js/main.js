// Prototype Functions
/* formatUnicorn @ Stack Overflow
 * For formatting strings based by key
 * Usage: "Hello, {person}.".formatUnicorn({ person: "Harry" });
 * Output: Hello, Harry.
 */
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

// Feature Functions
function toggleNavigation() {
    $(".nav").toggleClass("open");
	$(".hamburger").toggleClass("active");
    $(".wrapper").toggleClass("overwrapped");
}

function pageMove(id) {
    toggleNavigation();
    $('html, body').animate({scrollTop: $("#" + id).offset().top}, 1000, 'easeInOutQuint');
}

function toggleGlyphicon(cur) {
    if (cur.hasClass("glyphicon-menu-down")) {
        cur.removeClass("glyphicon-menu-down");
        cur.addClass("glyphicon-menu-up");
    } else {
        cur.removeClass("glyphicon-menu-up");
        cur.addClass("glyphicon-menu-down");
    }
}

var template_answer = '<div class="collapse cs-{type_string}-answer" id="ans{type_string}{index}">'
                    + '<div class="cs-{type_string}-answer-header">A.</div>'
                    + '<div class="cs-{type_string}-answer-message">{message_answer}</div>'
                    + '</div>';

// jQuery Document Ready Event
$(document).ready(function() {
    var $cs = $(".cs-item-wrapper");
    var counter = [1, 1, 1];

    $.post( "ajax/test.html", function( data ) {
        data.forEach(function(value, index, array) {
            var type = function() {
                if (value.type == 1) return "notice";
                else if (value.type == 2) return "faq";
                else return "qna";
            }();
            var count = counter[value.type - 1]++;
            var ret = $('<div class="cs-item"></div>');
            ret.addClass("cs-" + type);
            ret.attr("id", type + count);
            ret.attr("data-index", index);
            ret.append($('<div class="cs-' + type + '-header">' + 
                function () {
                    if (type == "notice") return "공지사항";
                    else if (type == "faq") return "FAQ";
                    else return "Q&A";
                }() + '</div>'));
            ret.append($('<div class="cs-' + type + '-title">' + (type == "notice" ? "" : "Q. ") + 
                value.message + '</div>'));

            if (type == "faq" || type == "qna") {
                ret.append('<span class="glyphicon glyphicon-menu-down"></span>');
                ret.append(template_answer.formatUnicorn({"index": count, "type_string": type, "message_answer": value.message_answer.replace(/\n/gi, "<br>")}));
            }

            $cs.append(ret); // 이런 식으로 
        });
    });
    
    $(".btn-info").click(function() {
        if($(this).hasClass("notice")) {
            $(".cs-notice").css("display", "block");
            $(".cs-faq").css("display", "none");
            $(".cs-qna").css("display", "none");
            $(".btn-writing").css("display", "none");
        }
        else if($(this).hasClass("FAQ")) {
            $(".cs-notice").css("display", "none");
            $(".cs-faq").css("display", "block");
            $(".cs-qna").css("display", "none");
            $(".btn-writing").css("display", "none");
        }
        else {
            $(".cs-notice").css("display", "none");
            $(".cs-faq").css("display", "none");
            $(".cs-qna").css("display", "block");
            $(".btn-writing").css("display", "block");
        }
    });

    $(".btn-writing").click(function() {
        $("#modal-qna").modal("show");
    });

    $(".cs-item").click(function() {
        if ($(this).hasClass("cs-notice")) {
            var temp_data = data[$(this).attr('data-index')];
            $("#modal-notice .modal-title").html(temp_data.message);
            $("#modal-notice .modal-body p").html(temp_data.message_detail.replace("\n", "<br>"));
            $("#modal-notice").modal("show");
        }
        else if ($(this).hasClass("cs-faq")) {
            var tempid = $(this).attr('id');
            $("#ans"+tempid).collapse('toggle');
            toggleGlyphicon($(this).find(".glyphicon"));
        }
        else {
            var tempid = $(this).attr('id');
            $("#ans"+tempid).collapse('toggle');
            toggleGlyphicon($(this).find(".glyphicon"));
        }
    });

    $(".btn-modal-qna.btn-primary").click(function() {
        // TODO Network Transaction Needed
        var ret = {
            title: $("#qna-title").val(),
            content: $("#qna-content").val()
        };
        console.log(ret);
    });
	
	$("body").cshelper();

});