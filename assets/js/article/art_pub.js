$(function(){
    let form = layui.form
    let layer = layui.layer

    // 给文章列表下拉菜单添加值
    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                if (res.status !== 0) return layer.msg("失败")
                // console.log(res);
                var htmlStr2 = template("opt", res);
                $("[name = cate_id]").html(htmlStr2)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    initArtCate()
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $("#btnChooseImage").on("click" , function() {
        $("#coverFile").click()
    })

    // 为文件选择框绑定change事件
    $("#coverFile").on("change", function (e) {
        if (e.target.files.length === 0) {
            return
        }
        var files = e.target.files[0]

        var imgURL = URL.createObjectURL(files)

        // cropper销毁之前的照片 ， 给image的src属性重新赋值 ， cropper再次初始化裁剪页面
        $("#image").cropper('destroy').attr("src", imgURL).cropper(options)
    })

    var art_state = "已发布"

    $("#btnSave2").on("click" , function(){
        art_state = "草稿"
    })

    // 监听表单提交事件
    $("#form-pub").on("submit" , function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])

        fd.set("state", art_state)


        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST' , 
            url: '/my/article/add' ,
            data : fd ,
            contentType : false ,
            processData : false ,
            success : res => {
                if (res.status !== 0 ) return layer.msg("失败")

                location.href = '/bigEvent/article/art_list.html'
            }
        })
    }
})