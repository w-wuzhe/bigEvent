$(function() {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 正则表达式
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'] ,
    
    // 校验俩次密码是否一致
    repwd : function(value) {
      let pwd = $(".reg-box [name = password]").val()
      if (pwd !== value) {
        return '俩次密码不一致'
      }
    }
  })

  // 监听表单提交按键
  $("#form_reg").on("submit" , function(e){
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data: {
        username: $(".reg-box [name = username]").val(),
        password: $(".reg-box [name = password]").val()
      },
      success: res => {
        if (res.status !== 0) return console.log(res.message)
        console.log(res);
        $("#link_login").click()
      }
    })
  })

  // 监听登录表单提交按键
  $("#form_login").on("submit" , function(e){
    e.preventDefault()
    // 发送ajax请求
    $.ajax({
      type : 'post' ,
      url: 'http://ajax.frontend.itheima.net/api/login' ,
      data: { 
        username: $(".login-box [name = username]").val(),
        password: $(".login-box [name = password]").val()
      } , 
      success : res => {
        if (res.status !== 0) return alert('失败');


        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })

})
