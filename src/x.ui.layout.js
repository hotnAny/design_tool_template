/*------------------------------------------------------------------------------------*
 *
 * ui layout (widgets and controls), based on jquery
 * 
 * by xiang 'anthony' chen, xiangchen@acm.org
 *
 *------------------------------------------------------------------------------------*/

var panel = $('<div></div>');
panel.css('width', WIDTHPANEL + 'px');
panel.css('height', '100%');
panel.css('color', '#000000');
panel.css('background-color', 'rgba(192, 192, 192, 0.5)');
panel.css('top', '0px');
panel.css('position', 'absolute');
panel.css('font-family', 'Helvetica');
panel.css('font-size', '12px');
panel.css('overflow', 'auto');

var title = $('<h3></h3>');
title.html('TEMPLATE');
title.css('margin-top', '10px');
title.css('margin-bottom', '10px');
title.css('margin-left', '10px');
title.css('margin-right', '10px');
panel.append(title);