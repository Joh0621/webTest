<template>
  <div>
    <el-table
      id="tableContent"
      ref="table"
      v-loading="loading"
      size="medium"
      element-loading-text="Loading"
      :data="tableData"
      :stripe="true"
      fit
      highlight-current-row
      tooltip-effect="dark"
      style="width:100%"
      @current-change="handleSelectRow"
      @cell-dblclick="handleDbclick"
      @selection-change="handleSelectionChange"
    >
      <!--<el-table-column align="center" label="" width="50">-->
      <!--<template slot-scope="scope">-->
      <!--{{ (scope.$index + 1) + pageSize*(currentPage-1) }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column v-if="checkbox" align="center" type="selection" width="50"/>
      <el-table-column
        v-for="(item,index) in tableLabel"
        v-if="item.hide ? false :true"
        :key="index"
        :width="item.width ?
          item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
        :align="item.align"
        :label="item.label"
        :prop="item.param"
        :sortable="item.sortable ? 'custom' : false"
        :show-overflow-tooltip="item.showOverflowTooltip"
      >
        <template slot-scope="scope">
          <span
            v-if="item.formatter"
            @click="item.formatter&&item.methods ? handleCol(item.methods,scope.row) : null"
            v-html="item.formatter(scope.row)"
          />
          <span v-else>{{ scope.row[item.param] }}</span>
        </template>
        <template v-if="item.children">
          <el-table-column
            v-for="(list,index) in item.children"
            v-if="list.hide ? false :true"
            :key="index"
            :width="list.width ?list.width : ''"
            :min-width="list.minWidth ? list.minWidth : ''"
            :align="list.align"
            :label="list.label"
            :prop="list.param"
            :sortable="list.sortable ? 'custom' : false"
            :show-overflow-tooltip="item.showOverflowTooltip"
          >
            <template slot-scope="scope">
              <span
                v-if="list.formatter"
                @click="list.formatter&&list.methods ? handleCol(list.methods,scope.row) : null"
                v-html="list.formatter(scope.row)"
              />
              <span v-else>{{ scope.row[list.param] }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column v-if="tableOption.label" :width="tableOption.width" :label="tableOption.label" align="center"
                       class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button v-for="(item,index) in tableOption.options" :key="index" type="text" :icon="item.icon" size="mini"
                     @click="handleButton(item.methods,scope.row,scope.row)"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
      <!--      switch-->
      <el-table-column v-if="tableSwitch.label" :width="tableSwitch.width" :label="tableSwitch.label" align="center"
                       class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-switch
            class="switchStyle"
            v-model="scope.row[tableSwitch.paramItem]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="tableSwitch.activeValue"
            :inactive-value="tableSwitch.inactiveValue"
            :active-text="tableSwitch.activeText"
            :inactive-text="tableSwitch.inactivetext"
            @change="changeSwitch(tableSwitch.methods,scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-pagination text-center" v-show="isPagination">
      <!--      <el-pagination
              id="pageH"
              ref="pagination"
              :current-page="currentPage"
              :page-sizes="[10,50, 100, 150, 200]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />-->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,50, 100, 150, 200]"
        :page-size="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    loading: {
      type: Boolean,
      default: false
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableOption: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    isPagination: {
      type: Boolean,
      default: true
    },
    tableSwitch: {
      type: Object,
      default: () => {
        return {}
      }
    }

  },
  data() {
    return {
      value: '100'
    }
  },
  methods: {
    // this.$emit: 子组件向父组件传值
    handleButton(methods, row, index) { // 按钮事件
      this.$emit('handleButton', { 'methods': methods, 'row': row, 'index': index })
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    handleSelectRow(val) {
      this.$emit('handleSelectRow', val)
    },
    // 行数据多选
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleDbclick(val) {
      this.$emit('handleDbclick', val)
    },
    handleCol(methods, row) {
      this.$emit('handleCol', { 'methods': methods, 'row': row })
    },
    // switch切换
    changeSwitch(methods, row) {
      this.$emit('changeSwitch', { 'methods': methods, 'row': row })
    }
  }
}
</script>

<style>
.el-table--medium td, .el-table--medium th {
  padding: 4px 0 !important;
}

.footer-pagination {
  margin-top: 10px;
  text-align: right;
}

.link-type, .link-type:focus {
  color: rgb(64, 158, 255);
  cursor: pointer;
}

.text-center {
  text-align: center;
}

.switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}

.switchStyle .el-switch__label--left {
  z-index: 9;
  left: 6px;
}

.switchStyle .el-switch__label--right {
  z-index: 9;
  left: -14px;
}

.switchStyle .el-switch__label.is-active {
  display: block;
}

.switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 60px !important;
}
</style>
