/* FileSaver.js demo script
 * 2011-08-02
 * 
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/* 
 * 2011-08-16
 * Modified By sada_h, http://twitter.com/sada_h
 */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/demo/demo.js */

(function(view) {
"use strict";
// The canvas drawing portion of the demo is based off the demo at
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
var
	  document = view.document
	, $ = function(id) {
		return document.getElementById(id);
	}
	, session = view.sessionStorage
	// only get URL when necessary in case BlobBuilder.js hasn't defined it yet
	, get_blob_builder = function() {
		return view.BlobBuilder || view.WebKitBlobBuilder || view.MozBlobBuilder;
	}
	, text = $("zentext")
	, text_submit = $("zentext-submit")
	, text_filename = $("zentext-filename")
;

text_submit.addEventListener("click", function(event) {
	event.preventDefault();
	var BB = get_blob_builder();
	var bb = new BB;
	bb.append(text.value || text.placeholder);
	saveAs(
		  bb.getBlob("text/plain;charset=" + document.characterSet)
		, (text_filename.value || text_filename.placeholder)
	);
}, false);

view.addEventListener("unload", function() {
	session.text = text.value;
	session.text_filename = text_filename.value;
}, false);
}(self));