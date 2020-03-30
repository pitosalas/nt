$(function() {
    // disable when no input
    // listen to input
    $("body").delegate(".comment", "propertychange input", function() {
        // check input
        if ($(this).val().length > 0) {
            // enable button
            $(".send").prop("disabled", false);
        } else {
            // disable button
            $(".send").prop("disabled", true);
        }
    });
    // var number = $.getCookie("pageNumber") || 1;
    var number = window.location.hash.substring(1) || 1;
    getMsgPage();

    function getMsgPage() {
        $(".page").html("");
        // tweet?act=get_page_count	get total page number
        $.ajax({
            type: "get",
            url: "/tweet",
            data: "act=get_page_count",
            success: function(msg) {
                // console.log(msg);
                var obj = eval("(" + msg + ")");
                // console.log(obj);
                for (var i = 0; i < obj; i++) {
                    console.log(i);
                    var $a = $("<a href=\"javascript:;\">" + (i + 1) + "</a>");
                    if (i === (number - 1)) {
                        $a.addClass("cur");
                    }
                    $(".page").append($a);
                }
            },
            error: function(xhr) {
                alert(xhr.status);
            }
        });
    }

    // console.log(number);
    getMsgList(number);

    function getMsgList(number) {
        $(".messageList").html("");
        $.ajax({
            type: "get",
            url: "/tweet",
            data: "act=get_tweet_list&page=" + number,
            success: function(msg) {
                var obj = eval("(" + msg + ")");
                $.each(obj, function(key, value) {
                    // console.log(value);
                    // create entry
                    var $tweet = createEle(value);
                    $tweet.get(0).obj = value;
                    // add new tweet
                    $(".messageList").append($tweet);
                });
            },
            error: function(xhr) {
                alert(xhr.status);
            }
        });
    }
    // listen to send 
    $(".send").click(function() {
        // get user input
        var $text = $(".comment").val();
        var obj = { tweet: $text };
        // // create entry
        // var $tweet = createEle($text);
        // // insert tweet
        // $(".messageList").prepend($tweet);
        $.ajax({
            type: "POST",
            url: "/tweet",
            // data: "tweet=" + $text,
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(obj),
            success: function(msg) {
                // var obj = eval("(" + msg + ")");
                // obj.content = $text;
                // console.log(obj);
                // create entry
                var $tweet = createEle($text);
                // $tweet.get(0).obj = obj;
                // insert tweet
                $(".messageList").prepend($tweet);
                // clear input box
                $(".comment").val("");
                // get new page count
                getMsgPage();
                // delete the oldeest tweet
                if ($(".info").length > 10) {
                    $(".info:last-child").remove();
                }
            },
            error: function(xhr) {
                alert(xhr.status);
            }
        });
    });
    // listen to click on next page
    $("body").delegate(".page>a", "click", function() {
        $(this).addClass("cur");
        $(this).siblings().removeClass("cur");
        // console.log($(this).html());
        getMsgList($(this).html());
        // save hit page
        // $.addCookie("pageNumber", $(this).html());
        window.location.hash = $(this).html();
    });
    // create new entry
    function createEle(text) {
        var $tweet = $("<div class=\"info\">\n" +
            "            <p class=\"infoText\">" + text + "</p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\">" + formartDate() + "</span>\n" +
            "            </p>\n" +
            "        </div>");
        return $tweet;
    }

    // create date 
    function formartDate() {
        var date = new Date();
        // 3-30-2020 21:30:23
        var arr = [date.getMonth() + 1 + "-",
            date.getDate() + " ",
            date.getFullYear() + "-",
            date.getHours() + ":",
            date.getMinutes() + ":",
            date.getSeconds()
        ];
        return arr.join("");

    }
});