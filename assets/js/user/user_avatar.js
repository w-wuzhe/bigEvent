$(function() {
    // layui弹窗
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 上传照片区域
    $("#btn_sc").on("click" , function(){
        $("#file1").click()
    })

    // 为文件选择框绑定change事件
    $("#file1").on("change" , function(e){
        if (e.target.files.length === 0){
            return
        }
        var files = e.target.files[0]

        var imgURL = URL.createObjectURL(files)

        // cropper销毁之前的照片 ， 给image的src属性重新赋值 ， cropper再次初始化裁剪页面
        $("#image").cropper('destroy').attr("src", imgURL).cropper(options)
    })

    // 给确定按钮注册事件
    $("#btn_yes").on("click" , () => {
        // 拿到裁剪之后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        // 发送ajax请求，上传照片到服务器
        $.ajax({
            method : 'POST' , 
            url: '/my/update/avatar' ,
            data : {
                avatar: dataURL
            } ,
            success : res => {
                if (res.status !== 0) return layer.msg("更换头像失败")

                window.parent.getUserInfo()
                layer.msg("更换头像成功")
            }
        })
    })
})