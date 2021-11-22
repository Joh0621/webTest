import { get, post, postParams } from '@/utils/request'

//气田供应按月填报
// 查询
export const gasfieldlist = params => post(`/gassupplymonth/list`, params)
// 删除
export const gasfieldSwitchs = params => post(`/gassupplymonth/switchs`, params)
// 保存
export const gasfieldsave = params => post(`/gassupplymonth/save`, params)
// 更新
export const gasfieldupdate = params => get(`/gassupplymonth/select/${params}`)

// 油气田企业按日填报
// 查询
export const list = params => post(`/oilgasday/list`, params)
// 保存
export const save = params => post(`/oilgasday/save`, params)
// 更新
export const update = params => get(`/oilgasday/select/${params}`)
// 删除
// export const deleteList = params => deletefn(`/oilgasday/delete/${params}`)
export const oilgasdaySwitchs = params => post(`/oilgasday/switchs`, params)

export const oilgasdayUpload = (params) => postParams('/oilgasday/test', params)

//查询所属企业名称
export const oilgasdayInit = () => get(`/oilgasday/init`)
// 油气田企业按月填报
// 查询
export const gasmonthList = params => post('/oilgasmonth/gasList', params)

// 查询
export const oilmonthList = params => post('/oilgasmonth/oilList', params)
// 保存
export const oilgasmonthSave = params => post('/oilgasmonth/save', params)
// 更新(油田按月)
export const oilmonthUpdate = params => get(`/oilgasmonth/select/${params}`)
//更新（气田按月）
export const gasmonthUpdate = params => get(`/oilgasmonth/select1/${params}`)
// 删除
export const oilgasmonthSwitchs = params => post(`/oilgasmonth/switchs`, params)

// 油田区域供应按月查询填报
// 查询
export const oilsupplymonthList = params => post('/oilsupplymonth/list', params)
// 保存
export const oilsupplymonthSave = params => post('/oilsupplymonth/save', params)
// 更新(油田按月)
export const oilsupplymonthUpdate = params => get(`/oilsupplymonth/select/${params}`)
// 删除
export const oilsupplymonthSwitchs = params => post(`/oilsupplymonth/switchs`, params)

// 国土资源厅按年填报
// 查询
export const guotuGasList = params => post('/guotu/gasList', params)
export const guotuOilList = params => post('/guotu/oilList', params)
// 保存
export const guotuSave = params => post('/guotu/save', params)
// 更新（油田）
export const guotuOilUpdate = params => get(`/guotu/select/${params}`)
// 更新（气田）
export const guotuGasUpdate = params => get(`/guotu/select1/${params}`)
// 删除
export const guotuSwitchs = params => post(`/guotu/switchs`, params)

// 煤制气企业按月填报
// 查询
export const coalgasList = params => post('/coalgas/list', params)
// 保存
export const coalgasSave = params => post('/coalgas/save', params)
// 更新
export const coalgasUpdate = params => get(`/coalgas/select/${params}`)
// 删除
export const coalgasSwitchs = params => post(`/coalgas/switchs`, params)

// 企业信息填报接口
// 查询
export const enterpriseList = params => post('/enterprise/list', params)
// 保存
export const enterpriseSave = params => post('/enterprise/save', params)
// 更新
export const enterpriseUpdate = params => get(`/enterprise/select/${params}`)
// 删除
export const enterpriseSwitchs = params => post(`/enterprise/switchs`, params)

// 煤制油填报接口
// 查询
export const coaloilList = params => post('/coaloil/list', params)
// 保存
export const coaloilSave = params => post('/coaloil/save', params)
// 更新
export const coaloilUpdate = params => get(`/coaloil/select/${params}`)
// 删除
export const coaloilSwitchs = params => post(`/coaloil/switchs`, params)

// 成品油销售企业销售填报
// 查询
export const chengpinyousalelList = params => post('/chengpinyousale/list', params)
// 保存
export const chengpinyousalelSave = params => post('/chengpinyousale/save', params)
// 更新
export const chengpinyousaleUpdate = params => get(`/chengpinyousale/select/${params}`)
// 删除
export const chengpinyousaleSwitchs = params => post(`/chengpinyousale/switchs`, params)
//获取当前所属企业
export const chengpinyousaleInit = params => get(`/chengpinyousale/init`)

