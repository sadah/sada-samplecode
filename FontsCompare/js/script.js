/* Author: @sada_h */

$(function(){
    url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAW8eNXU_2rMxcstFUzwjw85fK-uJ2rRqk&callback=?';
    
    var fonts = {};
    var fontsList = document.getElementById('fonts-all');
    var allFontNames = [];

    $.getJSON(url,
        function(data){
            $.each(data.items, function(i,item){
                fonts[item.family] = item;
                allFontNames.push(item.family);
            });

            var fontNum = 0;
            var maxUrl = 1600;
            var cssBaseUrl = 'http://fonts.googleapis.com/css?family=';
            
            while(allFontNames.length >= fontNum){
                var cssUrl = cssBaseUrl;        
                while (cssUrl.length <= maxUrl){
                    cssUrl += escape(allFontNames[fontNum]) + '|';
                    fontNum++;
                }
                var cssLink = $("<link></link>").attr({
                    rel : "stylesheet",
                    type: "text/css",
                    href: cssUrl
                })
                $("head").append(cssLink);
            }

            for (var fontName in fonts) {
                div1 = $("<div></div>");
                div1.append("<label><input type='radio' name='fontFamily1' value='"+ fontName + "'> " + fontName + "</label>");
                div1.css({ fontFamily:fontName });
                $("#font-all-1").append(div1);
                
                div2 = $("<div></div>");
                div2.append("<label><input type='radio' name='fontFamily2' value='"+ fontName + "'> " + fontName + "</label>");
                div2.css({ fontFamily:fontName });
                $("#font-all-2").append(div2);
            }

        }
    );

    $("input[name='fontFamily1']:radio").live("change", function(){
        $(".l1").css({ fontFamily:$( this ).val() });
    });

    $("input[name='fontFamily2']:radio").live("change", function(){
        $(".l2").css({ fontFamily:$( this ).val() });
    });

});

