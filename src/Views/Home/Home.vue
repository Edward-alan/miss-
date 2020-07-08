/* eslint-disable no-console */
<template>
  <el-container class="containers">
    <!-- title -->
    <el-header>
      <div class="titles">中国民族管弦乐学会音基考级管理后台</div>
      <div class="caption">
      <HeadTitle/>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!--导航-->
        <Navigation />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>

import Navigation from "@/components/Navigation/Navigation";
import HeadTitle from '@/components/Head_title'

export default {
  name: "home",
  props: {},
  components: {
    Navigation,
    HeadTitle
  },
  data() {
    return {
      typeJson: [],
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="scss">
@import "./Css/style.scss";
</style>
