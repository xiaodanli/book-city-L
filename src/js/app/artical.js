require(['jquery', 'getRequest', 'storage', 'jsonp', 'base64', 'render'], function($, getRequest, storage, jsonp, base64, render) {
    var fiction_id = getRequest().fiction_id;
    var chapter_id = getRequest().chapter_id || storage.get("chapter_id") || 1;
    var _setT = $(".set-t"),
        _setB = $(".set-b"),
        _mask = $(".mask"),
        _stylePanel = $(".style-panel");
    $(".artical-con").on("click", function() {
        _setT.show();
        _setB.show();
        _mask.show();
    })


    _mask.on("click", function() {
        _setT.hide();
        _setB.hide();
        _mask.hide();
        _stylePanel.hide();
        $(".size").removeClass("active");
    })

    // 点返回

    $(".icon-circle-back").on("click", function() {
        window.location.href = "detail.html?fiction_id=" + fiction_id
    })

    //点字体
    $(".size").on("click", function() {
        _stylePanel.toggle();
        $(this).toggleClass("active")
    })

    // 点day
    $(".day").on("click", function() {
        $(this).toggleClass("change");
        var status = '';
        if ($(this).find("dd").html() == "白天") {
            status = "夜晚"
        } else {
            status = "白天"
        }

        $(this).find("dd").html(status)

    })

    var initSize = storage.get("fz") || 14; //初始字体大小


    //点大
    $(".large-btn").on("click", function() {
        if (initSize < 24) {
            initSize += 2
        }
        initSize
        $("p").css("font-size", initSize / 37.5 * 1 + "rem");
        storage.set("fz", initSize)
    })

    //点小
    $(".small-btn").on("click", function() {
        if (initSize > 12) {
            initSize -= 2
        }
        $("p").css("font-size", initSize / 37.5 * 1 + "rem");
        storage.set("fz", initSize)
    })

    function getArticalData(chapter_id) {
        $.ajax({
            url: '/api/articalUrl?chapter_id=' + chapter_id,
            dataType: 'json',
            success: function(res) {
                console.log(res);

                var url = res.jsonp;
                getArticalDetail(url);
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    function getArticalDetail(url) {
        jsonp({
            url: url,
            cache: true,
            callback: "duokan_fiction_chapter",
            success: function(res) {
                var deRes = decodeURIComponent(escape(base64.decode(res)));

                var parseRes = JSON.parse(deRes);

                render("#artical-tpl", parseRes, ".artical-con");


                $("p").css("font-size", initSize / 37.5 * 1 + "rem");

            }
        })
    }

    var _preBtn = $("#pre-btn"),
        _nextBtn = $("#next-btn"),
        _charpterNum = $("#charpter-num");

    //点击下一章
    _nextBtn.on("click", function() {
        //4
        if (chapter_id < 4) {
            chapter_id++;
            getArticalData(chapter_id);
            _preBtn.removeClass("disabled");
        }

        if (chapter_id == 4) {
            $(this).addClass("disabled");
        }
        _charpterNum.html(chapter_id + '/' + charpte_num);
        storage.set("chapter_id", chapter_id)
    })

    //点击上一章
    _preBtn.on("click", function() {
        console.log()
        if (chapter_id > 1) {
            chapter_id--;
            getArticalData(chapter_id);
            _nextBtn.removeClass("disabled");
        }

        if (chapter_id == 1) {
            $(this).addClass("disabled");
        }
        _charpterNum.html(chapter_id + '/' + charpte_num);
        storage.set("chapter_id", chapter_id)

    })

    //切换背景
    $(".bg-list").on("click", "li", function() {
        $(this).addClass("active").siblings().removeClass("active");
        var chooseBg = $(this).attr("bg-color");
        $(".artical-con").css("backgroundColor", chooseBg);
        storage.set("bg", chooseBg);
    })

    //目录

    $(".chapter").on("click", function() {
        window.location.href = "../../page/chapter-list.html?fiction_id=" + fiction_id + "&chapter_id=" + chapter_id;
    })

    var charpte_num, //所有章节的长度
        initBg = storage.get("bg") || "#f7eee5";

    //请求章节列表
    function getChapterList(fiction_id) {
        $.ajax({
            url: '/api/chapter?fiction_id=' + fiction_id,
            dataType: 'json',
            success: function(res) {
                charpte_num = res.item.toc.length;
                _charpterNum.html(chapter_id + '/' + charpte_num);
            },
            error: function(error) {
                console.warn(error)
            }

        })
    }

    function initPage() {
        getChapterList(fiction_id);
        //获取每章的内容
        getArticalData(chapter_id);
        $(".artical-con").css("backgroundColor", initBg);
        $(".bg-list li[bg-color=" + initBg + "]").addClass("active").siblings().removeClass("active");
        if (chapter_id == 1) {
            _preBtn.addClass("disabled")
        } else if (chapter_id == 4) {
            _nextBtn.addClass("disabled")
        }

    }



    //初始化页面
    initPage()

})