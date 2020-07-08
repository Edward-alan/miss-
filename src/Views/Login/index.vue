<template>
<div class="content">
  <div class="demo-ruleForm login-container">
    <el-form v-if="flag" :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px">
      <h3 class="title">民族管弦乐学会-后台登录</h3>
      <el-form-item prop="account">
        <el-input type="text" @focus=" 
        img2 = true;  
        img1 = false; 
        img3 = false; " @blur=" img1 = true; img2 = false;
            " v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" @focus="
              img3 = true;
              img1 = false;
              img2 = false;
            " @blur="
              img1 = true;
              img3 = false;
            " v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-row type="flex" style="margin-bottom:22px;" class="row-bg" justify="space-between">
        <el-col :span="6">
          <el-checkbox v-model="checked" checked>记住密码</el-checkbox>
        </el-col>
      </el-row>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import {
  login
} from "@/api/login";
export default {
  data() {
    return {
      flag: true,
      logining: false,
      ruleForm: {
        username: "", //账号
        password: "", //密码
      },
      rules2: {
        account: [{
          required: true,
          message: "请输入账号",
          trigger: "blur",
        }, ],
        checkPass: [{
          required: true,
          message: "请输入密码",
          trigger: "blur",
        }, ],
      },
      checked: true,
    };
  },
  methods: {
    handleSubmit2() {
      console.log(this.ruleForm.username, this.ruleForm.password);
      let _this = this;
      if (_this.ruleForm.username == "" || _this.ruleForm.password === "") {
        alert("账号密码不能为空");
      } else {
        login(this.ruleForm.account, this.ruleForm.checkpass).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            sessionStorage.setItem("user", res.data.data);
            setTimeout(() => {
              this.$router.push("/home/examination");
            }, 1000);
          } else {
            this.$message.error("登录错误,请重新登录");
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  width: 100%;
  height: 100%;
}

.login-container {
  position: relative;
  top: 240px;
  border-radius: 5px;
  background-clip: padding-box;
  margin: 0 auto 0;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
