<!--
  * 考试列表 表格组件
-->
<template>
  <div>
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column fixed prop="id" label="考试id" width="140">
      </el-table-column>
      <el-table-column prop="status" label="考试状态" width="120">
      </el-table-column>
      <el-table-column prop="name" label="承办单位" width="120">
      </el-table-column>
      <el-table-column prop="examiner.name" label="考试名称" width="120">
      </el-table-column>
      <el-table-column prop="start_time" label="开考时间" width="200">
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="200">
      </el-table-column>
      <el-table-column prop="agent_id" label="考试人数" width="110">
      </el-table-column>
      <el-table-column prop="examiner_id" label="已考人数" width="110">
      </el-table-column>
      <el-table-column prop="total_no" label="缺考人数" width="110">
      </el-table-column>
      <el-table-column prop="" label="考官" width="120">
      </el-table-column>
      <el-table-column prop="examiner" label="考试详情" width="100">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row)" type="text" size="small"
            >查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">
            <el-button type="text" @click="dialogFormVisible = true" :disabled="scope.row.status == 0 ? false : true">修改</el-button>
          </el-button>
          <el-button @click="ImportExam(scope.row)" type="text" size="small">
            <el-button type="text" @click="dialogFormExam = true" :disabled="scope.row.status == 0 ? false : true">导入考试信息</el-button>
          </el-button>
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

    <el-dialog title="修改考试信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="考试名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="承办单位" prop="agent_id">
          <el-input v-model="ruleForm.agent_id"></el-input>
        </el-form-item>
        <el-form-item label="考官" prop="examiner_id">
          <el-input v-model="ruleForm.examiner_id"></el-input>
        </el-form-item>
        <el-form-item label="考点" prop="exam_room_no">
          <el-input v-model="ruleForm.exam_room_no"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker
            v-model="ruleForm.start_time"
            type="datetime"
            placeholder="选择开始日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
            v-model="ruleForm.end_time"
            type="datetime"
            placeholder="选择日结束期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 导入考试 -->
    <el-dialog title="修改考试信息" :visible.sync="dialogFormExam" >
      <el-form :model="form">
        <el-form-item label="考官" prop="name">
          <el-input v-model="examinerForm.examiner_id"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          action=""
          :auto-upload="true"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :http-request="changExam"
          :on-exceed="handleExceed">
        <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip"></div> -->
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormExam = false">取 消</el-button>
        <el-button type="primary" @click="dialogExam">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { exam_ant } from "@/api/Servers";  //导入考生信息

export default {
  props:{
    status:{
      default:null,
      type: Number
    },
    tableData:{
      default:null,
      type: Array
    },
  },
  components: {},
  data() {
    return {
      form: {
        delivery: false,
        type: [],
      },
      ruleForm: {
        name: "",
        agent_id: "",
        examiner_id: "",
        exam_room_no: "",
        start_time: "",
        end_time: "",
      },
      examinerForm: {
        file: "",
        examiner_id: "",
      },
      currentPage: 1,
      pagesize: 10,
      
      vdata: [],
      arr: [],
      dialogFormVisible: false,
      dialogFormExam: false,
      formLabelWidth: "120px",
      agent_id: "1",
      currentExam: "", //要操作的考试
      statusAdd:this.status
    };
  },
  computed: {},
    watch:{
      status:function(newVal){
      this.statusAdd = newVal;
    },
   
  },
  methods: {
    tables: function() {
      var search = this.arr;
      if (search) {
        return this.tableData.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData;
    },
    handleSizeChange: function(val) {
      //分页
      this.pagesize = val;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleClick(scope) { //点击编辑
        (this.ruleForm.name = scope.name),
        (this.ruleForm.agent_id = scope.agent_id),
        (this.ruleForm.examiner_id = scope.examiner_id),
        (this.ruleForm.exam_room_no = scope.exam_room_no),
        (this.ruleForm.start_time = scope.start_time),
        (this.ruleForm.end_time = scope.end_time);
    },
    detail(scope) { //详情
      this.$router.push({path:'/home/detail',query:{value:scope}});
    },

    dialog() {//点击确定
      this.dialogFormVisible = false;
    },
    //点击导入
    ImportExam(scope) {
      this.currentExam = scope;
    },
   
    dialogExam() {
      this.dialogFormExam = false;
      exam_ant(
        this.examinerForm.file,
        this.currentExam.examiner_id,
        this.currentExam.id
      ).then((res) => {
        this.$message(res.data.msg)
      });
    },

      changExam(item){
        console.log('changExam',item);
        this.examinerForm.file = item.file
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`只能上传当前1个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
  },
  created() {},
  mounted() {
    this.tables();
},
}
</script>

<style lang="scss" scoped>
/deep/ .cell {
  text-align: center;
}

.el-pagination {
  padding-right: 80%;
}

/deep/ .el-dialog__body {
  width: 500px;
}

.el-table__fixed-right {
  height: 920px;
}

/deep/ .el-dialog {
  width: 33%;
}
</style>
