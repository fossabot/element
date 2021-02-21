<template>
  <div class="header">
    <h1 class="info">
      com-element
    </h1>
    <span>基于element-ui二次封装的vue组件库</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style scoped lang="scss">
.el-header {
  border-bottom: 1px solid rgba(0,0,0,.1);
}

.header {
  height: 50px;
  line-height: 50px;
  .info{
    display: inline-block;
    font-size: 20px;
    color: #333;
    font-weight: normal;
  }
  span {
    margin-left:12px;
    color:#666;
    font-size:14px;
  }
}
</style>
