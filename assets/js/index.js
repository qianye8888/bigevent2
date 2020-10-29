$(function () {
    getUserInfo()


    // 退出
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // 框架提供的询问框
        layer.confirm('是否确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = "/login.html"
            // 关闭询问框
            layer.close(index);
          });
    })
})

// 获取用于信息（封装到入口函数的外面）
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // } ,
        success: function (res){
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            renderAvatar(res.data)
        },

        // 无论成功失败都会调用complete 回调函数
        // 在complete 回调函数中， 可以使用 res.reponseJSON 拿到服务器响应回来的数据
        // complete: function (res) {
        //     console.log(res.responseJSON)
    
        //     var obj = res.responseJSON
        //     if(obj.status == 1 && obj.message == "身份认证失败！") {
        //         // 清空本地token
        //         localStorage.removeItem('token')
        //         // 页面跳转
        //         location.href = "/login.html"
    
        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}