<!--
  * 添加考试页面
-->
<template>
<div class="wraps_add">
  <h3 class="Add_p">添加考试</h3>

  <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="考试名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="承办单位" prop="agent_id">
      <el-select
          v-model="selectedAgent"
          filterable
          remote
          reserve-keyword
          value-key="nameAgents"
          placeholder="请输入关键词"
          :remote-method="queryAgents"
          :loading="addloading">
          <el-option
            v-for="item in optionsAgent"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
       </el-select>
    </el-form-item>
      <el-form-item label="考官" prop="examiner_id">
        <el-select
          v-model="selectedExaminer"
          filterable
          remote
          reserve-keyword
          value-key="nameExaminer"
          placeholder="请输入身份证号"
          :remote-method="queryExaminer"
          :loading="loading">
          <el-option
            v-for="item in optionsExaminer"
            :key="item.id"
            :label="item.name"
            :value="item">
          </el-option>
       </el-select>
      </el-form-item>
    <el-form-item label="考点" prop="exam_room_no">
      <el-input v-model="ruleForm.exam_room_no"></el-input>
    </el-form-item>
    <div class="block">
    <el-form-item label="开始时间" prop="start_time">
        <el-date-picker v-model="ruleForm.start_time" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择开始日期时间"></el-date-picker>
    </el-form-item >
    </div>
    <div class="block">
    <el-form-item label="结束时间" prop="start_time">
      <el-date-picker v-model="ruleForm.end_time" value-format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择结束日期时间"></el-date-picker>
    </el-form-item >
    </div>
    <div class="countermand">
      <el-button type="primary" @click="confirm">确认添加</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </el-form>
</div>
</template>

<script>

import { added } from '@/api/Servers'
import { undertaker } from '@/api/Servers'
import { examinerList } from '@/api/Servers'

export default {
  name: 'addExams',
  props: {},
  components: {},
  data() {
    return {
      ruleForm: {
        name: '',
        agent_id: '',
        examiner_id: '',
        exam_room_no: '',
        start_time: '',
        end_time: ''
      },
        optionsAgent: null,//承办单位
        optionsExaminer:null,//考官
        value:[],
        list:[],
        selectedAgent: null, //承办单位
        selectedExaminer:null, //考官
        loading: false,
        addloading: false,
        statesAgent: [], //承办单位
        statesExaminer:[],//考官
    };
  },
  computed: {},
  methods: {
    confirm() {
        this.ruleForm.agent_id = this.selectedAgent ? this.selectedAgent.id:null;
        this.ruleForm.examiner_id = this.selectedAgent ? this.selectedExaminer.id_card : null;
      if (
        this.ruleForm.name == '' ||
        this.ruleForm.agent_id == '' ||
        this.ruleForm.examiner_id == '' ||
        this.ruleForm.exam_room_no == '' ||
        this.ruleForm.start_time == '' ||
        this.ruleForm.end_time == '' 
      ) {
        this.$message('请完整填写信息');
      } else {
        added(
          this.ruleForm.name,
          this.ruleForm.agent_id,
          this.ruleForm.examiner_id,
          this.ruleForm.exam_room_no,
          this.ruleForm.start_time,
          this.ruleForm.end_time
        ).then(res => {
           if(res.data.code == 200){
            this.$message(res.data.msg);
           }
        })
      }
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },

    async queryAgents(query) {  //承办单位
        if (query !== '') {
          this.addloading = true;
          let result = await undertaker(query);
          result = result.data;
          this.addloading = false;
          console.log(result)
          if(result.code == 200){
            this.optionsAgent = result.data.data;   
            console.log(this.optionsAgent)
          }else{
            console.log('获取承办失败');
          }
        } else {
          this.options = [];
        }
      },

    async queryExaminer(query) {  //考官
        if (query !== '') {
          this.loading = true;
         let result = await examinerList(query);
            this.loading = false;
            result = result.data;
            if(result.code == 200){
              this.loading = false
               this.optionsExaminer = result.data.data;
            }else{
              console.log('获取考官失败');
            }
        } else {
          this.options = [];
        }
      },
  },
  created() {},
  mounted() {
     
  },
};
</script>

<style lang="scss" scoped>
.wraps_add {
  width: 500px;
  height: 500px;
  margin: 10px 20px;

  .Add_p {
    height: 50px;
    font-size: 20px;
    text-align: left;
    margin-left: 20px;
    line-height: 50px;
    margin: 0 0 20px 0;
  }
  .Add_inputs {
    height: 450px;
    margin: 33px -8px;
  }
}
.item__label {
  height: 50px;
  margin: 0 188px 0 -14px;
}

.countermand {
  width: 190px;
  height: 50px;
  margin: 25px 10px 0;
}

.el-select {
  width: 110px;
}

.block {
  margin: 22px 0 0 0;
}
/deep/ .el-input--suffix{
  width: 398px;
}
</style>
