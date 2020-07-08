<!--
  * 头部退出
-->
<template>
<el-row class="container">
  <el-col :span="4" class="userinfo">
   <el-button type="text" @click.native="Exit" style="color:#cc0;">退出登录</el-button>
  </el-col>
</el-row>
</template>

<script>
import { logoutlogin } from '@/api/Servers'
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    Exit() {
      logoutlogin().then(res=>{
        if(res.data.code === 200){
          sessionStorage.clear('user');
          this.$router.push('/login')
        }else if(res.data.code === 401){
          this.$router.push('/login')
        }
      })
    }
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 140px;

  .userinfo {
    width: 100%;
    text-align: right;
    padding-right: 35px;

    .userinfo-inner {
      margin-left: 10px;
      width: 100%;
      display: flex;
      color: #c0ccda;
      cursor: pointer;
      color: #333;

      .user-img {
        margin: 8px 5px 0 0;
      }
    }
  }

  .item {
   margin: 0 0 0 10px;
  }
}
</style>
