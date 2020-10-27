// 开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
// 测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net"
// 生产环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net"


// 拦截所有ajax请求 ： get/post/ajax
$.ajaxPrefilter(function (params) {
    // console.log(params)

    params.url = baseURL + params.url


    //对需要权限的接口配置头信息
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
})