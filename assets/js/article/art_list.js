$(function(){
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 请求参数
    var q = {
        pagenum: 1, // 默认页码值在第一页
        pagesize : 2 , // 默认一页显示俩条数据
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    // 获取文章列表数据
    function initTable() {
        $.ajax({
            type : 'GET' ,
            url: '/my/article/list' ,
            data : q ,
            success : res => {
                if (res.status !== 0) return layer.msg("失败")
                // console.log(res);

                var htmlStr = template("qwer", res);
                $("#tb").html(htmlStr)

                // 调用分页，，传参数 total
                renderPage(res.total)
            }
        })
    }

    initTable()

    // 给文章列表下拉菜单添加值
    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: res => {
                // console.log(res);
                var htmlStr2 = template("opt", res);
                $("#form-search [name = cate_id]").html(htmlStr2)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    initArtCate()

    // 筛选数据
    $("#form-search").on("submit" , function(e) {
        e.preventDefault()

        var cate_id = $("[name = cate_id]").val()
        var state = $("[name = state]").val()

        // 给q对象里面的属性，重新赋值。
        q.cate_id = cate_id
        q.state = state

        // 用最新的值，重新调用 文章列表下拉菜单 函数
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox' ,
            count: total ,
            limit: q.pagesize ,
            curr: q.pagenum ,
            limits : [2,3,4,5,10] ,
            layout: ['count', 'limit' ,'prev', 'page', 'next' , 'skip'] ,   
            jump: (obj , first) => {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // console.log(first);  // 触发jump的方式
                // 通过程序调用的方式触发，返回的是true。 切换分页的方式就是und
                if(!first) {
                    initTable()
                }
            }
        })
    }

    $("#tb").on("click" , "#del_wz" , function () {
        let id = $(this).attr("data-id")
        let len = $("#del_wz").length

        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: res => {
                    if (res.status !== 0) return layer.msg("删除失败")
                    layer.msg("删除成功")

                    // 如果当面的页面显示的 信息长度 不是最后一条，也不是第一页
                    if (len === 1 && q.pagenum !== 1) {
                        // 就更新一下页码的显示页
                        q.pagenum -= 1
                    }
                    initTable()
                }
            })

            layer.close(index);
        }); 
    })
})
