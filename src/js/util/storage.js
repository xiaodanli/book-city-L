define(function() {
    var storage = window.localStorage;

    /*
        setItem  存储数据 （key,val） val  string
        getItem  获取数据  (key)  'string'
        clear   清除所有数据  ()
        removeItem 删除指定数据  (key) 
    */

    var storageApi = {
        set: function(key, val) {
            if (val === undefined) {
                this.remove(key)
            }
            storage.setItem(key, JSON.stringify(val))
        },
        get: function(key) {
            var val = JSON.parse(storage.getItem(key));

            return val
        },
        remove: function(key) {
            storage.removeItem(key)
        },
        clear: function() {
            storage.clear()
        }
    }

    return storageApi

})