export const chengpinyousaleDownLoad = () => get('/chengpinyousale/excel/template')
export const chengpinyousaleUpload = (params) => postParams('/chengpinyousale/test', params)

// 成品油销售企业库存填报
// 查询
export const chengpinyoudepotlList = params => post('/chengpinyoudepot/list', params)
// 新增保存
export const chengpinyoudepotSave = params => post('/chengpinyoudepot/save', params)
// 更新保存
export const chengpinyoudepotUpdateSave = params => post('/chengpinyoudepot/update', params)
// 更新
export const chengpinyoudepotUpdate = params => get(`/chengpinyoudepot/select/${params}`)
// 删除
export const chengpinyoudepotSwitchs = params => post(`/chengpinyoudepot/switchs`, params)

// 炼油厂企业填报
// 查询
export const refinerylList = params => post('/refinery/list', params)
// 保存
export const refinerySave = params => post('/refinery/save', params)
// 更新
export const refineryUpdate = params => get(`/refinery/select/${params}`)
// 删除
export const refinerySwitchs = params => post(`/refinery/switchs`, params)

// 管道企业按日填报
// 查询
export const pipelinedaylList = params => post('/pipelineday/list', params)
// 保存
export const pipelinedaysave = params => post('/pipelineday/save', params)
// 更新
export const pipelinedayUpdate = params => get(`/pipelineday/select/${params}`)
// 删除
export const pipelinedaySwitchs = params => post(`/pipelineday/switchs`, params)
//获取组织机构
export const pipelinedayInit = () => get(`/pipelineday/init`)

// 管道企业按yue填报   非供暖季天然气管道按月填报
// 查询
export const pipmonthlList = params => post('/pipmonth/list', params)
// 保存
export const pipmonthsave = params => post('/pipmonth/save', params)
// 更新
export const pipmonthUpdate = params => get(`/pipmonth/select/${params}`)
// 删除
export const pipmonthSwitchs = params => post(`/pipmonth/switchs`, params)
//获取组织机构
export const pipmonthInit = () => get(`/pipmonth/init`)

// 管道企业管道信息填报
// 查询
export const pipelinemonthlList = params => post('/pipelinemonth/list', params)
// 保存
export const pipelinemonthsave = params => post('/pipelinemonth/save', params)
// 更新
export const pipelinemonthUpdate = params => get(`/pipelinemonth/select/${params}`)
// 删除
export const pipelinemonthSwitchs = params => post(`/pipelinemonth/switchs`, params)
// 获取当前用户所属企业
export const pipelinemonthInit = params => get(`/pipelinemonth/init`)

// 城市燃气企业按年填报
// 查询
export const citygasyearlList = params => post('/citygasyear/list', params)
// 新增保存
export const citygasyearhsave = params => post('/citygasyear/save', params)
// 编辑保存
export const citygasyearChange = params => post('/citygasyear/update', params)
// 更新
export const citygasyearUpdate = params => get(`/citygasyear/select/${params}`)
// 删除
export const citygasyearSwitchs = params => post(`/citygasyear/switchs`, params)

//查询当前盟市下的旗县
export const citygasyearInit = () => get('/citygasyear/init')
//新增页面保存
export const citygasyearInsertAll = params => post('/citygasyear/insertAll', params)

// 城市燃气企业按日填报
// 查询
export const citygasdaylList = params => post('/citygasday/list', params)
// 保存
export const citygasdayrhsave = params => post('/citygasday/save', params)
// 更新
export const citygasdayUpdate = params => get(`/citygasday/select/${params}`)
// 删除
export const citygasdaySwitchs = params => post(`/citygasday/switchs`, params)

// 城燃企业按日调峰填报
// 查询
export const citygaspeekdaylList = params => post('/citygaspeekday/list', params)
// 保存
export const citygaspeekdaysave = params => post('/citygaspeekday/save', params)
// 更新
export const citygaspeekdayUpdate = params => get(`/citygaspeekday/select/${params}`)
// 删除
export const citygaspeekdaySwitchs = params => post(`/citygaspeekday/switchs`, params)

