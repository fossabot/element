<template>
  <el-upload
    class="el-upload upload-file"
    :show-file-list="false"
    action=""
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </el-upload>
</template>
<script>
import Vue from 'vue'
import {
  Upload,
} from 'element-ui'

Vue.use(Upload)
export default {
  name: 'ComUpload',
  methods: {
    btnClick() {
      this.$nextTick(() => {
        const fileInput = document.querySelector('.upload-file .el-upload__input')
        fileInput.click()
      })
    },
  }
}
</script>
