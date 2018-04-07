var pageToRequest = 1;
var itemState = 1;
var requestEnd = 0;
var inRequest = 0;

var getStateTitle = function (id) {

    console.log("update item : " + id);
    // stopProp
}


var requestItems = function () {
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
    if (pageToRequest > 1) {
        $(window).scrollTop($(document).height());
    }
    console.log("===============request");
    inRequest = 1;
    itemState = getState();
    $.getJSON("/api/items/page/" + pageToRequest + "?state=" + itemState, {}, function (data) {
        inRequest = 0;
        $('.loading-div').remove();
        console.log(data);
        console.log("length" + data.items.length);
        if (data.items.length == 0) {
            requestEnd = 1;
            if (pageToRequest == 1) {
                placeHolder.append("<div class='loading-div col-6'><i class='far fa-thumbs-up''></i></div>");
            }
        }
        pageToRequest++;

        data.items.forEach(function (item) {
            var html = template(item);
            // placeHolder.append(html);
            // console.dir(">>>>>>>>>>>" + html);
            var elements = $(html);
            placeHolder.append(elements);


            $('.card-desc-block', elements).unbind('click');
            $('.card-desc-block', elements).click(function (evt) {
                console.log(this);
                $(this).toggleClass('hidden');
                evt.preventDefault();
                return false;
            });

            $('.card-title-edit', elements).click(function (evt) {
                var urlToRequest = "/items/" + this.id;
                console.log("location : " + urlToRequest);
                window.location.href = urlToRequest;
                // 					window.location.replace(urlToRequest);
                evt.preventDefault();
                return false;
            });

            $(".card-update-button", elements).click
            (
                function (evt) {
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
            $('.card-close-btn', elements).click(function (evt) {
                console.log(this);
                if (confirm('Delete?')) {
                    var urlToRequest = "/items/" + evt.target.id + "?_method=DELETE";
                    console.log("url " + urlToRequest);
                    $.ajax({
                        url: urlToRequest,
                        success: function (data) {
                            // window.location.replace("/items");
                            // requestItems();
                            updateContent();
                        },
                        data: {},
                        type: 'POST'
                    });

                } else {
                }
                evt.preventDefault();
                return false;
            });
            $('.card-forget-check-box', elements).change(function (evt) {
                // this will contain a reference to the checkbox
                if (this.checked) {
                    console.log('checked');
                    var button = $(this);
                    // var urlToRequest = "/api/items/memorized/" + evt.target.id;
                    // if (itemState == 2) {
                    var urlToRequest = "/api/items/forgot/" + evt.target.id;
                    // }
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
            $('.card-remember-check-box', elements).change(function (evt) {
                // this will contain a reference to the checkbox
                if (this.checked) {
                    console.log('checked');
                    var button = $(this);
                    var urlToRequest = "/api/items/memorized/" + evt.target.id;
                    // if (itemState == 2) {
                    //     var urlToRequest = "/api/items/forgot/" + evt.target.id;
                    // }
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
            $('.card-forget-check-text', elements).css('color', '#474747');
            $('.card-remember-check-text', elements).css('color', '#474747');
            if (itemState == 1) {
                $('.card-forget-check-text', elements).css('color', '#adadad');
                $('.card-forget-check-box', elements).prop('disabled', true);
            }
            else if (itemState == 5) {
                $('.card-remember-check-text', elements).css('color', '#adadad');
                $('.card-remember-check-box', elements).prop('disabled', true);
            }

            var d = new Date(item.remembered);
            // console.log('item.remembered : ' + item.remembered);
            var remained = remainedHours(d);
            if (remained <= 0) {
                $('.card-state-div', elements).show();
            } else {
                $('.card-state-div', elements).hide();
            }
        });


    });
};


var setTitle = function () {
    if (itemState == 1) {
        // document.write("Don't Know");
        $('#main-title').text("NEW");
    } else if (itemState == 2) {
        // document.write("Maybe Know");
        $('#main-title').text("1'st Turn");
    } else if (itemState == 3) {
        // document.write("Remembered");
        $('#main-title').text("2'st Turn");
    } else if (itemState == 4) {
        // document.write("Can't forget");
        $('#main-title').text("3'st Turn");
    } else if (itemState == 5) {
        // document.write("Can't forget");
        $('#main-title').text("Long-Term Memory");
    }
};
var getUpdateTitle = function () {
    if (itemState == 1) {
        document.write("Move to memorized");
    } else {
        document.write("Move to memorizes");
    }
};

function setState(state) {
    localStorage['state'] = state;
}


function getState() {
    var state = localStorage['state'] || 1;
    return state;
}

var updateContent = function (state) {
    // if (itemState == 1) {
    //     itemState = 2;
    // } else {
    //     itemState = 1;
    // }

    if (state != undefined) {
        setState(state)
        itemState = state;
    }
    pageToRequest = 1;

    // $('#main-title').text(itemState == 1 ? "Items to memorize" : "Items memorized");
    //
    // $('#update-content-button').text(itemState == 1 ? "Move to memorized" : "Move to memorize");
    setTitle();
    var placeHolder = $('#content');
    placeHolder.empty();
    requestEnd = 0;

    requestItems();
};
    
    