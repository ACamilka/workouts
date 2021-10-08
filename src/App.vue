<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App',
  }
</script>

<style>

  html, body, #app {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #606266;
    background-color: #eeeeee;
  }

  .el-breadcrumb__item:not(:last-child) .el-breadcrumb__inner.is-link,
  .el-breadcrumb__item:not(:last-child) .el-breadcrumb__inner a {
    text-decoration: underline;
  }

  .el-icon-success {
    color: green;
    font-size: 20px;
  }

</style>
