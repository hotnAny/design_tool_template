/*------------------------------------------------------------------------------------*
 *
 * ui logic (event handlers, etc.), based on jquery
 *
 * by xiang 'anthony' chen, xiangchen@acm.org
 *
 *------------------------------------------------------------------------------------*/

var XAC = XAC || {};

$(document.body).append(panel);

var initPanel = function() {
	$(document).on('dragover', function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer = e.originalEvent.dataTransfer;
		e.dataTransfer.dropEffect = 'copy';
	});

	$(document).on('drop', function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer = e.originalEvent.dataTransfer;
		var files = e.dataTransfer.files;

		for (var i = files.length - 1; i >= 0; i--) {
			var reader = new FileReader();
			reader.onload = (function(e) {
				XAC.loadStl(e.target.result);
			});
			reader.readAsBinaryString(files[i]);
		}

	});
}

initPanel();
