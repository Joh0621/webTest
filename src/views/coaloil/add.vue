<template>
  <div class="app-container">
    <div class="form-add"><span class="first">煤制油企业填报</span>
      <span class="first-line">></span>
      <span class="first">按月填报</span
      ><span class="first-line">></span>
      <span class="second">{{ pageTitle }}
      </span></div>
    <div class="form-wrapper">
      <h3 class="form-wrapper-title">{{ pageTitle }}</h3>
      <el-form :model="editForm" :rules="rules" ref="ruleForm" size="small" label-width="180px"
               class="form-box clearfix"
      >
        <!--        /*1企业名称、2时间、3状态、4计划粉煤月加工量、5粉煤月加工量、6平均负荷率、
                7计划平均负荷率、8水资源用量、9单位产品原料消耗、10单位产品综合能耗、11单位产品新鲜水耗、12石脑油产量、
                13柴油产量、14液化气产量、15干气产量、16石脑油供应量、17柴油供应量、18液化气供应量、19干气供应量、20石脑油销售量、
                21柴油销售量、22液化气销售量、23干气销售量、24汽运供应量、25管输供应量、26工程车辆销售量、27城市交通销售量、28工业销售量、
                乙烯原料销售量、调合汽油销售量、重整原料销售量、原料煤价格、煤制油品价格、呼和浩特市销售量、包头市销售量、乌海市销售量、
                赤峰市销售量、通辽市销售量、鄂尔多斯市销售量、
                呼伦贝尔市销售量、巴彦淖尔市销售量、乌兰察布市销售量、锡林格勒盟销售量、阿拉善盟销售量、兴安盟销售量、煤制油月产量（万吨）、计划煤制油月产量（万吨）、*/-->
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" class="no-unit" prop="enterName">
<!--              <el-select v-model="editForm.enterName" clearable>
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
            <el-form-item label="煤制油月产量">
              <el-input placeholder="请输入内容" v-model="editForm.coalOilMonthProduct"
                        type="number"
                        @input="minMax('coalOilMonthProduct',editForm.coalOilMonthProduct)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划煤制油月产量">
              <el-input placeholder="请输入内容" v-model="editForm.coalOilPlanMonthProduct"
                        type="number"
                        @input="minMax('coalOilPlanMonthProduct',editForm.coalOilPlanMonthProduct)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="粉煤月加工量">
              <el-input placeholder="请输入内容" v-model="editForm.pulverizedCoalProcessingCapacity"
                        type="number"
                        @input="minMax('pulverizedCoalProcessingCapacity',editForm.pulverizedCoalProcessingCapacity)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划粉煤月加工量">
              <el-input placeholder="请输入内容" v-model="editForm.coalProcessMonth"
                        type="number"
                        @input="minMax('coalProcessMonth',editForm.coalProcessMonth)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>


        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平均负荷率">
              <el-input placeholder="请输入内容" v-model="editForm.avgLoadRate"
                        type="number"
                        @input="minMax('avgLoadRate',editForm.avgLoadRate)"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划平均负荷率">
              <el-input placeholder="请输入内容" v-model="editForm.planAvgLoadRate"
                        type="number"
                        @input="minMax('planAvgLoadRate',editForm.planAvgLoadRate)"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="水资源用量">
              <el-input placeholder="请输入内容" v-model="editForm.waterUse"
                        type="number"
                        @input="minMax('waterUse',editForm.waterUse)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="煤制油单位产品原料煤耗">
              <el-input placeholder="请输入内容" v-model="editForm.naphthaRawCoalConsumption"
                        type="number"
                        @input="minMax('naphthaRawCoalConsumption',editForm.naphthaRawCoalConsumption)"
              >
                <template slot="append">吨标准煤</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="柴油单位产品原料煤耗">
              <el-input placeholder="请输入内容" v-model="editForm.dieselRawCoalConsumption"
                        type="number"
                        @input="minMax('dieselRawCoalConsumption',editForm.dieselRawCoalConsumption)"
              >
                <template slot="append">吨标准煤</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="液化气单位产品原料煤耗">
              <el-input placeholder="请输入内容" v-model="editForm.lpgRawCoalConsumption"
                        type="number"
                        @input="minMax('lpgRawCoalConsumption',editForm.lpgRawCoalConsumption)"
              >
                <template slot="append">吨标准煤</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="煤制油单位产品综合能耗">
              <el-input placeholder="请输入内容" v-model="editForm.naphthaUnitProductComprehensiveEnergySales"
                        type="number"
                        @input="minMax('naphthaUnitProductComprehensiveEnergySales',editForm.naphthaUnitProductComprehensiveEnergySales)"
              >
                <template slot="append">吨标准煤</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="煤制油单位产品新鲜水耗">
              <el-input placeholder="请输入内容" v-model="editForm.naphthaUnitProductFreshWaterConsumption"
                        type="number"
                        @input="minMax('naphthaUnitProductFreshWaterConsumption',editForm.naphthaUnitProductFreshWaterConsumption)"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="柴油单位产品综合能耗">
              <el-input placeholder="请输入内容" v-model="editForm.dieselUnitProductComprehensiveEnergySales"
                        type="number"
                        @input="minMax('dieselUnitProductComprehensiveEnergySales',editForm.dieselUnitProductComprehensiveEnergySales)"
              >
                <template slot="append">吨标准煤</template>
              </el-input>
            </el-form-item>
          </el-col> -->

        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="液化气单位产品综合能耗">
              <el-input placeholder="请输入内容" v-model="editForm.lpgUnitProductComprehensiveEnergySales"
                        type="number"
                        @input="minMax('lpgUnitProductComprehensiveEnergySales',editForm.lpgUnitProductComprehensiveEnergySales)"
              >
                <template slot="append">吨标准煤</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="石脑油单位产品新鲜水耗">
              <el-input placeholder="请输入内容" v-model="editForm.naphthaUnitProductFreshWaterConsumption"
                        type="number"
                        @input="minMax('naphthaUnitProductFreshWaterConsumption',editForm.naphthaUnitProductFreshWaterConsumption)"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row> -->
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="柴油单位产品新鲜水耗">
              <el-input placeholder="请输入内容" v-model="editForm.dieselUnitProductFreshWaterConsumption"
                        type="number"
                        @input="minMax('dieselUnitProductFreshWaterConsumption',editForm.dieselUnitProductFreshWaterConsumption)"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="液化气单位产品新鲜水耗">
              <el-input placeholder="请输入内容" v-model="editForm.lpgUnitProductFreshWwaterConsumption"
                        type="number"
                        @input="minMax('lpgUnitProductFreshWwaterConsumption',editForm.lpgUnitProductFreshWwaterConsumption)"
              >
                <template slot="append">吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="石脑油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldNaphtha"
                        type="number"
                        @input="minMax('yieldNaphtha',editForm.yieldNaphtha)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="柴油产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldDieselOil"
                        type="number"
                        @input="minMax('yieldDieselOil',editForm.yieldDieselOil)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="石脑油计划产量">
              <el-input placeholder="请输入内容" v-model="editForm.planYieldNaphtha"
                        type="number"
                        @input="minMax('planYieldNaphtha',editForm.planYieldNaphtha)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="柴油计划产量">
              <el-input placeholder="请输入内容" v-model="editForm.planYieldNaphtha"
                        type="number"
                        @input="minMax('planYieldDieselOil',editForm.planYieldNaphtha)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="液化气产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldLpg"
                        type="number"
                        @input="minMax('yieldLpg',editForm.yieldLpg)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="干气产量">
              <el-input placeholder="请输入内容" v-model="editForm.yieldDryGas"
                        type="number"
                        @input="minMax('yieldDryGas',editForm.yieldDryGas)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="石脑油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.monthSupplyNaphtha"
                        type="number"
                        @input="minMax('monthSupplyNaphtha',editForm.monthSupplyNaphtha)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="柴油供应量">
              <el-input placeholder="请输入内容" v-model="editForm.monthSupplyDieselOil"
                        type="number"
                        @input="minMax('monthSupplyDieselOil',editForm.monthSupplyDieselOil)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="液化气供应量">
              <el-input placeholder="请输入内容" v-model="editForm.monthSupplyLpg"
                        type="number"
                        @input="minMax('monthSupplyLpg',editForm.monthSupplyLpg)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="干气供应量">
              <el-input placeholder="请输入内容" v-model="editForm.monthSupplyDryGas"
                        type="number"
                        @input="minMax('monthSupplyDryGas',editForm.monthSupplyDryGas)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="汽运供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyBusTrans"
                        type="number"
                        @input="minMax('supplyBusTrans',editForm.supplyBusTrans)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管输供应量">
              <el-input placeholder="请输入内容" v-model="editForm.supplyPipeTrans"
                        type="number"
                        @input="minMax('supplyPipeTrans',editForm.supplyPipeTrans)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="柴油销售量">
              <el-input placeholder="请输入内容" v-model="editForm.dieselOilSales"
                        type="number"
                        @input="minMax('dieselOilSales',editForm.dieselOilSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="液化气销售量">
              <el-input placeholder="请输入内容" v-model="editForm.lgpSales"
                        type="number"
                        @input="minMax('lgpSales',editForm.lgpSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="石脑油销售量">
              <el-input placeholder="请输入内容" v-model="editForm.naphthaSales"
                        type="number"
                        @input="minMax('naphthaSales',editForm.naphthaSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="干气销售量">
              <el-input placeholder="请输入内容" v-model="editForm.dryGasSales"
                        type="number"
                        @input="minMax('dryGasSales',editForm.dryGasSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工程车辆销售量">
              <el-input placeholder="请输入内容" v-model="editForm.projectBusSales"
                        type="number"
                        @input="minMax('projectBusSales',editForm.projectBusSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市交通销售量">
              <el-input placeholder="请输入内容" v-model="editForm.cityTrafficSales"
                        type="number"
                        @input="minMax('cityTrafficSales',editForm.cityTrafficSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工业销售量">
              <el-input placeholder="请输入内容" v-model="editForm.industrySales"
                        type="number"
                        @input="minMax('industrySales',editForm.industrySales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙烯原料销售量">
              <el-input placeholder="请输入内容" v-model="editForm.c2h4MaterialSales"
                        type="number"
                        @input="minMax('c2h4MaterialSales',editForm.c2h4MaterialSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="调合汽油销售量">
              <el-input placeholder="请输入内容" v-model="editForm.mixGasolineSales"
                        type="number"
                        @input="minMax('mixGasolineSales',editForm.mixGasolineSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重整原料销售量">
              <el-input placeholder="请输入内容" v-model="editForm.reformMaterialSales"
                        type="number"
                        @input="minMax('reformMaterialSales',editForm.reformMaterialSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="原料煤价格">
              <el-input placeholder="请输入内容" v-model="editForm.rawCoalPrice"
                        type="number"
                        @input="minMax('rawCoalPrice',editForm.rawCoalPrice)"
              >
                <template slot="append">元/吨标煤</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="煤制油品价格">
              <el-input placeholder="请输入内容" v-model="editForm.coalOilPrice"
                        type="number"
                        @input="minMax('coalOilPrice',editForm.coalOilPrice)"
              >
                <template slot="append">元/吨标煤</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="呼和浩特市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.huhehaoteSales"
                        type="number"
                        @input="minMax('huhehaoteSales',editForm.huhehaoteSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="包头市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.baotouSales"
                        type="number"
                        @input="minMax('baotouSales',editForm.baotouSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乌海市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.wuhaiSales"
                        type="number"
                        @input="minMax('wuhaiSales',editForm.wuhaiSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="赤峰市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.chifengSales"
                        type="number"
                        @input="minMax('chifengSales',editForm.chifengSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="通辽市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.tongliaoSales"
                        type="number"
                        @input="minMax('tongliaoSales',editForm.tongliaoSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="鄂尔多斯市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.eerduosiSales"
                        type="number"
                        @input="minMax('eerduosiSales',editForm.eerduosiSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="呼伦贝尔市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.hulunbeierSales"
                        type="number"
                        @input="minMax('hulunbeierSales',editForm.hulunbeierSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="巴彦淖尔市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.bayannaoerSales"
                        type="number"
                        @input="minMax('bayannaoerSales',editForm.bayannaoerSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乌兰察布市销售量">
              <el-input placeholder="请输入内容" v-model="editForm.wulanchabuSales"
                        type="number"
                        @input="minMax('wulanchabuSales',editForm.wulanchabuSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="锡林格勒盟销售量">
              <el-input placeholder="请输入内容" v-model="editForm.xilingelemengSales"
                        type="number"
                        @input="minMax('xilingelemengSales',editForm.xilingelemengSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="阿拉善盟销售量">
              <el-input placeholder="请输入内容" v-model="editForm.alashanmengSales"
                        type="number"
                        @input="minMax('alashanmengSales',editForm.alashanmengSales)"
              >
                <template slot="append">万吨</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="兴安盟销售量">
              <el-input placeholder="请输入内容" v-model="editForm.xinganmengSales"
                        type="number"
                        @input="minMax('xinganmengSales',editForm.xinganmengSales)"
              >
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
import { coaloilSave, coaloilUpdate, dic, enterpriseInit } from '@/api/fill'

