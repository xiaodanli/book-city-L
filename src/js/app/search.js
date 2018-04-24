require(['jquery', 'renderHeader', 'text!searchTpl', 'render'], function($, renderHeader, searchTpl, render) {
    renderHeader({ isSearch: true });

    var _ipt = $("#ipt"),
        _searchList = $(".search-list"),
        _typeTags = $(".type-tags");

    $(".search-input-btn").on("click", function() {
        var val = _ipt.val();
        _typeTags.hide();
        _searchList.show();
        if (!val) {
            _searchList.html("<p>搜索内容为空</p>")
        } else {
            search(val)
        }

    })

    _ipt.on("input", function() {
        if (!$(this).val()) {
            _typeTags.show();
            _searchList.hide();
        }
    })

    _typeTags.on("click", "li", function() {
        var val = $(this).html();
        _ipt.val(val);
        search(val);
        _typeTags.hide();
        _searchList.show();
    })

    function search(val) {
        $.ajax({
            url: '/api/search?keyword=' + val,
            dataType: 'json',
            success: function(res) {
                console.log(res)
                if (res.length > 0) {
                    _searchList.html(searchTpl);
                    render("#search-template", res, ".search-list");
                } else {
                    _searchList.html("<p>抱歉，暂无匹配数据</p>")
                }
            },
            error: function(error) {
                console.log(error)
            }
        })
    }
})