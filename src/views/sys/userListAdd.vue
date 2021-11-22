<template>
  <div class="app-container">
    <div class="form-add"><span class="first">用户管理</span>
      <span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="140px"
               class="form-box clearfix"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="组织机构" prop="orgId">
              <el-select v-model="editForm.orgId" placeholder="请选择组织机构" ref="selectReport">
                <el-option
                  :label="editForm.orgName"
                  :value="editForm.orgId"
                  style="min-height: 200px;overflow: auto;background-color:#fff"
                >
                  <el-tree
                    ref="selectTree"
                    :data="treeData"
                    highlight-current
                    :props="defaultProps"
                    node-key="orgId"
                    @node-click="handleNodeClick"
                  ></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name" label="用户名称">
              <el-input v-model="editForm.nickName"
                        @input="chinese"
                        placeholder="请输入中文"
              ></el-input>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="登录用户名" prop="nickName">
              <el-input v-model="editForm.name" placeholder="请输入汉语拼音" @input="pinYin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话" prop="mobile">
              <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="editForm.status">
                <el-option v-for="item in statuAry" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否锁定">
              <el-select v-model="editForm.isLocked">
                <el-option v-for="item in isLockedAry" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="this.statu=='update'">
            <el-form-item label="重置密码">
              <el-button type="primary" @click="resetPwd">重置密码</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="form-footer-btn">
      <el-button class="close-btn" @click="close">取 消</el-button>
      <el-button class="confrim-btn" type="primary"
                 @click="statu==='create'?createData('editForm'):updateData('editForm')"
      >确 定
      </el-button>
    </div>
  </div>

</template>

<script>
import { userAdd, userUpdate, userShow, orgList, resetPwd } from '@/api/fill'

import { orgTree } from '@/utils/addMenu'

export default {
  name: 'editFormAdd',
  data() {
    var contactPhone = (rule, value, callback) => {
      if (!value) {
        return callback()
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      editForm: {
        name: '',
        nickName: '',
        no: '',
        email: '',
        mobile: '',
        orgId: '',
        status: 1,
        orgName: '',
        isLocked: 1
      },
      statuAry: [
        {
          value: 0,
          label: '未激活'
        },
        {
          value: 1,
          label: '激活'
        }
      ],
      isLockedAry: [
        {
          value: 0,
          label: '锁定'
        },
        {
          value: 1,
          label: '解锁'
        }
      ],
      rules: {
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        orgId: [
          { required: true, message: '选择组织机构', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入用户名称', trigger: ['blur', 'change'] }
        ],
        nickName: [
          { required: true, message: '请输入登录用户名', trigger: ['blur', 'change'] }
        ],
        mobile: [{ validator: contactPhone, trigger: 'blur' }]
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
  },
  mounted() {
    if (this.statu !== 'create') {
      this.update()
    } else {
      this.getMenu()
    }
  },
  methods: {
    //重置密码
    resetPwd() {
      const userId = this.$route.query.id
      resetPwd(userId).then((res) => {
        if (res.code === 0) {
          this.$notify({
            message: '重置密码成功,' + res.body,
            type: 'success',
            offset: 100
          })
        } else {
          this.$notify({
            message: '重置密码失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    chinese() {
      this.editForm.nickName = this.editForm.nickName.replace(/[^\u4E00-\u9FA5]/g, '')
    },
    pinYin() {
      this.editForm.name = this.editForm.name.replace(/[^[A-Za-z]/g, '')
    },
    getMenu() {
      orgList().then((res) => {
        if (res.code === 0) {
          this.treeData = orgTree(res.body)
          this.$nextTick(function() {
            this.$refs.selectTree.setCurrentKey(this.editForm.orgId)
          })
        } else {
          this.$notify({
            message: '请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    handleNodeClick(data) {
      this.editForm.orgName = data.label
      this.editForm.orgId = data.id
      this.$refs.selectReport.blur()
    },
    // 数据回显
    update() {
      userShow(this.$route.query.id).then((res) => {
        if (res.code === 0) {
          this.editForm = res.body
          this.getMenu()
        } else {
          this.$notify({
            message: '请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    close() {
      this.$router.push('/sys/userList')
    },
    // 新增保存
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          userAdd(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/sys/userList')
            } else {
              this.$notify({
                message: res.body.msg == '添加失败，登录用户名重复' ? res.body.msg : '保存失败',
                type: 'error',
                offset: 100
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 编辑保存
    updateData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          userUpdate(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/sys/userList')
            } else {
              this.$notify({
                message: '修改失败' + (res.body == '已存在该记录！' ? ',' + res.body : ''),
                type: 'error',
                offset: 100
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
