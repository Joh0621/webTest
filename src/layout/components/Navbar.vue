<template>
  <div>
    <div class="navbar">
      <div class="navbar-wraper">
        <img src="../../assets/web/logo.png" alt="暂无图片" style="height: 34px">
        <!--    <breadcrumb class="breadcrumb-container"/>-->

        <div class="right-menu">
          <div style="display: flex;align-items: center">
            <img src="../../assets/web/user.png" alt="暂无图片" style="height: 70px;position: relative;top: 5px;">
            <div @click="show=!show" style="cursor: pointer">
              <span>{{ userName }}</span>
              <i class="name-box" :class="[show?top:bottom]"/>
            </div>
            <el-button v-show="show" style="position: absolute;top:50px;right: 50px" @click="dialogVisible=true">修改密码
            </el-button>
          </div>
          <i class="icon iconfont i-exit" @click="logout">&#xe75d;</i>
          <!--        <el-dropdown class="avatar-container" trigger="click">
                    <div class="avatar-wrapper">

                      &lt;!&ndash;          <i class="icon iconfont user-avatar">&#xe60f;</i>&ndash;&gt;

                      &lt;!&ndash;          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">&ndash;&gt;
                      &lt;!&ndash;          <i class="el-icon-caret-bottom"/>&ndash;&gt;
                    </div>
                    &lt;!&ndash;        <el-dropdown-menu slot="dropdown" class="user-dropdown">
                              &lt;!&ndash;          <router-link to="/">
                                          <el-dropdown-item>
                                            Home
                                          </el-dropdown-item>
                                        </router-link>
                                        <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
                                          <el-dropdown-item>Github</el-dropdown-item>
                                        </a>
                                        <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                                          <el-dropdown-item>Docs</el-dropdown-item>
                                        </a>&ndash;&gt;
                              <el-dropdown-item divided @click.native="logout">
                                <span style="display:block;">退出</span>
                              </el-dropdown-item>
                            </el-dropdown-menu>&ndash;&gt;
                  </el-dropdown>-->
        </div>
      </div>
      <!--    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"
                     style="display: none"
          />-->
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="ruleForm" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="form.useName" disabled></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="passwordOld">
          <el-input v-model="form.passwordOld" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passwordNew">
          <el-input v-model="form.passwordNew" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码确认" prop="passwordNewConfrim">
          <el-input v-model="form.passwordNewConfrim" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible=false,show=false">取 消</el-button>
    <el-button type="primary" @click="btnConfrim">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import store from '@/store'
import { changePwd } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.passwordNew !== '') {
          this.$refs.ruleForm.validateField('passwordNewConfrim')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.passwordNew) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userName: '',
      show: false,
      top: 'el-icon-caret-top',
      bottom: 'el-icon-caret-bottom',
      dialogVisible: false,
      form: {
        useName: store.getters.name,
        passwordOld: '',
        passwordNew: '',
        passwordNewConfrim: ''
      },
      rules: {
        passwordOld: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        passwordNew: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        passwordNewConfrim: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    this.userName = store.getters.name
  },
  methods: {
    btnConfrim() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const param = {
            oldPwd: this.form.passwordOld,
            newPwd1: this.form.passwordNew,
            newPwd2: this.form.passwordNewConfrim
          }
          changePwd(param).then((res) => {
            if (res.code == 2001) {
              this.$notify({
                type: 'success',
                message: '修改成功'
              })
              this.dialogVisible = false
              this.show = false
            } else {
              this.$notify({
                type: 'error',
                message: '删除失败',
                offset: 100
              })
            }
          })
        } else {
          return false
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  //overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  /*.right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .name-box {
      position: relative;
      top: -4px;
      margin-left: 5px;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          //width: 40px;
          //height: 40px;
          //border-radius: 10px;
          font-size: 30px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .i-exit{
      color: #0072f9;
    }
  }*/
  .navbar-wraper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }

  .right-menu {
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .i-exit {
      color: #0072f9;
      font-size: 18px;
      cursor: pointer;
    }

    .name-box:after {
      content: '';
      height: 15px;
      border-right: 1px solid #DADCE7;
      margin: 0 20px;
    }
  }
}
</style>
