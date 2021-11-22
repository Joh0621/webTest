<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :model="fromSearch"
        size="small"
        label-width="80px"
        class="form-box clearfix"
      >
        <div class="search-input">
          <el-row :gutter="20">
            <!--            <el-col :span="8">
              <el-form-item label="企业名称" label-width="90px">
                <el-select v-model="fromSearch.enterName" clearable>
                  <el-option
                    v-for="item in enterNameAry"
                    :key="item.typeName"
                    :label="item.typeName"
                    :value="item.typeName"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="起止日期">
                <el-date-picker
                  v-model="fromSearch.time"
                  type="monthrange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="search-btn">
          <el-form-item label-width="0">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="list(1, pageSize)"
              >查询</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="table-wrapper">
      <div class="handel-btn">
        <div class="submenu-title">销售按月填报</div>
        <div>
          <a :href="href">
            <input type="button" class="temclass" value="下载模板" />
          </a>
          <label class="file-select">
            <div class="select-button">
              <span>批量导入</span>
            </div>
            <input type="file" @change="handleFileChange" ref="inputs" />
          </label>
          <el-button
            size="small"
            class="btn-add"
            style="margin-bottom: 10px"
            @click="handleAdd"
            ><i class="icon iconfont i-add">&#xe880;</i>新增
          </el-button>
          <el-button
            size="small"
            class="btn-edit"
            style="margin-bottom: 10px"
            @click="handleEdit"
            ><i class="icon iconfont i-edit">&#xe630;</i>编辑
          </el-button>
          <el-button
            size="small"
            class="btn-del"
            style="margin-bottom: 10px"
            @click="handleDel"
            ><i class="icon iconfont i-del">&#xe614;</i>删除
          </el-button>
        </div>
      </div>
      <table-cmp
        :loading="loading"
        :table-data="tableData"
        :table-label="tableLabel"
        :total="total"
        :checkbox="checkbox"
        :pageSize="pageSize"
        :currentPage="currentPage"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </table-cmp>
    </div>
  </div>
</template>

<script>
import TableCmp from "@/components/TableCmp";
import {
  chengpinyousalelList,
  chengpinyousaleSwitchs,
  dic,
  chengpinyousaleInit,
  chengpinyousaleDownLoad,
  chengpinyousaleUpload,
} from "@/api/fill";
import { downLoad } from "@/utils/upload";

