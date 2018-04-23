define(['jquery', 'render', 'text!headerTpl'], function($, render, headerTpl) {
    function renderHeader(obj) {
        $(".render-header").html(headerTpl);
        render("#header-tpl", obj, ".render-header");

        $(".icon-back").on("click", function() {
            history.go(-1)
        })


    }

    return renderHeader

})