// dependencies
define(["libs/underscore"], function(_) {

    // screenshot
    function create (options) {
        if (options.$el.find('svg').length > 0) {
            _fromSVGtoPNG (options);
        } else {
            _fromCanvas (options);
        }
    };
    
    // from jqplot
    function _fromCanvas (options) {
        try {
            var $canvas = options.$el.find('.jqplot-target');
            var imgData = $canvas.jqplotToImageStr({});
            if (imgData) {
                window.location.href = imgData.replace('image/png', 'image/octet-stream');
            }
        } catch (err) {
            console.debug('FAILED - Screenshot::_fromCanvas() - ' + err);
            if (options.error) {
                options.error(err);
            }
        }
    };
    
    // from svg
    function _fromSVGtoPNG (options) {
       
        // get parameters
        var $el = options.$el;
        var screenshot_url = options.url;
        var name = options.name;
       
        // serialize svg
        var serializer = new XMLSerializer();
        var self = this;
       
        // create canvas
        var canvas = document.createElement('canvas');
        var $canvas = $(canvas);
       
        // get svg dimensions
        var nsvgs  = $el.find('svg').length;
        var first = $el.find('svg').first();
        var height = parseInt(first.css('height'));
        var width  = parseInt(first.css('width'));
       
        // set canvas dimensions
        $canvas.attr('width', width*nsvgs);
        $canvas.attr('height', height);
       
        // check context support
        if (!canvas.getContext || !canvas.getContext('2d')) {
            alert ("Your browser doesn't support this feature, please use a modern browser");
        }
       
        // context
        var ctx = canvas.getContext('2d');
       
        // write all svgs
        var offsetX = 0;
        $el.find('svg').each(function() {
            // get svg element
            var $svg = $(this);
            
            // configure svg
            $svg.attr({
                version : '1.1',
                xmlns   : 'http://www.w3.org/2000/svg',
                width   : width,
                height  : height
            });

            // create xml string
            var xmlString = serializer.serializeToString(this);
            
            // draw into canvas
            ctx.drawSvg(xmlString, offsetX, 0, width, height)
            
            // shift offset for multipanel charts
            offsetX += width;
        });
       
        // post image
        window.location.href = _canvasToImage(canvas, canvas.getContext('2d'), 'white').replace('image/png', 'image/octet-stream');
    };
    
    function _canvasToImage(canvas, context, backgroundColor)
    {
        //cache height and width		
        var w = canvas.width;
        var h = canvas.height;
     
        var data;
     
        if(backgroundColor)
        {
            //get the current ImageData for the canvas.
            data = context.getImageData(0, 0, w, h);
     
            //store the current globalCompositeOperation
            var compositeOperation = context.globalCompositeOperation;
     
            //set to draw behind current content
            context.globalCompositeOperation = "destination-over";
     
            //set background color
            context.fillStyle = backgroundColor;
     
            //draw background / rect on entire canvas
            context.fillRect(0,0,w,h);
        }
     
        //get the image data from the canvas
        var imageData = canvas.toDataURL("image/png");
     
        if(backgroundColor)
        {
            //clear the canvas
            context.clearRect (0,0,w,h);
     
            //restore it with original / cached ImageData
            context.putImageData(data, 0,0);
     
            //reset the globalCompositeOperation to what it was
            context.globalCompositeOperation = compositeOperation;
        }
     
        //return the Base64 encoded data url string
        return imageData;
    };

    // css inliner
    function _inline ($target) {
        for (var sheet_id in document.styleSheets) {
            var sheet = document.styleSheets[sheet_id];
            var rules = sheet.cssRules;
            if (rules) {
                for (var idx = 0, len = rules.length; idx < len; idx++) {
                    try {
                        $target.find(rules[idx].selectorText).each(function (i, elem) {
                            elem.style.cssText += rules[idx].style.cssText;
                        });
                    } catch(err) {
                    }
                }
            }
        }
    };
    
// return
return {
    create: create
};

});
