<!--
  * 考官老师
-->
<template>
<div>
  <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border style="width: 80%; ">
    <el-table-column prop="id" label="#" width="100"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
    <el-table-column prop="id_card" label="身份证号" width="380">
    </el-table-column>
    <el-table-column label="考官头像" width="300">
      <template scope="scope">
        <img class="images" :src="scope.row.avatar" alt="">
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">
          <el-button type="text" @click="dialogFormVisible = true">编辑</el-button>
        </el-button>
          <!-- <el-button @click="deleteExaminer(scope.row)" type="text" size="small">删除</el-button> -->
        <el-dialog title="修改教师信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="考官姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input v-model="form.id_card" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="考官头像" :label-width="formLabelWidth">
                <img class="images" :src="form.avatar" alt="icon">
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialog">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="tableData.length">
  </el-pagination>
</div>
</template>

<script>

import { examinerList } from "@/api/Servers";
import { modify_examiner } from "@/api/Servers";
import { getUploadToken } from "@/api/Servers"; //上传图片

export default {
  name: "invigilatorteacher",
  props: {},
  components: {},
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      dialogFormVisible: false,
      form: {
        name: '',
        id_card: '',
        avatar: '',
        id:''
      },
      formLabelWidth: '100px'
    };
  },
  computed: {},
  methods: {
    dialog() {
      this.dialogFormVisible = false
      modify_examiner(
       this.form.name,
       this.form.id_card,
       this.form.avatar,
       this.form.id
      ).then(res=>{
        this.tableData.forEach((item,index)=>{
          if(item.id == this.form.id){
            item = {...this.form};
            this.$set(this.tableData,index,item);
          }
        })
      })
      getUploadToken()  //获取七牛token
    },

    handleClick(scope) { //编辑修改
      this.form.name = scope.name
      this.form.id_card = scope.id_card
      this.form.avatar = scope.avatar
      this.form.id = scope.id 
    },

    handleSizeChange: function (val) {
      //分页
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },

    deleteExaminer(scope){
      console.log(scope)
    }
  },
  created() {
    examinerList().then((res) => {
      this.tableData = res.data.data.data;
    });
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
/deep/ .cell {
  text-align: center;
}

.el-pagination {
  width: 320px;
}

.el-button--text {
  padding-left: 5px;
}

/deep/ .el-dialog__body {
  width: 500px;
}

.el-table__fixed-right {
  height: 920px;
}

.images {
  width: 90px;
  height: 90px;
}
</style>
