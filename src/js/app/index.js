require(['jquery', 'swiper', 'render', 'text!tbTpl', 'text!lrTpl'], function($, Swiper, render, tbTpl, lrTpl) {
    console.log(tbTpl);
    $(".switch-tab").on("click", 'span', function() {
        $(this).addClass("active").siblings().removeClass("active");
        var ind = $(this).index();
        if (ind == 1) {
            $(".line").addClass("move")
        } else {
            $(".line").removeClass("move")
        }

        $(".inner-content").eq(ind).show().siblings().hide();
    })



    function getData() {
        $.ajax({
            url: '/index',
            dataType: 'json',
            success: function(res) {
                console.log(res)
                initPage(res)
            },
            error: function(error) {
                console.warn(error)
            }
        })
    }


    function initPage(res) {

        //swiper
        var swiperData = res.items[0].data.data;

        render("#swiperTpl", swiperData, ".swiper-wrapper")

        //hot
        var hotData = res.items[1].data.data;

        $("#hot").html(tbTpl);

        render("#t-b-tpl", hotData, '#hot');

        //重磅推荐

        var recommendData = res.items[2].data.data;

        var firstRecommend = [];

        recommendData[0].isNum = true;

        firstRecommend.push(recommendData[0]);

        //注：必须要先放在界面内
        $("#first-recommend").html(lrTpl);

        // sourceTpl, data, targetEle

        render("#l-r-tpl", firstRecommend, "#first-recommend")

        render("#recomment-tpl", recommendData, "#not-first-list");


        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination'
        })

    }

    getData()
})