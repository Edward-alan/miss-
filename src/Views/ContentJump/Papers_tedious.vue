<template>
  <div class="wrap">
    <p>考题管理</p>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column prop="" label="" width="120"> </el-table-column>
      <el-table-column prop="" label="" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="tableData.length">
      </el-pagination>
  </div>
</template>

<script>
import { questions } from "@/api/Servers"; //考题列表

export default {
  props: {},
  components: {},
  data() {
    return {
      tableData: [],
      currentPage: NaN,
      pagesize: NaN,
      formLabelWidth: "100px",
    };
  },
  computed: {},
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange: function(val) {//分页
      this.pagesize = val;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    questions().then((res) => {
      console.log(res.data.data);
      this.currentPage = res.data.current_page;
      this.currentPage = res.data.per_page;
      this.tableData = res.data.data.data;
    });
  },
  mounted() {},
};
</script>

<style scoped lang="scss"></style>