<template>
  <div class="app-container">
    <div class="form-add"><span class="first">成品油销售企业填报</span>
      <span class="first-line">></span>
      <span class="first">库存按月填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" size="small" :rules="rules" ref="ruleForm" label-width="140px"
               class="form-box clearfix"
      >
        <!--        // 1企业名称、2时间、3盟市名称、油库汽油总库存、油库柴油总库存、油库煤油总库存、油库原油总库存、状态-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" class="no-unit" prop="enterName">
<!--              <el-select v-model="editForm.enterName" placeholder="请选择">
                <el-option
                  v-for="item in enterNameAry"
                  :key="item.typeName"
                  :label="item.typeName"
                  :value="item.typeName"
                >
                </el-option>
              </el-select>-->
              <el-input v-model="editForm.enterName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" class="no-unit" prop="recordDate">
              <el-date-picker
                v-model="editForm.recordDate"
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="盟市名称" class="no-unit">
              <el-select v-model="editForm.leagueCityName" placeholder="请选择">
                <el-option
                  v-for="item in leagueCityNameAry"
                  :key="item.dictItemName"
                  :label="item.dictItemName"
                  :value="item.dictItemName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
<!--          <el-col :span="12">
            <el-form-item label="企业结构" class="no-unit">
              <el-select v-model="editForm.groupType" placeholder="请选择">
                <el-option
                  v-for="item in optionsGroupType"
                  :key="item.dictItemName"
                  :label="item.dictItemName"
                  :value="item.dictItemName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="油库汽油总库存">
              <el-input placeholder="请输入内容" v-model="editForm.gasolineInventoryOilDepot"
                        type="number"
                        @input="minMax('gasolineInventoryOilDepot',editForm.gasolineInventoryOilDepot)">
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="油库柴油总库存">
              <el-input placeholder="请输入内容" v-model="editForm.dieselInventoryOilDepot"
                        type="number"
                        @input="minMax('dieselInventoryOilDepot',editForm.dieselInventoryOilDepot)">
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="油库煤油总库存">
              <el-input placeholder="请输入内容" v-model="editForm.aviationCoalInventoryOilDepot"
                        type="number"
                        @input="minMax('aviationCoalInventoryOilDepot',editForm.aviationCoalInventoryOilDepot)">
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="油库原油总库存">
              <el-input placeholder="请输入内容" v-model="editForm.crudeInventoryOilDepot"
                        type="number"
                        @input="minMax('crudeInventoryOilDepot',editForm.crudeInventoryOilDepot)">
                <template slot="append">万吨</template>
              </el-input>
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
import {
  chengpinyoudepotSave,
  chengpinyoudepotUpdate,
  dic,
  chengpinyoudepotUpdateSave,
  chengpinyousaleInit
} from '@/api/fill'


export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        recordDate: '',
        enterName: '',
        // groupType:'',
        leagueCityName: '',
        gasolineInventoryOilDepot: '',
        dieselInventoryOilDepot: '',
        aviationCoalInventoryOilDepot: '',
        crudeInventoryOilDepot: ''
      },
      optionsGroupType: [],
      leagueCityNameAry:[],
      enterNameAry:[],
      rules: {
       /* enterName: [
          { required: true, message: '请选择企业名称', trigger: 'change' }
        ],*/
        recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    this.dic()
    this.chengpinyousaleInit()
  },
  mounted() {
    if (this.statu !== 'create') {
      this.update()
    }
  },
  methods: {
    chengpinyousaleInit(){
      chengpinyousaleInit().then((res)=>{
        if(res.success){
          this.editForm.enterName=res.data.zuzhijigou
        }else{
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    minMax(name, value) {
      if (value < 0) {
        this.editForm[name] = 0
      } else if (value > 1000000) {
        this.editForm[name] = 1000000
      }
    },
    dic() {
      dic().then((res) => {
        if (res.success) {
          const data = res.data
          const groupTypes = data.groupType
          const leagueCityType = data.leagueCityType
          // const enterName=data.chengpinyou
          this.optionsGroupType = groupTypes
          this.leagueCityNameAry = leagueCityType
          // this.enterNameAry=enterName
        }
      })
    },
    // 数据回显
    update() {
      chengpinyoudepotUpdate(this.$route.query.id).then((res) => {
        if (res.code === 0) {
          this.editForm = res.body
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
      this.$router.push('/chengpinyoudepot/list')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          chengpinyoudepotSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/chengpinyoudepot/list')
            } else {
              this.$notify({
                message: '保存失败' + (res.body == '已存在该记录！' ? ',' + res.body : ''),
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

    updateData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          chengpinyoudepotUpdateSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/chengpinyoudepot/list')
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
