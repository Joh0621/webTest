<template>
  <div class="app-container">
    <div class="form-add">
      <span class="first">组织机构管理</span><span class="first-line">></span>
      <span class="second">{{ pageTitle }} </span>
    </div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form
        :model="editForm"
        ref="ruleForm"
        size="small"
        label-width="140px"
        :rules="rules"
        class="form-box clearfix"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="父级组织机构" prop="sort">
              <el-select
                v-model="editForm.label"
                placeholder="请选择父级组织机构"
                ref="selectReport"
              >
                <el-option
                  :label="editForm.label"
                  :value="editForm.parentId"
                  style="
                    min-height: 200px;
                    overflow: auto;
                    background-color: #fff;
                  "
                >
                  <el-tree
                    ref="selectTree"
                    :data="treeData"
                    highlight-current
                    :props="defaultProps"
                    node-key="id"
                    @node-click="handleNodeClick"
                  ></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织机构名称" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!--          <el-col :span="12">
            <el-form-item label="是否显示">
              <el-radio v-model="editForm.isShow" :label=true>是</el-radio>
              <el-radio v-model="editForm.isShow" :label=false>否</el-radio>
            </el-form-item>
          </el-col>-->
          <!--          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="editForm.sort" :min="0" :max="100"
              ></el-input-number>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
    </div>
    <div class="form-footer-btn">
      <el-button class="close-btn" @click="close">取 消</el-button>
      <el-button
        class="confrim-btn"
        type="primary"
        @click="
          statu === 'create' ? createData('editForm') : updateData('editForm')
        "
        >确 定
      </el-button>
    </div>
  </div>
</template>

<script>
import { orgList, orgAdd, orgShow, orgUpdate } from "@/api/fill";

import { orgTree } from "@/utils/addMenu";

export default {
  name: "editFormAdd",
  data() {
    return {
      editForm: {
        parentId: "",
        label: "",
        // isShow: true,
        sort: 1,
        name: "",
        id: "",
      },
      treeData: [],
      rules: {
        sort: [
          { required: true, message: "请输入父级机构名称", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入组织机构名称", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "none",
        label: "label",
      },
    };
  },
  created() {
    this.pageTitle = this.$route.query.title;
    this.statu = this.$route.query.statu;
  },
  mounted() {
    if (this.statu !== "create") {
      this.update();
    } else {
      this.getMenu();
    }
  },
  methods: {
    getMenu() {
      orgList().then((res) => {
        if (res.code === 0) {
          this.treeData = orgTree(res.body);
          this.$nextTick(function () {
            this.$refs.selectTree.setCurrentKey(this.editForm.parentId);
          });
        } else {
          this.$notify({
            message: "请求失败",
            type: "error",
            offset: 100,
          });
        }
      });
    },
    handleNodeClick(data) {
      this.editForm.label = data.label;
      this.editForm.parentId = data.id;
      this.$refs.selectReport.blur();
    },
    // 数据回显
    update() {
      orgShow(this.$route.query.orgId).then((res) => {
        if (res.code === 0) {
          const data = res.body;
          this.editForm.parentId = data.parentCode;
          this.editForm.isShow = data.isDisable;
          this.editForm.sort = data.orgOrder;
          this.editForm.name = data.orgName;
          this.editForm.id = data.orgCode;
          this.editForm.label = data.parentName;
          this.getMenu();
        } else {
          this.$notify({
            message: "请求失败",
            type: "error",
            offset: 100,
          });
        }
      });
    },
    close() {
      this.$router.push("/sys/orgList");
    },
    // 新增保存
    createData() {
      this.$refs["ruleForm"].validate((valid) => {
        if (this.editForm.label != "") {
          if (valid) {
            orgAdd(this.editForm).then((res) => {
              if (res.code === 0) {
                this.$notify({
                  message: "保存成功",
                  type: "success",
                  offset: 100,
                });
                this.$router.push("/sys/orgList");
              } else {
                this.$notify({
                  message:
                    "保存失败" +
                    (res.body == "已存在该记录！" ? "," + res.body : ""),
                  type: "error",
                  offset: 100,
                });
              }
            });
          } else {
            return false;
          }
        }else{
          this.$notify({
                  message: "请选择父级机构",
                  type: "error",
                  offset: 100,
                });
        }
      });
    },
    // 编辑保存
    updateData() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          orgUpdate(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: "保存成功",
                type: "success",
                offset: 100,
              });
              this.$router.push("/sys/orgList");
            } else {
              this.$notify({
                message:
                  "保存失败" +
                  (res.body == "已存在该记录！" ? "," + res.body : ""),
                type: "error",
                offset: 100,
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
