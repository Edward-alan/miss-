<!-- 导航 -->
<template>
<div class="wrap">
  <ul class="wrap_uls">
    <router-link tag="li" to="/home/examination">考试管理</router-link>
    <router-link tag="li" to="/home/management">考官管理</router-link>
    <router-link tag="li" to="/home/papers_tedious">考题管理</router-link>
    <router-link tag="li" to="/home/process">申请处理</router-link>
    <router-link tag="li" to="/home/bdatabase">北京数据</router-link>
  </ul>
</div>
</template>

<script>
export default {
  name: "navigation",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {

  },
  created() {
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  color: #fff;
  background: #1E282C;

  .wrap_uls {
    width: 100%;

    li {
      line-height: 60px;
      text-align: center;
      cursor:pointer; 
    }
  }
  .active{
    background: #333;
  }
}
</style>