// 能源局填报-按年填报
// 查询
export const nengyuanjuyearList = params => post('/nengyuanjuyear/list', params)
// 保存
export const nengyuanjuyearsave = params => post('/nengyuanjuyear/save', params)
// 更新
export const nengyuanjuyearUpdate = params => get(`/nengyuanjuyear/select/${params}`)
// 删除
export const nengyuanjuyearSwitchs = params => post(`/nengyuanjuyear/switchs`, params)

// 能源局-应急调峰事件填报
// 查询
export const emergencyList = params => post('/emergency/list', params)
// 保存
export const emergencysave = params => post('/emergency/save', params)
// 更新
export const emergencyUpdate = params => get(`/emergency/select/${params}`)
// 删除
export const emergencSwitchs = params => post(`/emergency/switchs`, params)

// 能源局-储气释放填报
// 查询
export const gasreleaseList = params => post('/gasrelease/list', params)
// 保存
export const gasreleasesave = params => post('/gasrelease/save', params)
// 更新
export const gasreleaseUpdate = params => get(`/gasrelease/select/${params}`)
// 删除
export const gasreleaseSwitchs = params => post(`/gasrelease/switchs`, params)

// 字典表
export const dic = () => get('/dict/init')

// 煤制气企业信息填报
export const coalgasEnterpriseList = params => post('/enterprise/coalgasList', params)
// 煤制油企业信息填报
export const coaloilEnterpriseList = params => post('/enterprise/coaloilList', params)
// 炼厂企业信息填报
export const lianchangEnterpriseList = params => post('/enterprise/lianchangList', params)
//获取当前用户所属企业
export const enterpriseInit = () => get('/enterprise/init')

// 管道企业按日填报
// 原油管线查询
export const crudeList = params => post('/pipmonth/crudeList', params)
// 天然气管线查询
export const gasList = params => post('/pipelineday/gasList', params)
// 天然气yue管线查询
export const gasmonList = params => post('/pipmonth/gasList', params)
// 成品油管线查询
export const productList = params => post('/pipmonth/productList', params)
// 气井
// 查询
export const gaswellList = params => post('/gaswell/list', params)
// 保存
export const gaswellSave = params => post('/gaswell/save', params)
// 更新
export const gaswellUpdate = params => get(`/gaswell/select/${params}`)
// 删除
export const gaswellSwitchs = params => post(`/gaswell/switchs`, params)

// 油井
// 查询
export const oilwellList = params => post('/oilwell/list', params)
// 保存
export const oilwellSave = params => post('/oilwell/save', params)
// 更新
export const oilwellUpdate = params => get(`/oilwell/select/${params}`)
// 删除
export const oilwellSwitchs = params => post(`/oilwell/switchs`, params)

// 生产基地信息填报
// 查询
export const baseList = params => post('/base/list', params)
// 保存
export const baseSave = params => post('/base/save', params)
// 更新
export const baseUpdate = params => get(`/base/select/${params}`)
// 删除
export const baseSwitchs = params => post(`/base/switchs`, params)

// 能源局按月填报
// 查询
export const bureauList = params => post('/bureau/list', params)
// 保存
export const bureauSave = params => post('/bureau/save', params)
// 更新
export const bureauUpdate = params => get(`/bureau/select/${params}`)
// 删除
export const bureauSwitchs = params => post(`/bureau/switchs`, params)

// 菜单管理

// 新增菜单
export const menuAdd = params => post('/sys/menu/add', params)
// 删除菜单
export const menuDelete = params => get('/sys/menu/delete', params)
// 所有菜单列表
export const menuList = () => get('/sys/menu/list')
// 更新菜单
export const menuUpdate = params => post('/sys/menu/update', params)
// 通过id查询菜单回显
export const menuShow = params => get(`/sys/menu/select/${params}`)

