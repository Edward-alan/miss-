<!--
  * 考试管理页面
-->
<template>
<div class="wraps">
  <div class="Test_Profile">
    <div class="Data_Exam">
      <!-- <p>考试概况</p> -->
      <h3 class="Data_p">考试概况</h3>

      <ul class="The_Number">
        <li class="Data_lis" >
          <p class="renshu">今日考试人数</p>
          <span class="spans">{{stats ? stats.today.absent_no : "0"}}</span>
        </li>
         <li class="Data_lis">
          <p class="renshu">今日已考试人数</p>
          <span class="spans">{{stats ? stats.today.exam_no: "0"}}</span>
        </li>
         <li class="Data_lis">
          <p class="renshu">今日缺考试人数</p>
          <span class="spans">{{stats ? stats.today.total_no: "0"}}</span>
        </li>
      </ul>
       <ul class="The_Number">
        <li class="Data_lis">
          <p class="renshu">累积报考人数</p>
          <span class="spans">{{stats ? stats.total.absent_no: "0"}}</span>
        </li>
         <li class="Data_lis">
          <p class="renshu">累积已考人数</p>
          <span class="spans">{{stats ? stats.total.exam_no: "0"}}</span>
        </li>
         <li class="Data_lis">
          <p class="renshu">累积缺考试人数</p>
          <span class="spans">{{stats ? stats.total.total_no: "0"}}</span>
        </li>
      </ul>
    </div>
   <!-- <div class="Statistics" >
          <h3 class="Data_p">考试统计表</h3>
        <div class="statistical" v-loading="loading">
           <landArea/>    折线图 
      </div>
    </div>-->
  </div>
  <dir class="The_Test_List">
    <h3 class="Exam_List">考试列表</h3>
    <div class="Add_The_Test">
      <router-link tag="p" to="/home/addlistexam">
        <el-button class="buts" type="primary">添加考试</el-button>
      </router-link>
      <div class="Screen">
         <ScreeningForm @search="search" /> <!--搜索框-->
      </div>
    </div>
    <div class="List_Table">
      <TableList :tableData="tableData"  /> <!--表格-->
    </div>
  </dir>
</div>
</template>

<script>
// import landArea from '@/components/Graph/land-area'   //折线图
import ScreeningForm from "@/components/Screening_Form/form"
import TableList from '@/components/Table_List/table'
import { datastatistics } from '@/api/Servers'
import { examlists } from "@/api/Servers";

export default {
  name: 'Examination',
  props: {},
  components: {
    ScreeningForm,
    TableList,
    // landArea   //折线图
  },
  data() {
    return {
      status:'',
      agent_id:'1',
      loading:true,
      stats:null,
      today:'',
      total:'',
      tableData: [],
    };
  },
  computed: {},
  methods: {
    search(status){
      if(status.status){
        this.status = status.status;
      }else{
        this.status = status;
      }
      examlists(this.status).then((res) => {
        this.tableData = res.data.data.row.data;
      });
    },
  },
  created() {
   datastatistics().then(res=>{
     this.stats = res.data.data
     if(this.stats){
       this.loading = false
     }else{
       this.loading = true
     }
   });
   this.search(0);
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.wraps {
  width: 100%;
  height: 150%;

  .Test_Profile {
    width: 100%;
    //height: 510px;
    height: auto;
    margin: 15px 0 0;

    .Data_Exam {
      width: 65%;
      height: 256px;
      margin-left: 10px;
      // background: #ccc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

      .Data_p {
        line-height: 30px;
        text-align: left;
        padding-left: 30px;
        font-size: 18px;
        border-bottom:1px solid #ccc;
      }

      .The_Number {
        width: 100%;
        height: 100px;
        display: flex;
        margin-top: 15px;
        //flex-wrap: wrap;
        justify-content: space-between;

        .Data_lis {
          width: 170px;
          height: 60px;
          margin: 5px 35px;
          //background: #aaa;
          text-align: center;

          .renshu {
            width: 100%;
            line-height: 20px;
          }

          .spans {
            display: flex;
            line-height: 20px;
            padding: 10px 0 0 78px;
          }
        }
      }

      .Backlog {
        width: 100%;
        height: 100px;
        margin: 16px 0 0 0;

        .Done {
          height: 60px;

          .Data_lis {
            width: 150px;
            height: 50px;
            margin: 5px 35px;
            background: #aaa;

            .renshu {
              width: 100%;
              text-align: center;
              line-height: 20px;
            }

            .spans {
              display: flex;
              line-height: 20px;
              padding: 8px 0 0 60px;
            }
          }
        }
      }
    }

    .Statistics {
      width: 65%;
      height: 271px;
      margin: 10px 0 0 10px;
      background: #ccc;

      .Data_p {
        line-height: 30px;
        text-align: left;
        margin-left: 30px;
        font-size: 18px;
      }

      .statistical{
        height: 240px;
      }
    }
  }

  .The_Test_List {
    width: 100%;
    height: 800px;
    // background: #ccc;
    margin: 50px 0 0;

    .Exam_List {
      line-height: 50px;
      text-align: left;
      margin-left: 30px;
      font-size: 18px;
    }

    .Add_The_Test {
      width: 100%;
      height: 65px;
      display: flex;

      .buts {
        display: flex;
        margin: 10px 25px;
        line-height: 20px;
      }

      .Screen {
        flex: 1;
      }
    }

    .List_Table {
      height: 300px;
      margin: 20px 0 0;
    }
  }
}
</style>
