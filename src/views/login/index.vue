<template>
  <div class="login-container">
    <canvas id="canvas"></canvas>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left"
    >

      <div class="title-container">
        <h3 class="title">账号登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <!--      <el-checkbox label="记住密码" v-model="loginForm.checked" class="check-box"></el-checkbox>-->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLogin"
      >登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        checked: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名', }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码', }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.drawBgc()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            /* this.$router.push({ path: this.redirect || '/' })
             this.loading = false*/
          }).catch(() => {
            // this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    drawBgc() {
      class Circle {

        constructor(x, y) {
          this.x = x
          this.y = y
          this.r = Math.random() * 14 + 1
          this._mx = Math.random() * 2 - 1
          this._my = Math.random() * 2 - 1
        }

        drawCircle(ctx) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r, 0, 360)
          ctx.closePath()
          ctx.fillStyle = 'rgba(156,217,249, 0.2)'
          ctx.fill()
        }

        drawLine(ctx, _circle) {
          let dx = this.x - _circle.x
          let dy = this.y - _circle.y
          let d = Math.sqrt(dx * dx + dy * dy)
          if (d < 150) {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)//起始点
            ctx.lineTo(_circle.x, _circle.y)//终点
            ctx.closePath()
            ctx.strokeStyle = 'rgba(156,217,249, 0.2)'
            ctx.stroke()
          }
        }

        move(w, h) {
          this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx)
          this._my = (this.y < h && this.y > 0) ? this._my : (-this._my)
          this.x += this._mx / 2
          this.y += this._my / 2
        }
      }

      class currentCircle extends Circle {
        constructor(x, y) {
          super(x, y)
        }

        drawCircle(ctx) {
          ctx.beginPath()
          this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2
          ctx.arc(this.x, this.y, this.r, 0, 360)
          ctx.closePath()
          ctx.fillStyle = 'rgba(156,217,249, ' + (parseInt(Math.random() * 100) / 100) + ')'
          ctx.fill()
        }
      }

      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      let canvas = document.querySelector('#canvas')
      let ctx = canvas.getContext('2d')
      let w = canvas.width = canvas.offsetWidth
      let h = canvas.height = canvas.offsetHeight
      let circles = []
      let current_circle = new currentCircle(0, 0)

      let draw = function() {
        ctx.clearRect(0, 0, w, h)
        for (let i = 0; i < circles.length; i++) {
          circles[i].move(w, h)
          circles[i].drawCircle(ctx)
          for (let j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j])
          }
        }
        if (current_circle.x) {
          current_circle.drawCircle(ctx)
          for (var k = 1; k < circles.length; k++) {
            current_circle.drawLine(ctx, circles[k])
          }
        }
        requestAnimationFrame(draw)
      }

      let init = function(num) {
        for (var i = 0; i < num; i++) {
          circles.push(new Circle(Math.random() * w, Math.random() * h))
        }
        draw()
      }

      window.addEventListener('load', init(80))
      window.onmousemove = function(e) {
        e = e || window.event
        current_circle.x = e.clientX
        current_circle.y = e.clientY
      }, window.onmouseout = function() {
        current_circle.x = null
        current_circle.y = null
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background: url('../../assets/login/login.jpg') no-repeat center;
  background-size: cover;
  //display: flex;
  //align-items: center;

  .el-input {
    display: inline-block;
    height: 40px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .el-form-item__content {
    line-height: 40px;
    background-color: #5478b1;
  }

  .el-button--primary {
    background-color: #83b1de;
    border-color: #83b1de;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -180px;
    width: 360px;
    max-width: 100%;
    margin-top: -190px;
    padding: 50px 35px 15px 35px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, .6);
    box-shadow: 0 0 8px #5a799b;

    .check-box {
      margin-bottom: 22px;
      color: #fff;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 0 5px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #6f9ed3;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 1px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

canvas {
  display: block;
  width: 100%;
  height: 100vh;
}

</style>