// 组织机构管理
// 新增组织机构
export const orgAdd = params => post('/sys/org/add', params)
// 删除组织机构
export const orgDelete = params => get('/sys/org/delete', params)
// 所有组织机构列表
export const orgList = () => get('/sys/org/list')
// 更新组织机构
export const orgUpdate = params => post('/sys/org/update', params)
// 通过id查询组织机构单回显
export const orgShow = params => get(`/sys/org/select/${params}`)
// 通过id查询该机构下的用户
export const selectUser = params => get(`/sys/org/selectUser/${params}`)

// 角色管理

// 新增或修改角色
export const roleAdd = params => post('/sys/role/add', params)

// 批量删除角色
export const delRole = params => get('/sys/role/delete', params)
// 获取角色列表
export const listRole = () => get('/sys/role/list')
// 角色列表回显
export const roleShow = params => get(`/sys/role/select/${params}`)
// 查询角色下授权菜单
export const resourcesRole = params => get('/sys/role/resources', params)
// 设置角色授权的菜单资源
export const setResourcesRole = params => get('/sys/role/setResources', params)
// 设置角色授权的用户
export const setUsersRole = params => get('/sys/role/setUsers', params)
// 查询角色下授权用户
export const usersRole = params => get('/sys/role/users', params)

//用户管理
// 用户列表
export const userPage = params => post('/sys/user/page', params)
// 菜单管理查询所有用户列表
export const userList = () => get('/sys/user/list')
// 新增用户
export const userAdd = params => post('/sys/user/add', params)
// 删除用户
export const userDelete = params => get('/sys/user/delete', params)
// 修改用户
export const userUpdate = params => post('/sys/user/update', params)
// 用户列表回显
export const userShow = params => get(`/sys/user/select/${params}`)

// 重置密码
export const resetPwd = params => get(`/password/resetPwd/${params}`)

// 日志管理
// 条件查询日志列表
export const logList = (params) => post('/syslog/logList', params)
export const secLogList = (params) => post('/syslog/secLogList', params)

// 成品油销售企业库存填报导入接口

export const chengpinDownLoad = () => get('/chengpinyoudepot/excel/template')
export const chengpinUpload = (params) => postParams('/chengpinyoudepot/test', params)

//年度产量信息填报
// 查询
export const yieldyearList = params => post('/yieldyear/list', params)
// 保存
export const yieldyearSave = params => post('/yieldyear/save', params)
// 更新
export const yieldyearUpdate = params => get(`/yieldyear/select/${params}`)
// 删除
export const yieldyearSwitchs = params => post(`/yieldyear/switchs`, params)

// 气井月度产量信息填报
// 查询
export const tGasWellMonthList = params => post('/tGasWellMonth/list', params)
// 保存
export const tGasWellMonthSave = params => post('/tGasWellMonth/save', params)
// 更新
export const tGasWellMonthUpdate = params => get(`/tGasWellMonth/select/${params}`)
// 删除
export const tGasWellMonthSwitchs = params => post(`/tGasWellMonth/switchs`, params)

// 油井月度产量信息填报
// 查询
export const tOilWellMonthList = params => post('/tOilWellMonth/list', params)
// 保存
export const tOilWellMonthSave = params => post('/tOilWellMonth/save', params)
// 更新
export const tOilWellMonthUpdate = params => get(`/tOilWellMonth/select/${params}`)
// 删除
export const tOilWellMonthSwitchs = params => post(`/tOilWellMonth/switchs`, params)

// 地方政府储气填报
// 查询
export const governmentyearList = params => post('/governmentyear/list', params)
// 保存
export const governmentyearSave = params => post('/governmentyear/save', params)
// 更新
export const governmentyearUpdate = params => get(`/governmentyear/select/${params}`)
// 删除
export const governmentyearSwitchs = params => post(`/governmentyear/switchs`, params)

// 新增保存
export const governmentyearInsertAll = params => post('/governmentyear/insertAll', params)
// 编辑保存
export const governmentyearChange = params => post('/governmentyear/update', params)

