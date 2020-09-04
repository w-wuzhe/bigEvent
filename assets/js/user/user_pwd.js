$(function(){
    const form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: value => {
            if (value === $(".layui-card [name = oldPwd]").val()) {
                return '原新密码不能一致'
            }
        } ,
        rePwd : value => {
            if (value !== $(".layui-card [name = newPwd]").val()) {
                return '俩次密码不一致'
            }
        }
    })
    
    $(".layui-form").on("submit" , function(e){
        e.preventDefault()

        $.ajax({
            type : 'POST' ,
            url: '/my/updatepwd' ,
            data: $(this).serialize() ,
            success : res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("原密码错误")
                }
                $(".layui-form")[0].reset()
                return layer.msg("修改成功")
            }
        })
    
    })
})