export default {
  name: 'editFormAdd',
  data() {
    return {
      editForm: {
        enterName: '',
        recordDate: '',
        coalProcessMonth: '',
        pulverizedCoalProcessingCapacity: '',
        avgLoadRate: '',
        planAvgLoadRate: '',
        waterUse: '',
        rawCoalConsumption: '',
        unitProductComprehensiveEnergySales: '',
        unitProductFreshWaterConsumption: '',
        yieldNaphtha: '',
        yieldDieselOil: '',
        yieldLpg: '',
        yieldDryGas: '',
        monthSupplyNaphtha: '',
        monthSupplyDieselOil: '',
        monthSupplyLpg: '',
        monthSupplyDryGas: '',
        naphthaSales: '',
        dieselOilSales: '',
        lgpSales: '',
        dryGasSales: '',
        supplyBusTrans: '',
        supplyPipeTrans: '',
        projectBusSales: '',
        cityTrafficSales: '',
        industrySales: '',
        c2h4MaterialSales: '',
        mixGasolineSales: '',
        reformMaterialSales: '',
        rawCoalPrice: '',
        coalOilPrice: '',
        huhehaoteSales: '',
        baotouSales: '',
        wuhaiSales: '',
        chifengSales: '',
        eerduosiSales: '',
        hulunbeierSales: '',
        bayannaoerSales: '',
        wulanchabuSales: '',
        xilingelemengSales: '',
        alashanmengSales: '',
        xinganmengSales: '',
        coalOilMonthProduct: '',
        tongliaoSales: '',
        coalOilPlanMonthProduct: '',
        naphthaRawCoalConsumption: '',
        dieselRawCoalConsumption: '',
        lpgRawCoalConsumption: '',
        naphthaUnitProductComprehensiveEnergySales: '',
        dieselUnitProductComprehensiveEnergySales: '',
        lpgUnitProductComprehensiveEnergySales: '',
        naphthaUnitProductFreshWaterConsumption: '',
        dieselUnitProductFreshWaterConsumption: '',
        lpgUnitProductFreshWwaterConsumption: '',
        planYieldNaphtha: '',
        planYieldDieselOil: ''
      },
      rules: {
        /*enterName: [
          { required: true, message: '请选择企业名称', trigger: 'change' }
        ],*/
        recordDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      enterNameAry: []
    }
  },
  created() {
    this.pageTitle = this.$route.query.title
    this.statu = this.$route.query.statu
    // this.dic()
    this.enterpriseInit()
  },
  mounted() {
    if (this.statu !== 'create') {
      this.update()
    }
  },
  methods: {
    enterpriseInit() {
      enterpriseInit().then((res) => {
        if (res.success) {
          this.editForm.enterName = res.data.zuzhijigou
        } else {
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
          const enterName = res.data.meizhiyou
          this.enterNameAry = enterName
        } else {
          this.$notify({
            message: '网络请求失败',
            type: 'error',
            offset: 100
          })
        }
      })
    },
    // 数据回显
    update() {
      coaloilUpdate(this.$route.query.id).then((res) => {
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
      this.$router.push('/coaloil/list')
    },
    createData() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          coaloilSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '保存成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/coaloil/list')
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
          coaloilSave(this.editForm).then((res) => {
            if (res.code === 0) {
              this.$notify({
                message: '修改成功',
                type: 'success',
                offset: 100
              })
              this.$router.push('/coaloil/list')
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