// 地方政府储气填报
// 查询
export const gasyearList = params => post('/gasyear/list', params)
// 保存
export const gasyearSave = params => post('/gasyear/save', params)
// 更新
export const gasyearUpdate = params => get(`/gasyear/select/${params}`)
// 删除
export const gasyearSwitchs = params => post(`/gasyear/switchs`, params)
//获取当前用户企业结构
export const gasyearInit = params => get(`/gasyear/init`)

// 城市燃气按年填报(能源局)
// 查询
export const energygasyearList = params => post('/energygasyear/list', params)
// 新增保存
export const energygasyearSave = params => post('/energygasyear/save', params)
// 编辑保存
export const energygasyearChange = params => post('/energygasyear/update', params)
// 更新
export const energygasyearUpdate = params => get(`/energygasyear/select/${params}`)
// 删除
export const energygasyearSwitchs = params => post(`/energygasyear/switchs`, params)
//查询当前盟市下的旗县
export const energygasyearInit = () => get('/energygasyear/init')
//新增页面保存
export const insertAll = params => post('/energygasyear/insertAll', params)

// 城市燃气按日填报(能源局)
// 查询
export const energygasdayList = params => post('/energygasday/list', params)
// 保存
export const energygasdaySave = params => post('/energygasday/save', params)
// 更新
export const energygasdayUpdate = params => get(`/energygasday/select/${params}`)
// 删除
export const energygasdaySwitchs = params => post(`/energygasday/switchs`, params)
//获取组织机构
export const energygasdayInit = () => get('/energygasday/init')
// 城燃按日调峰填报(能源局)
// 查询
export const energygaspeekdayList = params => post('/energygaspeekday/list', params)
// 保存
export const energygaspeekdaySave = params => post('/energygaspeekday/save', params)
// 更新
export const energygaspeekdayUpdate = params => get(`/energygaspeekday/select/${params}`)
// 删除
export const energygaspeekdaySwitchs = params => post(`/energygaspeekday/switchs`, params)

// 气年度产量信息填报
// 查询
export const gasyieldyearList = params => post('/gasyieldyear/list', params)
// 保存
export const gasyieldyearSave = params => post('/gasyieldyear/save', params)
// 更新
export const gasyieldyearUpdate = params => get(`/gasyieldyear/select/${params}`)
// 删除
export const gasyieldyearwitchs = params => post(`/gasyieldyear/switchs`, params)
//获取组织机构以及区域名
export const gasyieldyearInit = params => get(`/gasyieldyear/init`)

// 油田年度产量信息填报
// 查询
export const oilyieldyearList = params => post('/oilyieldyear/list', params)
// 保存
export const oilyieldyearSave = params => post('/oilyieldyear/save', params)
// 更新
export const oilyieldyearUpdate = params => get(`/oilyieldyear/select/${params}`)
// 删除
export const oilyieldyearwitchs = params => post(`/oilyieldyear/switchs`, params)
//获取组织机构以及区域名
export const oilyieldyearInit = params => get(`/oilyieldyear/init`)

// 统计局年度产量信息填报
// 查询
export const bureauyieldyearList = params => post('/bureauyieldyear/list', params)
// 保存
export const bureauyieldyearSave = params => post('/bureauyieldyear/save', params)
// 更新
export const bureauyieldyearUpdate = params => get(`/bureauyieldyear/select/${params}`)
// 删除
export const bureauyieldyearSwitchs = params => post(`/bureauyieldyear/switchs`, params)

// 气田生产基地信息填报
// 查询
export const gasbaseList = params => post('/gasbase/list', params)
// 保存
export const gasbaseSave = params => post('/gasbase/save', params)
// 更新
export const gasbaseUpdate = params => get(`/gasbase/select/${params}`)
// 删除
export const gasbaseSwitchs = params => post(`/gasbase/switchs`, params)

// 油田生产基地信息填报
// 查询
export const oilbaseList = params => post('/oilbase/list', params)
// 保存
export const oilbaseSave = params => post('/oilbase/save', params)
// 更新
export const oilbaseUpdate = params => get(`/oilbase/select/${params}`)
// 删除
export const oilbaseSwitchs = params => post(`/oilbase/switchs`, params)

