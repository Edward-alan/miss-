<!--
  * 考官管理页面
-->
<template>
<div class="wraps">
  <h3 class="invigilators">监考教师列表</h3>
  <b class="add_Teacher">
    <el-button type="text" @click="dialogFormVisible = true">
      <el-button type="primary">添加教师</el-button>
    </el-button>
  </b>
  <el-dialog title="添加教师" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" :label-width="formLabelWidth">
        <el-input v-model="form.Idnumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="考官头像" :label-width="formLabelWidth">
        <!--上传头像-->
        <el-upload class="avatar-uploader"
        :data='mutice'   
        :action="qiniuConfig.domain"
        :on-change="changes" 
        :on-error="handleError"
        :auto-upload="true" 
        :show-file-list="false"
        :on-success="handleAvatarSuccess" 
        :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src='imageUrl' class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogForm">确 定</el-button>
    </div>
  </el-dialog>
  <div class="add_Attachment">
    <InvigilaTorteacher />
  </div>
</div>
</template>
<script>
import InvigilaTorteacher from "@/components/Invigilator_Teacher";
import { temperature } from "@/api/Servers"; //添加考官信息
import { getUploadToken } from "@/api/Servers"; //上传图片

export default {
  name: "Management",
  props: {},
  components: {
    InvigilaTorteacher,
  },
  data() {
    return {
      qiniuConfig:{
        domain:"https://upload-z1.qiniup.com",
      },
      mutice:{
        token: '',
        key: null,
        data:null,
      },
      dialogFormVisible: false,
      form: {
        name: "",
        Idnumber: "",
        type: [],
      },
      formLabelWidth: "100px",
      imageUrl: '',
      result: '',
      dialogVisible: false
    };
  },
  computed: {},

  methods: {
    dialogForm() { //点击确定添加
      if( !this.form.name || !this.form.Idnumber || !this.imageUrl ){
        this.$message({
          showClose: true,
          message: '请输入完整信息',
          type: 'error'
        });
        return;
      }
      this.dialogFormVisible = false;
      temperature(this.form.name, this.form.Idnumber, this.imageUrl).then(res=>{
         this.$message({
          message: res.data.msg,
          type: 'success'
        });
      })
    },
    //添加图片
    handleAvatarSuccess(res, file) {
      console.log("保存成功", res, file)
      this.imageUrl = res.key;
      this.result = '添加成功'
    },
    changes(file) {
      this.imageUrl = file.name
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M,
      return getUploadToken().then(res => {
        this.mutice.token = res.data.data;
        this.mutice.key = "examiner_" + new Date().getTime();
        this.mutice.data = file;
        })
     },
    handleError (error) {
      this.result = error.toString();
    },
  },
  created() {
    
  },
  mounted() {
  
  },
};
</script>

<style lang="scss" scoped>
.wraps {
  width: 100%;
  height: 150%;

  .add_Teacher {
    line-height: 45px;
    padding: 0 25px;
    color: rgba(0, 0, 255, 0.349);
  }

  .add_Attachment {
    margin: 20px 0 0;
    height: 1380px;
  }

  /deep/ .el-dialog {
    width: 35%;
  }

  .el-input {
    width: 65%;
  }

  .el-form {
    width: 80%;
    margin: 0 auto;
  }

  //上传头像样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-icon-plus {
    border: 1px solid #ccc;
    line-height: 90px;
    margin-left: 45px;
    height: 90px;
    width: 90px;
  }

  .invigilators {
    height: 50px;
    line-height: 50px;
    margin: 0 0 5px 25px;
  }

  .avatar {
    height: 90px;
    width: 90px;
    margin-left: 60px;
  }
}
</style>
