require(['jquery', 'renderHeader', 'getRequest', 'render', 'text!tbTpl', 'lazyload'], function($, renderHeader, getRequest, render, tbTpl, lazyload) {


    var fiction_id = getRequest().fiction_id;

    function getData() {
        $.ajax({
            url: '/api/detail?fiction_id=' + fiction_id,
            dataType: 'json',
            success: function(res) {
                console.log(res);
                initPage(res)
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    function initPage(res) {
        renderHeader({ title: res.item.title });

        render("#copyright-template", res.item, '.copyright');
        render("#tag-template", res.item, ".type-tags");
        render("#detail-template", res.item, '#detail');
        $("#other-list").html(tbTpl);
        render("#t-b-tpl", res.related, '#other-list');
        $(".content").show();

        $("#detail-wrap img[data-original]").lazyload({
            container: $("#detail-wrap"),
            effect: "fadeIn",
            threshold: 100,
            skip_invisible: false //需要用它加载不可见图像，我们需要将 skip_invisible设置为false
        })

        $("#start-btn").on("click", function() {
            var chapter_id = 1;
            // if (storage.get("chapter_id")) {
            //     chapter_id = storage.get("chapter_id")
            // }

            window.location.href = "artical.html?fiction_id=" + fiction_id + "&chapter_id=" + chapter_id;
        })
    }

    getData()
});