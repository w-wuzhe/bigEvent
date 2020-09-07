// 渲染主页面
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: res => {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败！')

            // console.log(res);
            // $("#welcome").html("欢迎" + res.data.username)
            renderAvatar(res.data)
        }
    })
}

// 渲染文字和头像
function renderAvatar(user) {
    // 渲染文字
    let uname = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;" + uname)

    // 渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        $(".text-avatar").html(uname[0].toUpperCase()).show()
    }
}

getUserInfo()

$("#btn_index").on("click" , function(){
    layer.confirm('是否退出?', { icon: 3, title: '提示' }, function (index) {

        // 删除本地存储
        localStorage.removeItem("token") 
        // 跳转到登录页面
        location.href = "/bigEvent/login.html"
        // 退出弹出层
        layer.close(index);
    });
})


