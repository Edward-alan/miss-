<template>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="考生姓名">
    <el-input v-model="formInline.Kname" placeholder="考生姓名"></el-input>
  </el-form-item>
  <el-form-item label="准考证号">
    <el-input v-model="formInline.nucleus" placeholder="准考证号"></el-input>
  </el-form-item>
  <el-form-item label="考试级别">
    <el-input v-model="formInline.test_Level" placeholder="考试级别"></el-input>
  </el-form-item>
  <el-button type="primary" @click="onSubmit()">搜索</el-button>
</el-form>
</template>

<script>
export default {
  name:'Search',
  props: {},
  components: {},
  data() {
    return {
      formInline: {
        Kname: '',
        nucleus: '',
        test_Level: ''
      },
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$emit('onSearch', this.formInline)
    }
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang=""></style>
