$(function () {
    // 点击显示注册区域
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击显示登陆区域
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,"密码必须6-16位，且不能输入空字格"
        ],
        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val()
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    })

    // 注册功能
    var layer = layui.layer
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                // alert(res.message)
                layer.msg('注册成功，请登录！')
                $('#link_login').click()
                $('#form-reg')[0].reset()
            }
        })
    })

    // 登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 获取带有name 属性的所有值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，登录成功！')
                // 保存token， 未来的接口要使用token
                // setItem 保存数据到本地保存
                localStorage.setItem("token", res.token)

                // 跳转
                location.href = "/index.html"
            }
        })
    })

})