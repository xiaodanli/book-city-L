define(['jquery', 'handlebars'], function($, Handlebars) {
    function render(sourceTpl, data, targetEle) {
        var swiperTpl = $(sourceTpl).html();
        var template = Handlebars.compile(swiperTpl);


        Handlebars.registerHelper("addInd", function(ind) {
            ind += 1;
            return ind
        })


        Handlebars.registerHelper("status", function(status) {
            if (status) {
                return "完结"
            } else {
                return "连载中"
            }
        })

        Handlebars.registerHelper("equal", function(ind, num, options) {
            if (ind == num) {
                return options.fn(this)
            } else {
                return options.inverse(this)
            }
        })

        Handlebars.registerHelper("limit", function(param1, param2, options) {
            if (param1 < 5) {
                return options.fn(this)
            } else {
                return options.inverse(this)
            }
        })

        var html = template(data);
        $(targetEle).html(html);
    }

    return render
})