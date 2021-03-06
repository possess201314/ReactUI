let EventPublisher = function(){

    this.eventCallbackDictionary = {};

    this.on = function(eventName,callback){
        this.eventCallbackDictionary[eventName] = callback;
    }

    this.broadcast = function(eventName,data){
        for(let i in this.eventCallbackDictionary){
            if(i == eventName && this.eventCallbackDictionary[eventName]){
                this.eventCallbackDictionary[eventName](data);
            }
        }
    }
}

let CommonUtil = {
    throwError: function (str) {
        console.log(str);
    },
    string: {
        replaceAll: function (value, findText, replaceText) {
            let regExp = new RegExp(findText, "g");
            return value.replace(regExp, replaceText);
        },
        splitFn(str){
            let result = "";
            let count = "";
            for(let i =str.length-1;i >= 0; i--){
                count ++;
                result = str.charAt(i) + result;
                if (!(count % 3) && i != 0) { result = ',' + result; }
            }
            return result;
        },
        split3(str){
            if(!str){
                return "";
            }
            str = str.toString();
            if(str.indexOf('.') == -1){
                return CommonUtil.string.splitFn(str);
            }
            let first = str.split('.')[0];
            first = CommonUtil.string.splitFn(first);
            return first + "." + str.split('.')[1];
        }
    },
    object: {
        equalsObject(source, target) {
            let p;
            for (p in source) {
                if (typeof (target[p]) == 'undefined') {
                    return false;
                }
            }

            for (p in source) {
                if (source[p]) {
                    switch (typeof (source[p])) {
                        case 'object':
                            if (!this.equalsObject(source[p], target[p])) {
                                return false;
                            }
                            break;
                        case 'function':
                            if (typeof (target[p]) == 'undefined' ||
                                (p != 'equals' && source[p].toString() != target[p].toString()))
                                return false;
                            break;
                        default:
                            if (source[p] != target[p]) {
                                return false;
                            }
                    }
                } else {
                    if (target[p])
                        return false;
                }
            }

            for (p in target) {
                if (typeof (source[p]) == 'undefined') {
                    return false;
                }
            }

            return true;
        },
        cloneObj(source) {
            if (source) {
                return JSON.parse(JSON.stringify(source));
            }
            return null;
        },
        getProperties(obj) {
            let res = [];
            if (!obj) {
                return res;
            }
            for (let i in obj) {
                res.push(i);
            }
            return res;
        },
        /**
         * js中的任务队列
         * @params: data:Array
         * @params: process:function
         * @params: completedCallback : function 执行完毕的回调
         * @params: context(可选): 执行环境,如果没有，则为window
         * return undefined
         * demo:
         * let data = [{name:1},{name:2},{name:3},{name:4},{name:5},{name:6},{name:7}];
         * function print(item){console.log(item.name);}
         * taskQueue(data,print,cb);
         * **/
        taskQueue: function f(array, process, completedCallback, context) {
            if (completedCallback && typeof completedCallback == "function") {
                if (array.length == 1) {
                    completedCallback({
                        data: "all tasks completed!"
                    });
                    return;
                }
            }
            let item = array.shift();
            process.call(context, item);
            if (array.length > 0) {
                setTimeout(() => {
                    f(array, process, completedCallback, context);
                }, 500);
            }
        },
        /**
         * 节流函数:
         * 如果在段时间内一直操作DOM,可能会导致浏览器内存问题，甚至崩溃，所以在一段时间内，我们让该持续性的操作间隔的执行
         * @params: method：function 需要执行的函数
         * @params: context(可选)：执行环境，如果没有，则为window
         * return undefined
         **/
        throttle: function (fn,context,delay,text,mustApplyTime) {
            clearTimeout(fn.timer);
            fn._cur = Date.now();

            if (!fn._start) { 
                fn._start = fn._cur;
            }
            if (fn._cur - fn._start > mustApplyTime) {
                fn.call(context, text);
                fn._start = fn._cur;
            } else {
                fn.timer = setTimeout(function () {
                    fn.call(context, text);
                }, delay);
            }
        },
        
    },
    arrayServer: {
        _private: {
            getIndexByString: function (array, str) {
                let _index = -1;
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == str) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            getIndexByObject: function (array, obj) {
                let _index = -1;
                for (let i = 0; i < array.length; i++) {
                    if (CommonUtil.object.equalsObject(array[i], obj)) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            removeSingleStr: function (array, str) {
                let _index = this.getIndexByString(array, str);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            removeSingleObject: function (array, item) {
                let _index = this.getIndexByObject(array, item);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            sortByDate: function (array, field, desc) {
                let _arr = CommonUtil.object.cloneObj(array);
                _arr.map(function (item) {
                    item._tmpDateField = new Date(item[field]).getTime();
                })
                _arr.sort(function (a, b) {
                    if (desc) {
                        return a._tmpDateField - b._tmpDateField;
                    } else {
                        return b._tmpDateField - a._tmpDateField;
                    }
                })
                return _arr;
            },
            sortByNumAndChar: function (array, field, desc) {
                let _arr = CommonUtil.object.cloneObj(array);
                _arr.sort(function (a, b) {
                    if (desc) {
                        return a[field] - b[field];
                    } else {
                        return b[field] - a[field];
                    }
                })
                return _arr;
            }
        },
        getIndex: function (array, item) {
            if (array instanceof Array == false) {
                CommonUtil.throwError("params[array] must be Array in getIndex method");
                return;
            }
            if (typeof item == "object") {
                return CommonUtil.arrayServer._private.getIndexByObject(array, item);
            } else if (typeof item == "string") {
                return CommonUtil.arrayServer._private.getIndexByString(array, item);
            } else {
                return -1;
            }
        },
        removeItems: function (array, items) {
            if (array instanceof Array == false) {
                CommonUtil.throwError("params[array] must be Array in removeItems method");
                return;
            }
            items.map(function (item) {
                if (typeof item == "object") {
                    CommonUtil.arrayServer._private.removeSingleObject(array, item);
                }
                if (typeof item == "string") {
                    CommonUtil.arrayServer._private.removeSingleStr(array, item);
                }
            })
            return array;
        },
        insertItem: function (array, items) {
            if (array instanceof Array == false) {
                CommonUtil.throwError("params[array] must be Array in removeItems method");
                return;
            }
            items.map(function (item) {
                if (typeof item == "object") {
                    CommonUtil.arrayServer._private.removeSingleObject(array, item);
                }
                if (typeof item == "string") {
                    CommonUtil.arrayServer._private.removeSingleStr(array, item);
                }
            })
            return array;
        },
        uniq: function (array, field) {
            if (array instanceof Array == false) {
                CommonUtil.throwError("params[array] must be Array in uniq method");
                return;
            }
            if (!field) {
                let result = [],
                    hash = {};
                for (let i = 0, elem;
                    (elem = array[i]) != null; i++) {
                    if (!hash[elem]) {
                        result.push(elem);
                        hash[elem] = true;
                    }
                }
                return result;
            } else {
                let hash = {};
                return array.reduce(function (item, next) {
                    hash[next[field]] ? '' : hash[next[field]] = true && item.push(next);
                    return item;
                }, []);
            }
        },
        getSimpleValuesByField: function (array, field) {
            if (array instanceof Array == false) {
                CommonUtil.throwError("params[array] must be Array in getSimpleValuesByField method");
                return;
            }
            let res = [];
            array.forEach(function (item) {
                res.push(item[field]);
            })
            return res;
        },
        getFieldsByCk: (array, field) => {
            if (array instanceof Array == false) {
                CommonUtil.throwError("params[array] must be Array in getSimpleValuesByField method");
                return;
            }
            let res = [];
            array.forEach(function (item) {
                if (item.ck) {
                    res.push(item[field]);
                }
            })
            return res;
        },
        sortByField: function (array, field, desc) {
            if (array instanceof Array == false) {
                CommonUtil.throwError("params[array] must be Array in sortByField method");
                return;
            }
            if (array.length == 0) {
                return array;
            }
            let res = null;
            let tmp = array[0][field];

            //check Date
            if (new Date(tmp) != "Invalid Date") {
                res = _private.sortByDate(array, field, desc);
            } else {
                res = _private.sortByNumAndChar(array, field, desc);
            }
            return res;
        },
        simpleUniq(arr) {
            let res = [];
            for (let i = 0; i < arr.length; i++) {
                if (res.indexOf(arr[i]) === -1) {
                    res.push(arr[i]);
                }
            }
            return res;
        }
    },
    date: {
        date: function (val) {
            if (!val) {
                return "";
            }
            let d = new Date(val);
            let m = d.getMonth() + 1;
            m = m >= 10 ? m : "0" + m;
            let day = d.getDate();
            day = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
            return d.getFullYear() + "-" + m + "-" + day;
        },
        dateTime: function (val) {
            return this.date(val) + " " + this.time(val);
        },
        time: function (val) {
            if (!val) {
                return "";
            }
            let d = new Date(val);
            let h = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
            let m = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
            let s = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds();
            return h + ":" + m + ":" + s;
        },
        //当前月的第一天
        getCurrentMonthFirst() {
            let date = new Date();
            date.setDate(1);
            return this.date(date);
        },
        //当前月的最后一天
        getCurrentMonthLast() {
            let date = new Date();
            let currentMonth = date.getMonth();
            let nextMonth = ++currentMonth;
            let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
            let oneDay = 1000 * 60 * 60 * 24;
            return this.date(new Date(nextMonthFirstDay - oneDay));
        },
        //比较2个时间
        compareData(one, two) {
            let res = {
                success: false,
                data: false
            };
            if (new Date(one) == "Invalid Date" || new Date(two) == "Invalid Date") {
                res.success = false;
            } else {
                res.success = true;
                let time_one = new Date(one).getTime();
                let time_two = new Date(two).getTime();
                if (time_one > time_two) {
                    res.data = true;
                } else {
                    res.data = false;
                }
            }
            return res;
        }
    },
    cookie: {
        removeCookie(name) {
            this.setCookie(name, "", new Date(0));
        },
        getCookie(name) {
            let cookie = document.cookie;
            let cookieName = encodeURIComponent(name) + "=",
                cookieStart = cookie.indexOf(cookieName),
                cookieValue = null;
            if (cookieStart > -1) {
                let cookieEnd = cookie.indexOf(';', cookieStart);
                if (cookieEnd == -1) {
                    cookieEnd = cookie.length;
                }
                cookieValue = decodeURIComponent(cookie.substring(cookieStart + cookieName.length, cookieEnd));
            }
            return cookieValue;
        },
        setCookie(name, value, expires) {
            let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            } else {
                cookieText += "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            }
            document.cookie = cookieText + ";path=/;domain=" + document.domain;
        },
    },
    url:{
        getUrlParam(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return "";
        },
        getDecodeUrlParam(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return "";
        }
    },
    _idSeed: {
        id: 10000,
        newId: () => {
            return CommonUtil._idSeed.id++;
        }
    },
    _event_publisher:new EventPublisher(),
    comp:{
        cloneObj(source) {
            if (source) {
                return JSON.parse(JSON.stringify(source));
            }
            return null;
        },
        addPrimaryAndCk(data, ck) {
            data.map(item => {
                if (ck != undefined) {
                    if (!ck) {
                        item._ck = false;
                    } else {
                        item._ck = true;
                    }
                } else {
                    item._ck = false;
                }
                item._cls = "";
                item._tmpId = CommonUtil._idSeed.newId();
            });
            return data;
        },
        getCheckedItems(arr, field) {
            let res = {
                items: [],
                vals: []
            };
            arr.map(item => {
                if (item._ck) {
                    res.items.push(item);
                    if (field) {
                        res.vals.push(item[field]);
                    }
                }
            })
            return res;
        },
        getItemByField(arr,field,value){
           let res = null;
           arr.forEach(x=>{
               if(x[field] == value){
                   res = x;
               }
           }) 
           return res;
        },
        checkIsArray(data){
            if(!data || data instanceof Array == false){
                return false;
            }
            return true;
        },
        checkArrayNull(data){
            if(this.checkIsArray(data) && data.length > 0){
                return false;
            }
            return true;
        }
    }
}

export default CommonUtil;