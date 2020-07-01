import Q from "q";
import loading from '@comp/loading/index.js';

let _fetch = {
    showLoadingDialog(flag){
        if(flag == undefined){
            loading.show();
        }
    },
    hideLoadingDialog(){
        loading.hide();
    },
    getFetch:function(url,showLoading){
        if(!url){
            return;
        }
        let that = this;
        this.showLoadingDialog(showLoading);
        let symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.random();
        let defer = Q.defer();
        let headers = {
            'Content-Type': 'application/json; charset=UTF-8'
        };
        let options = {
            method:"get",
            credentials:'include',
            headers:headers
        };
        fetch(url,options).then(d =>d.json()).then( (data)=> {
            let code = data.status;
            let message = data.msg;
            let d = data.data?data.data:data.result;
            if(code == "200" || code == "0"){
                defer.resolve({data:d,params:data.params});
            }else if(code == "701"){
                // _vue_instance.$router.push({path:"/"});
                window.top.location.href = "./login.html";
                defer.resolve({data:d,params:data.params});
            }else{
                defer.reject({data: message});
            }
            that.hideLoadingDialog();
        }).catch((err)=> {
            defer.reject({data: err});
            that.hideLoadingDialog();
        });
        return defer.promise;
    },
    postFetch:function(url,data,showLoading){
        if(!url){
            return;
        }
        this.showLoadingDialog(showLoading);
        let that = this;
        let symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.random();
        let defer = Q.defer();
        let headers = {
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Type': 'application/json; charset=UTF-8'
        };
        let options = {
            method:"post",
            credentials:'include',
            headers:headers
        };
        if(data){
            options.body = JSON.stringify(data);
        }
        fetch(url,options).then(d =>d.json()).then((data)=> {
            let code = data.status;
            let message = data.msg;
            let d = data.data?data.data:data.result;
            if(code == "200" || code == "0"){
                defer.resolve({data:d,params:data.params});
            }else if(code == "701"){
                // _vue_instance.$router.push({path:"/"});
                window.top.location.href = "./login.html";
                defer.resolve({data:d,params:data.params});
            }else{
                defer.reject({data: message});
            }
            that.hideLoadingDialog();
        }).catch(function(err) {
            defer.reject({data: err});
            that.hideLoadingDialog();
        });
        return defer.promise;
    },
    uploadFetch:function(url,data,showLoading){
        if(!url){
            return;
        }
        this.showLoadingDialog(showLoading);
        let that = this;
        let symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.random();
        
        let defer = Q.defer();
        
        let options = {
            method:"post",
            credentials:'include'
        };
        if(data){
            options.body = data;
        }
        fetch(url,options).then(d =>d.json()).then( (data)=> {
            let code = data.status;
            let message = data.msg;
            let d = data.data?data.data:data.result;
            if(code == "200" || code == "0"){
                defer.resolve({data:d,params:data.params});
            }else if(code == "701"){
                // _vue_instance.$router.push({path:"/"});
                window.top.location.href = "./login.html";
                defer.resolve({data:d,params:data.params});
            }else{
                defer.reject({data: message});
            }
            that.hideLoadingDialog();
        }).catch(function(err) {
            defer.reject({data: err});
            that.hideLoadingDialog();
        });
        
        return defer.promise;
    },
    fetchAll:function(promises){
        return Q.all(promises);
    }
}

export default _fetch;