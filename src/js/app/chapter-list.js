require(['jquery', "getRequest", 'renderHeader', 'render', 'BScroll'], function($, getRequest, renderHeader, render, BScroll) {
    renderHeader({ title: "目录" })
    var fiction_id = getRequest().fiction_id;
    console.log(getRequest())
    var chapter_id = getRequest().chapter_id;
    console.log("------", chapter_id)

    function getChapterData() {
        $.ajax({
            url: '/api/chapter?fiction_id=' + fiction_id,
            dataType: 'json',
            success: function(res) {
                render("#chapter-template", res.item, ".chapter-list");
                var scroll = new BScroll(".chapter-wrap", {
                    click: true
                });
                console.log("chapter_id", chapter_id)
                if (chapter_id) {
                    scroll.scrollToElement($(".chapter-list li").eq(chapter_id)[0]);
                    $(".chapter-list li").eq(chapter_id).addClass("active");
                } else {
                    scroll.scrollToElement($(".chapter-list li:last")[0]);
                    $(".chapter-list li:last").addClass("active");
                }



            },
            error: function(error) {
                console.warn(error)
            }
        })
    }

    getChapterData()
})