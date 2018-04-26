define(function() {
    function getRequest() {
        var url = location.search;

        var params = {};

        /*
            {
                name:'lili',
                age:'18'
            }
        */

        // var url = "?fiction_id=352876&id=2";

        if (url.indexOf("?") != -1) {
            var str = url.substr(1);

            "&id=2"

            var arr = str.split("&");

            "[fiction_id=352876,id=2]"

            for (var i = 0, len = arr.length; i < len; i++) {
                var obj = arr[i].split("=");
                params[obj[0]] = obj[1]
            }
        }
        return params

    }
    return getRequest
})