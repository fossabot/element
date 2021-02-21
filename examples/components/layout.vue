<template>
  <el-container style="height: 100%">
    <el-header>
      <Header class="page-header"></Header>
    </el-header>

    <el-container class="page-main">
      <el-aside width="200px">
        <el-scrollbar style="height: 100%">
          <Menu></Menu>
        </el-scrollbar>
      </el-aside>

      <el-scrollbar class="markdown-content">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import Header from './header'
import Menu from './menu'

export default {
  name: 'layout',
  data() {
    return {
      // dialogVisible: false
    }
  },
  components: {
    Header,
    Menu
  }
}
</script>

<style lang="scss">
.page-header {
  width: 100%;
}
.page-main {
  height: calc(100vh - 60px);
  .el-scrollbar__wrap {
    overflow-x: auto;
  }
  .markdown-content {
    height: 100%;
    flex: 1;
  }
}
</style>

