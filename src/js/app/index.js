require(['jquery', 'swiper'], function($, Swiper) {
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

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: '.swiper-pagination'
    })
})