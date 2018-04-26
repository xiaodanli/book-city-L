require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': 'libs/jquery-2.1.1.min',
        'swiper': 'libs/swiper.min',
        'handlebars': 'libs/handlebars-v4.0.11',
        'text': 'libs/text',
        'lazyload': 'libs/jquery.lazyload',
        'BScroll': 'libs/bscroll',
        'jsonp': 'libs/jquery.jsonp',
        'base64': 'libs/jquery.base64',


        //util
        'render': 'util/render',
        'renderHeader': 'util/header',
        'getRequest': 'util/getRequest',
        'storage': 'util/storage',

        //页面js
        'index': 'app/index',
        'search': 'app/search',
        'detail': 'app/detail',
        'chapterList': 'app/chapter-list',
        'artical': 'app/artical',

        'tbTpl': '../page/tpl/book-t-b-list.html',
        'lrTpl': '../page/tpl/book-l-r-list.html',
        'headerTpl': '../page/tpl/header.html',
        'searchTpl': '../page/tpl/book-l-r-s-list.html'
    },
    shim: {
        'lazyload': {
            deps: ['jquery']
        }
    }
})