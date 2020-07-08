<!--
  * 申请处理页面 考试结果申请列表表格
-->
<template>
<el-table :data="tableData" border style="width: 100%;">
  <el-table-column prop="id" label="#" width="120">
  </el-table-column>
  <el-table-column prop="name" label="姓名" width="120">
  </el-table-column>
  <el-table-column prop="age" label="年龄" width="120">
  </el-table-column>
  <el-table-column prop="sex" label="性别" width="130">
  </el-table-column>
  <el-table-column prop="ID_number" label="身份证号" width="210">
  </el-table-column>
  <el-table-column prop="examination" label="准考证号" width="210">
  </el-table-column>
  <el-table-column prop="province" label="省" width="130">
  </el-table-column>
  <el-table-column prop="city" label="市" width="130">
  </el-table-column>
  <el-table-column prop="model_United" label="区" width="130">
  </el-table-column>
  <el-table-column prop="testing" label="考点" width="110">
  </el-table-column>
  <el-table-column prop="condition" label="状态" width="110">
  </el-table-column>
  <el-table-column label="操作" width="180">
    <template slot-scope="scope">
      <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
      <el-button @click="handleClick(scope.row)" type="text" size="small">拒绝</el-button>
    </template>
  </el-table-column>
</el-table>
</template>

<script>

import { look_over } from '@/api/Servers'

export default {
  name: 'examinationresult',
  props: {},
  components: {},
  data() {
    return {
      tableData: []
    };  
  },
  computed: {},
  methods: {},
  created() {
    look_over({
         params:{
          "id":this.tableData.id
         }
       })
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
/deep/ .cell {
  text-align: center;
}
</style>
