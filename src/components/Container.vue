<template>
  <el-container>
    <el-header>
      <Breadcrumb></Breadcrumb>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

  import Breadcrumb from './Breadcrumb.vue'

  export default {
    name: "Container",
    components: {
      Breadcrumb,
    },
  }
</script>

<style scoped>
  .el-container {
    background-color: white;
    height: 100%;
    margin: 0 auto;
    width: 960px;
  }
  .el-header {
    margin-top: 60px;
  }
</style>