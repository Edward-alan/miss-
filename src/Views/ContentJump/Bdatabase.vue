<!--
  *  北京数据
-->
<template>
  <div>
    北京数据 <h1>点击数量:{{$store.state.null}}</h1>
    <button @click="but" >点击按钮{{null}}</button>
  </div>
</template>
<script>

// import apiData from '@/untis/api.js'
import { mapState,mapActions } from "vuex";
export default {
  name:'Bdatabase',
  props: {},
  components: {
    ...mapState(['null'])
    
  },
  data() {
    return {
      list:[]
    };
  },
  computed: {
    // ...mapState(['null']),
    // ...mapState(["list"])s
  },
  methods: {
    ...mapState(['null']),
    
    but(){
      this.$store.commit('getNull')
    }  
  },
  async created() {
  //  let statuses = await apiData.banner.getData()
  //  console.log(statuses)
  },
  mounted() {
    // this.list = this.$store.state.list
    // console.log(this.list)

  },
};
</script>
<style scoped lang=""></style>
