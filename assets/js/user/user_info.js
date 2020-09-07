    $(function(){
    var form = layui.form
    form.verify({
        nickname : function(value){
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    function initUserInfo(){
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: res => {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！")
                }
                // $(".layui-card [name = username]").attr("placeholder", res.data.username)
                // layui 添加的 赋值form表单的方法
                form.val("formTest", res.data)
            }
        })
    }
    initUserInfo()

    $("#btnReset").on("click" , function(e){
        e.preventDefault()
        initUserInfo()
    })

    $(".layui-form").on("submit" , function(e){
        e.preventDefault()
        $.ajax({
            type : 'POST' , 
            url: '/my/userinfo' ,
            data : $(this).serialize() ,
            success : res => {
                if (res.status !== 0 ){
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功")
                window.parent.getUserInfo()
            }
        })
    })
})