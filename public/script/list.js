        var pageToRequest = 1;
        var itemState = 1;
        var requestEnd = 0;
        var inRequest = 0;


     Handlebars.registerHelper("getDate", function (created) {
            var d = new Date(created);
            var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
            return datestring;
            // var html = "<ul>";
            // html += "<li>" + datestring + "</li>";
            // html += "</ul>";
            // return html;
        });
        Handlebars.registerHelper("getStateTitle", function (id) {
            if (itemState == 1) {
                return "memorized";
            } else {
                return "forgot";
            }
        });
        var getStateTitle = function (id) {

            console.log("update item : " + id);
            stopProp
        }
        
        
        
        	var requestItems = function() {
               if (requestEnd == 1) {
                    console.log('request ended');
                    $('.loading-div').remove();

                    return;
                }

                if (inRequest == 1) {
                    return;
                }
                
                var raw_template = $('#card-template').html();
                // Complile that into an handlebars template
                var template = Handlebars.compile(raw_template);
                // Retrieve the placeHolder where the posts will be displayed
                var placeHolder = $('#content');
                placeHolder.append("<div class='loading-div col-12'><div class='loading-text'><i class='fas fa-spinner fa-spin'></i></div></div>");
                $(window).scrollTop($(document).height());
                console.log("===============request");
                inRequest = 1;
                $.getJSON("/api/items/page/" + pageToRequest + "?state=" + itemState, {}, function (data) {
                    inRequest = 0;
                    console.log(data);
                    pageToRequest++;
                    console.log("length" + data.items.length);
                    if (data.items.length == 0) {
                        requestEnd = 1;
                    }

                    $('.loading-div').remove();
                    data.items.forEach(function (item) {
                        var html = template(item);
                        placeHolder.append(html);
                    });
                    $('.card-desc-block').unbind('click');
					$('.card-desc-block').click(function (evt) {
						console.log(this);
						$(this).toggleClass('hidden');
						evt.preventDefault();
						return false;
					});

					$('.card-title-edit').click(function (evt) {
						var urlToRequest = "/items/" + this.id;
						console.log("location : " + urlToRequest);
						window.location.href = urlToRequest;
	// 					window.location.replace(urlToRequest);
						evt.preventDefault();
						return false;
					});

                    $(".card-update-button").click
                    (
                        function (evt)
                        {
                            //YOUR CODE HERE
                            // console.log(evt.target);
                            var button = $(this);
                            // $(this).text("hi");
                            var urlToRequest = "/api/items/memorized/" + evt.target.id;
                            if (itemState == 2) {
                                var urlToRequest = "/api/items/forgot/" + evt.target.id;
                            }
                            $.ajax({
                                url: urlToRequest,
                                success: function (data) {
                                    console.log(data.result);
                                    if (data.result == "success") {
                                        // console.log(button.parent());
                                        button.parent().parent().parent().addClass("memorized");
                                        // button.text('hi');
                                    }
                                }
                            });

                            evt.preventDefault();
                            return false;
                        }
                    );
                    $('.card-close-btn').click(function (evt) {
                        console.log(this);
                        if (confirm('Delete?')) {
                            var urlToRequest = "/items/" + evt.target.id + "?_method=DELETE";
                            console.log("url " + urlToRequest);
                            $.ajax({
                                url: urlToRequest,
                                success: function (data) {
                                    window.location.replace("/items");
                                },
                                data:{},
                                type: 'POST'
                            });

                        } else {
                        }
                        evt.preventDefault();
                        return false;
                    });
                    $('.card-check-box').change(function(evt) {
                        // this will contain a reference to the checkbox
                        if (this.checked) {
                            console.log('checked');
                            var button = $(this);
                            var urlToRequest = "/api/items/memorized/" + evt.target.id;
                            if (itemState == 2) {
                                var urlToRequest = "/api/items/forgot/" + evt.target.id;
                            }
                            $.ajax({
                                url: urlToRequest,
                                success: function (data) {
                                    console.log(data.result);
                                    if (data.result == "success") {
                                        // console.log(button.parent());
                                        button.parent().parent().parent().parent().parent().addClass("memorized");
                                        // button.text('hi');
                                    }
                                }
                            });

                            evt.preventDefault();
                            return false;

                        } else {
                            console.log('unchecked');
                        }
                    });
                });
		};
		
		
		    var getTitle = function() {
        if (itemState == 1) {
            document.write("Items to memorize");
        } else {
            document.write("Items memorized");
        }
    }
    var getUpdateTitle = function() {
        if (itemState == 1) {
            document.write("Move to memorized");
        } else {
            document.write("Move to memorizes");
        }
    }
    var updateContent = function(evt) {
        if (itemState == 1) {
            itemState = 2;
        } else {
            itemState = 1;
        }
        pageToRequest = 1;

        $('#main-title').text(itemState == 1 ? "Items to memorize" : "Items memorized");
        $('#update-content-button').text(itemState == 1 ? "Move to memorized" : "Move to memorize");
        var placeHolder = $('#content');
        placeHolder.empty();
		requestEnd = 0;

		requestItems();        
    }
    
    