/*1企业名称、2时间、3盟市名称、
89#汽油销售量、92#汽油销售量、95#汽油销售量、
0#柴油销售量、负35#柴油销售量、负10#柴油销售量、负20#柴油销费量、
煤油销费量、
柴油消费量预测值、汽油消费量预测、
成品油区内消费量、成品油区外消费量*/
export default {
  name: "Dashboard",
  components: { TableCmp },
  data() {
    return {
      checkbox: true,
      count: 3,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      fromSearch: {
        enterName: "",
        time: "",
      },
      loading: false,
      tableData: [],
      tableLabel: [
        { label: "时间", param: "recordDate", minWidth: "150" },
        { label: "企业名称", param: "enterName", minWidth: "150" },
        { label: "盟市", param: "leagueCityName", minWidth: "150" },
        {
          label: "98#汽油消费量(万吨)",
          param: "salesGasoline89",
          minWidth: "180",
        },
        {
          label: "92#汽油消费量(万吨)",
          param: "salesGasoline92",
          minWidth: "180",
        },
        {
          label: "95#汽油消费量(万吨)",
          param: "salesGasoline95",
          minWidth: "180",
        },
        {
          label: "0#柴油消费量(万吨)",
          param: "salesDieselOil0",
          minWidth: "180",
        },
        {
          label: "负35#柴油消费量(万吨)",
          param: "salesDieselOilMinus35",
          minWidth: "180",
        },
        {
          label: "负10#柴油消费量(万吨)",
          param: "salesDieselOilMinus10",
          minWidth: "180",
        },
        {
          label: "负20#柴油消费量(万吨)",
          param: "salesDieselOilMinus20",
          minWidth: "180",
        },
        {
          label: "煤油消费量(万吨)",
          param: "aviationCoalSales",
          minWidth: "180",
        } /*
        { label: '柴油消费量预测值', param: 'salesPlanDieselOil', minWidth: '180' },
        { label: '汽油消费量预测', param: 'salesPlanGasoline', minWidth: '180' },*/,
        {
          label: "成品油区内消费量(万吨)",
          param: "productedOilInAreaSales",
          minWidth: "180",
        },
        {
          label: "成品油区外消费量(万吨)",
          param: "productedOilOutAreaSales",
          minWidth: "180",
        },
        {
          label: "成品油区外调入量(万吨)",
          param: "productedOilTransferInVolume",
          minWidth: 180,
        },
      ],
      selectedRows: [],
      enterNameAry: [],
      href: "",
    };
  },
  created() {
    // 初始化查询列表
    this.chengpinyousaleInit();
    this.dic();
    this.href = downLoad("/chengpinyousale/excel/template");
  },
  methods: {
    chengpinyousaleInit() {
      chengpinyousaleInit().then((res) => {
        if (res.success) {
          this.fromSearch.enterName = res.data.zuzhijigou;
          this.list(1, this.pageSize);
        } else {
          this.$notify({
            message: "网络请求失败",
            type: "error",
            offset: 100,
          });
        }
      });
    },
    dic() {
      dic().then((res) => {
        if (res.success) {
          const enterName = res.data.chengpinyou;
          this.enterNameAry = enterName;
        } else {
          this.$notify({
            message: "网络请求失败",
            type: "error",
            offset: 100,
          });
        }
      });
    },
    // 查询列表
    list(val, pageSize) {
      this.loading = true;
      this.currentPage = val;
      const params = {
        pageNum: val,
        pageSize: pageSize,
        beginTime: this.fromSearch.time ? this.fromSearch.time[0] : null,
        endTime: this.fromSearch.time ? this.fromSearch.time[1] : null,
        enterName: this.fromSearch.enterName,
      };
      chengpinyousalelList(params).then((res) => {
        if (res.code === 0) {
          this.tableData = res.body.data;
          this.total = res.body.total;
        } else {
          this.$notify({
            message: "网络请求失败",
            type: "error",
            offset: 100,
          });
        }
      });
      this.loading = false;
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.list(val, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.list(this.currentPage, val);
    },
    handleAdd() {
      const params = {
        title: "新增",
        statu: "create",
      };
      this.$router.push({ path: "/chengpinyousaleAdd", query: params });
    },
    // 编辑
    handleEdit() {
      if (this.selectedRows.length === 1) {
        const params = {
          title: "编辑",
          id: this.selectedRows[0],
          statu: "update",
        };
        this.$router.push({ path: "/chengpinyousaleAdd", query: params });
      } else {
        this.$notify({
          message: "请选择一条数据进行编辑",
          type: "info",
          offset: 100,
        });
      }
    },
    // 删除
    handleDel() {
      if (this.selectedRows.length > 0) {
        this.$confirm("确认删除选择数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const params = {
              ids: this.selectedRows,
              lx: 3,
            };
            chengpinyousaleSwitchs(params).then((res) => {
              if (res.code === 0) {
                this.$notify({
                  type: "success",
                  message: "删除成功",
                  offset: 100,
                });
                const totalPage = Math.ceil((this.total - 1) / this.pageSize);
                const currentPage =
                  this.currentPage > totalPage ? totalPage : this.currentPage;
                this.currentPage = currentPage < 1 ? 1 : currentPage;
                this.list(this.currentPage, this.pageSize);
              } else {
                this.$notify({
                  type: "error",
                  message: "删除失败",
                  offset: 100,
                });
              }
            });
          })
          .catch(() => {
            this.$notify({
              type: "info",
              message: "已取消删除",
              offset: 100,
            });
          });
      } else {
        this.$notify({
          message: "请选择一条数据进行删除",
          type: "info",
          offset: 100,
        });
      }
    },
    handleSelectionChange(val) {
      const arr = [];
      val.map((item) => {
        arr.push(item.id);
      });
      this.selectedRows = arr;
    },
    handleFileChange(e) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      chengpinyousaleUpload(formData).then((res) => {
        if (res.data.code === 0) {
          this.$notify({
            message: "批量导入成功!",
            type: "success",
            offset: 100,
          });
        }
        console.log(res);
      });
    },
    chengpinDownLoad() {
      chengpinyousaleDownLoad().then((res) => {
        this.href = res;
        console.log(this.href);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.temclass {
  border: 1px solid rgb(105, 247, 70);
  margin-right: 8px;
  background-color: #fff;
  border-radius: 3px;
  padding: 6px;
  font-size: 14px;
  text-align: center;
}
.file-select > .select-button {
  padding: 6px;
  display: inline;
  color: black;
  /*background-color: #2EA169;*/
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid rgb(245, 242, 104);
  margin-right: 8px;
  text-align: center;
  font-size: 14px;
  // font-weight: bold;
}
/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
</style>
