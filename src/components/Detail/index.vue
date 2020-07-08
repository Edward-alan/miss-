<!--
  * 考试详情页面
-->
<template>
  <div class="wraps">
    <h3 class="adminis">考试详情</h3>
    <div class="examinee">
      <div class="To_Thannel">
        <div class="To_prim">
          <!-- <el-button type="primary"  @click="dialogFormVisible = true">新增考生</el-button> -->
        </div>
        <div class="name_add">
           <Sheatch @onSearch="onsearch" />  <!--搜索-->
        </div>
      </div>
      <div class="Thannel_List">
        <TablesFeature :search="search" /> <!--详情表格-->
      </div>
    </div>
  
  </div>
</template>

<script>

import TablesFeature from "@/components/Tables_Feature";
import Sheatch from "@/components/Search/Search.vue";

export default {
  name: "PapersTedious",
  props: {},
  components: {
    TablesFeature,
    Sheatch,
  },
  data() {
    return {
      search: [],
    };
  },
  computed: {},
  methods: {
    onsearch(formInline) {
      this.search = formInline;
    }
  },
  created() {},
  mounted() {
    
   
  },
};
</script>

<style lang="scss" scoped>
.wraps {
  width: 100%;
  height: 145%;

  .adminis {
    height: 50px;
    text-align: left;
    line-height: 50px;
    margin: 15px 20px;
    font-size: 25px;
  }

  .examinee {
    height: 500px;

    .To_Thannel {
      height: 75px;
      line-height: 75px;
      display: flex;

      .To_prim {
        margin: 0 20px;
      }

      .name_add {
        flex: 1;
        margin-left: 268px;

        .el-button {
          width: 100px;
          height: 40px;
          margin: 12px 0 0 15px;
        }

        /deep/ .el-form-item__label {
          width: 100px;
          height: 65px;
          line-height: 65px;
        }

        /deep/ .el-form-item__content {
          margin: 18px 0 0 0;
        }

        .el-form-item {
          margin-bottom: 0;
        }
      }
    }

    .Thannel_List {
      margin: 10px 0;
    }
  }
}
</style>
