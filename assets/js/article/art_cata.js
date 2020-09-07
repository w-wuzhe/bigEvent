$(function () {
    var layer = layui.layer
    var form = layui.form

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {

                var htmlStr = template("qan", res);
                $("#tb").html(htmlStr)
            }
        })
    }

    initArtCateList()

    
    var indexAdd = null
    // 给添加文章按钮，注册点击事件，弹出弹出层
    $("#btnAddCata").on("click" , () => {
        indexAdd = layer.open({
            type : 1 ,
            area: ['500px', '260px'] ,
            title: '添加文章',
            content: $("#dialong-add").html()
        })
    })

    // 给添加弹出层，注册添加文章事件，发送ajax请求
    $("body").on("submit", "#btn-form" , function(e) {
        e.preventDefault()
        $.ajax({
            method : 'POST' ,
            url:'/my/article/addcates' ,
            data : $(this).serialize() ,
            success : res => {
                if (res.status !== 0) return layer.msg("添加失败")
                initArtCateList()

                // 退出弹出层
                layer.close(indexAdd)
            }
        })
    })

    // 给编辑按钮注册点击事件
    var indexEdiy = null
    $("#tb").on("click", "#edit" , function(e){
        e.preventDefault()
        indexEdiy = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章',
            content: $("#edit_pop").html()
        })

        var id = $(this).attr("data-id")
        // console.log(id);
        $.ajax({
            type: 'GET' , 
            url: '/my/article/cates/' + id ,
            success : res => {
                // console.log(res);
                form.val("form_edit" , res.data)
            }
        })
        
    })

    // 更新数据
    $("body").on("submit", "#edit-form" , function(e){
        e.preventDefault()
        $.ajax({
            method : 'POST' , 
            url: '/my/article/updatecate' ,
            data: $(this).serialize(),
            success : res => {
                if (res.status !== 0 ) return layer.msg("失败")
                // 退出名为indexEdiy的弹出层
                layer.close(indexEdiy)
                initArtCateList()
                layer.msg("更新成功")
            }
        })
    })

    // 删除数据
    $("#tb").on("click" , "#del" , function(e){
        var id = $(this).attr("data-id")
        // console.log(123);
        layer.confirm('是否确定删除 ?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method : 'GET' ,
                url: '/my/article/deletecate/' + id ,
                success : res => {
                    if (res.status !== 0 ) return layer.msg("删除失败")

                    layer.msg("删除成功")
                    initArtCateList()
                }

            })

            layer.close(index);
        });
    })
})

