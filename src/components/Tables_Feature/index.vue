<!-- 
  * 考试管理详情 表格组件
-->
<template>
  <div>
    <el-table :data="tables" border style="width: 100%;">
      <el-table-column prop="id" label="序号" width="120"></el-table-column>
      <el-table-column
        prop="stu.name"
        label="姓名"
        width="120"
      ></el-table-column>
      <el-table-column prop="exam_ticket" label="考号" width="150">
      </el-table-column>
      <el-table-column prop="sign_time" label="入场时间" width="200">
      </el-table-column>
      <el-table-column prop="created_at" label="交卷时间" width="200">
      </el-table-column>
      <el-table-column prop="course_level" label="考试级别" width="120">
      </el-table-column>
      <el-table-column prop="score.total_score" label="选择题分数" width="120">
      </el-table-column>
      <el-table-column prop="score.mo_score" label="模唱题分数" width="120">
      </el-table-column>
      <el-table-column prop="score.shi_score" label="视唱题分数" width="120">
      </el-table-column>
      <el-table-column prop="score.score" label="总分" sortable width="120">
      </el-table-column>
      <el-table-column prop="teacher" label="考官签字" width="120">
      </el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">
            <el-button type="text" @click="dialogFormVisible = true">修改成绩</el-button>
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
      <el-table :data="topicExam" border style="width: 100%">
        <el-table-column label="序号" width="180">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="题目ID" width="180">
        </el-table-column>
        <el-table-column prop="answer" :formatter="correct" label="正确选项">
        </el-table-column>
        <el-table-column
          prop="result"
          :formatter="formatAnswer"
          label="作答选项">
        </el-table-column>
        <el-table-column prop="options" label="修改选项">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.answer"
              filterable
              allow-create
              @change="onchangeAxam($event, scope)">
                <el-option label="A" value="1"> </el-option>
                <el-option label="B" value="2"> </el-option>
                <el-option label="C" value="3"> </el-option>
                <el-option label="D" value="4"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          :formatter="formatResult"
          label="答题结果"></el-table-column>
      </el-table>
      <el-form :model="form">
        <el-form-item label="模唱答案" :label-width="formLabelWidth">
          <el-input v-model="form.mo_score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="试唱答案" :label-width="formLabelWidth">
          <el-input v-model="form.shi_score" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { current } from "@/api/Servers"; //已考试，缺考等单场考试列表
import { modifiedgrades } from "@/api/Servers"; //修改成绩
import { records } from "@/api/Servers"; //查看考生考试记录

export default {
  name: "tablesfeature",
  props: {
    search: {
      default: null,
      type: Array,
    },
  },
  components: {},
  data() {
    return {
      topicExam: [], //考试题目
      examine: {}, //查看记录
      tableData: [],
      agent_id: this.$route.query,
      currentPage: NaN,
      pagesize: NaN,
      dialogFormVisible: false,
      form: {
        base: "",      //考试记录
        score: "",     //选择题答案
        mo_score: "",  //模唱答案
        shi_score: "", //视唱答案
        log_id: "",    //考试记录id
        sign_id: "",   //考生报名id
      },
      option: "",
      formLabelWidth: "100px",
    };
  },
  computed: {
     tables: function() {
      var search = this.search;
      if (search) {
        console.log(search)
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
  },

  watch: {},
  methods: {
    onchangeAxam(event, data){
      this.examine.paper.forEach((item, index) => {
        if (item.id == data.row.id) {
          data.row.result = item.correct_select == event;
          this.$set(this.topicExam, index, data.row);
          return false;
        }
      });
    },
    formatResult(row) {
      return row.result ? "正确" : "错误";
    },
    formatAnswer(row) {
      let answer = row.selected;
      if (answer == null || answer == undefined) {
        answer = row.answer;
      }
      return this.formatAnswerOption(answer);
    },
    formatAnswerOption(option) {
      option = option + "";
      let str = "未知";
      switch (option) {
        case "1":
          str = "A";
          break;
        case "2":
          str = "B";
          break;
        case "3":
          str = "C";
          break;
        case "4":
          str = "D";
          break;
        case "99":
          str = "未作答";
          break;
      }
      return str;
    },
    correct(row) {
      let correct = 99;
      this.examine.paper.forEach((item) => {
        if (row.id == item.id) {
          correct = item.correct_select;
          return false;
        }
      });
      return this.formatAnswerOption(correct);
    },

    dialog() {
      (this.dialogFormVisible = false),
        modifiedgrades(//修改成绩
          (this.form.base = JSON.stringify(this.topicExam)),
          (this.form.score = 88),
          (this.form.mo_score = this.examine.row.score.mo_score),
          (this.form.shi_score = this.examine.row.score.shi_score),
          (this.form.log_id = this.examine.row.id),
          (this.form.sign_id = this.examine.row.log.sign_id)
        );
    },
    handleSizeChange: function(val) {//分页
      this.pagesize = val;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },

    handleClick() {//点击修改成绩
      records(this.agent_id.value.id).then((res) => {//查看考生记录
        this.examine = res.data.data;
        this.topicExam = this.examine.row.log.exam_log.base;
        this.form.shi_score = this.examine.row.score.shi_score;
        this.form.mo_score = this.examine.row.score.mo_score;
      });
    },
  },
  created() {
    current(this.agent_id.value.id).then((res) => {//缺考记录
      this.tableData = res.data.data.data;
      this.currentPage = res.data.data.current_page;
      this.pagesize = res.data.data.per_page;
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
