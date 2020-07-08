<!--
  * 考试管理  考试列表搜索组件
-->
<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="考试状态">
      <el-select v-model="formInline.status" placeholder="状态" @change="onSubmit" >
        <el-option label="未开始" value="0"></el-option>
        <el-option label="已开始" value="1"></el-option>
        <el-option label="已结束" value="2"> </el-option>
        <el-option label="缺考" value="3"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-button type="primary" @click="onSubmit()">搜索</el-button> -->
  </el-form>
</template>

<script>
import { undertaker } from "@/api/Servers";

export default {
  name: "from",
  props: {},
  components: {},
  data() {
    return {
      optionsAgent: null, //承办单位
      selectedAgent: null,
      addloading: false,
      statesAgent: [],
      formInline: {
        status: '未开始',
      },
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$emit("search", this.formInline);
    },

   //承办单位
    async queryAgents(query) {
      if (query !== "") {
        this.addloading = true;
        let result = await undertaker(query);
        result = result.data;
        this.addloading = false;
        if (result.code == 200) {
          this.optionsAgent = result.data.data;
        } else {
          console.log("获取承办失败");
        }
      } 
    },
  },
  created() {
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.demo-form-inline {
  display: flex;

  .el-form-item {
    width: 295px;
  }

  /deep/ .el-form-item__label {
    width: 78px;
    height: 65px;
    line-height: 65px;
  }

  /deep/ .el-form-item__content {
    width: 140px;
    margin: 12px 0 0 0;
    display: flex;
  }

  .el-form-item {
    display: flex;
    margin-bottom: 0;
  }

  .el-button {
    width: 100px;
    height: 40px;
    margin: 12px 0 0 100px;
  }

  .A_piece {
    width: 35px;
    height: 5px;
    border-bottom: 1px solid #fff;
    margin: 17px 10px;
  }
  /deep/ .el-date-editor {
    width: 160px;
  }
  /deep/ .el-input__inner {
    width: 130px;
  }
}
</style>
