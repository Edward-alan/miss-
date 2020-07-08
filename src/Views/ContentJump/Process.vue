<!-- 
  * 申请处理页面
-->
<template>
<div class="wraps">
  <div class="application_List">
    <h3 class="invigilators">监考教师申请列表</h3>
    <ExaminationResult/>
  </div>
</div>
</template>

<script>
import ExaminationResult from "@/components/Examination_Result";

export default {
  name: "Process",
  props: {},
  components: {
    ExaminationResult
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
   
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.wraps {
  width: 100%;
  height: 150%;

  .invigilators {
    line-height: 50px;
    font-size: 20px;
    padding: 0 25px;
    border-bottom: 1px solid rgb(107, 107, 107);
  }

  .application_List {
    height: 600px;
  }
}
</style>