// 盟市非供暖季按月填报
// 查询
export const citygasmonthList = params => post('/citygasmonth/list', params)
// 保存
export const citygasmonthSave = params => post('/citygasmonth/save', params)
// 更新
export const citygasmonthUpdate = params => get(`/citygasmonth/select/${params}`)
// 删除
export const citygasmonthSwitchs = params => post(`/citygasmonth/switchs`, params)

export const citygasmonthsaleDownLoad = () => get('/citygasmonth/excel/template')
export const citygasmonthsaleUpload = (params) => postParams('/citygasmonth/test', params)

// 盟市非供暖季按月填报(能源局)
// 查询
export const energygasmonthList = params => post('/energygasmonth/list', params)
// 保存
export const energygasmonthSave = params => post('/energygasmonth/save', params)
// 更新
export const energygasmonthUpdate = params => get(`/energygasmonth/select/${params}`)
// 删除
export const energygasmonthSwitchs = params => post(`/energygasmonth/switchs`, params)

// 气田生产基地月产量填报
// 查询
export const gasbasemonthList = params => post('/gasbasemonth/list', params)
// 新增保存
export const gasbasemonthSave = params => post('/gasbasemonth/save', params)
// 编辑保存
export const gasbasemonthChange = params => post('/gasbasemonth/update', params)
// 更新
export const gasbasemonthUpdate = params => get(`/gasbasemonth/select/${params}`)
// 删除
export const gasbasemonthSwitchs = params => post(`/gasbasemonth/switchs`, params)

// 油田生产基地月产量填报
// 查询
export const oilbasemonthList = params => post('/oilbasemonth/list', params)
// 新增保存
export const oilbasemonthSave = params => post('/oilbasemonth/save', params)
// 编辑保存
export const oilbasemonthChange = params => post('/oilbasemonth/update', params)
// 更新
export const oilbasemonthUpdate = params => get(`/oilbasemonth/select/${params}`)
// 删除
export const oilbasemonthSwitchs = params => post(`/oilbasemonth/switchs`, params)

// 气田信息填报
// 查询
export const gasinfoList = params => post('/gasinfo/list', params)
// 新增保存
export const gasinfoSave = params => post('/gasinfo/save', params)
// 编辑保存
export const gasinfoChange = params => post('/gasinfo/update', params)
// 更新
export const gasinfoUpdate = params => get(`/gasinfo/select/${params}`)
// 删除
export const gasinfoSwitchs = params => post(`/gasinfo/switchs`, params)

// 油田信息填报
// 查询
export const oilinfoList = params => post('/oilinfo/list', params)
// 新增保存
export const oilinfoSave = params => post('/oilinfo/save', params)
// 编辑保存
export const oilinfoChange = params => post('/oilinfo/update', params)
// 更新
export const oilinfoUpdate = params => get(`/oilinfo/select/${params}`)
// 删除
export const oilinfoSwitchs = params => post(`/oilinfo/switchs`, params)

// 成品油购进量填报
// 查询
export const chengpinyoupurchaseList = params => post('/chengpinyoupurchase/list', params)
// 新增保存
export const chengpinyoupurchaseSave = params => post('/chengpinyoupurchase/save', params)
// 编辑保存
export const chengpinyoupurchaseChange = params => post('/chengpinyoupurchase/update', params)
// 更新
export const chengpinyoupurchaseUpdate = params => get(`/chengpinyoupurchase/select/${params}`)
// 删除
export const chengpinyoupurchaseSwitchs = params => post(`/chengpinyoupurchase/switchs`, params)

// 管道公司按日调峰填报
// 查询
export const pipelinepeekdayList = params => post('/pipelinepeekday/list', params)
// 新增保存
export const pipelinepeekdaySave = params => post('/pipelinepeekday/save', params)
// 编辑保存
export const pipelinepeekdayChange = params => post('/pipelinepeekday/update', params)
// 更新
export const pipelinepeekdayUpdate = params => get(`/pipelinepeekday/select/${params}`)
// 删除
export const pipelinepeekdaySwitchs = params => post(`/pipelinepeekday/switchs`, params)
