<template>
  <!-- 普通表单 -->
  <el-form
    ref="form"
    :rules="rules"
    :model="form"
    :disabled="disabled"
    :label-position="labelPosition"
    :label-width="labelWidth"
    :size="size"
    :hide-required-asterisk="hideRequiredAsterisk"
    class="aika-form clearfix"
    :class="{ 'detail-form': isView, 'dialog-form': isDialog }"
    :style="formStyle"
    @submit.native.prevent
  >
    <slot name="header" />
    <slot name="custom" />
    <template v-for="(item, index) in forms">
      <el-col
        v-if="!item.hidden"
        :key="index"
        :span="item.span || spanCount"
        :style="item.colStyle"
      >
        <el-form-item
          v-if="!item.ownForm"
          :class="item.className || item.inputType || item.type"
          :label="`${item.label}`"
          :prop="item.prop"
          :rules="item.rules"
          :label-width="item.labelWidth"
          :style="item.style"
        >
          <span v-if="!item.label" slot="label" />
          <!-- 带样式的label -->
          <span v-if="item.labelStyle" slot="label" :style="item.labelStyle">{{
            item.label
          }}</span>
          <!-- 带星号的label -->
          <span v-if="item.requiredSign" slot="label">
            <span style="color: red; margin-right: 5px">*</span>{{ item.label }}
          </span>
          <!-- tooltip -->
          <span
            v-if="item.tooltip"
            slot="label"
            style="display: flex; align-items: center"
          >
            <span>{{ item.label }}</span>
            <el-tooltip
              v-if="item.tooltip"
              v-bind="item.tooltip"
              :popper-class="item.tooltip.popperClass"
            >
              <template>
                <i class="el-icon-warning-outline" style="margin-left: 5px" />
              </template>
            </el-tooltip>
          </span>
          <!-- 小标题 -->
          <span
            v-if="item.type === 'subTitle'"
            slot="label"
            class="subtitle"
            :style="item.labelStyle"
            >{{ item.label }}</span
          >
          <!-- 户型 -->
          <custom-house-type
            v-if="item.type === 'houseType'"
            :item="item"
            :form="form"
          />

          <!-- 单选按钮 -->
          <template v-else-if="item.type === 'radio'">
            <el-radio
              v-for="(opt, optIndex) in item.opts"
              :key="optIndex"
              v-model="form[item.prop]"
              :disabled="item.disabled"
              :label="item.optVal ? opt[item.optVal] : opt.value"
              @change="item.func ? item.func($event) : {}"
              >{{ item.optLabel ? opt[item.optLabel] : opt.label }}</el-radio
            >
          </template>

          <!-- 多选框 -->
          <template v-else-if="item.type === 'checkbox'">
            <el-checkbox
              v-for="(opt, optIndex) in item.opts"
              :key="optIndex"
              v-model="form[item.prop]"
              :disabled="item.disabled"
              :label="opt.value"
              @change="item.func ? item.func($event) : {}"
              >{{ opt.label }}</el-checkbox
            >
          </template>

          <!-- 单个图片上传 -->
          <template v-else-if="item.type === 'upload'">
            <el-upload
              class="avatar-uploader"
              :headers="item.headers"
              :action="item.action"
              :data="item.data"
              list-type="picture"
              accept="image/gif,image/jpeg,image/jpg,image/png"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
            >
              <img
                v-if="form[item.prop]"
                :src="form[item.prop]"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">{{ item.tip }}</div>
            </el-upload>
          </template>

          <!-- 树形 :check-strictly="true" -->
          <el-tree
            v-else-if="item.type === 'tree'"
            ref="tree"
            :data="item.data"
            show-checkbox
            :node-key="item.nodeKey || 'id'"
            :props="item.props || defaultProps"
          />

          <slot
            v-if="item.scopedSlots && item.scopedSlots.customRender"
            :name="item.scopedSlots.customRender"
          />

          <slot
            v-if="item.scopedSlot"
            :name="item.scopedSlot"
            :item="item"
            :form="form"
          />
        </el-form-item>
      </el-col>
    </template>
    <slot name="footer" />
  </el-form>
</template>

<script>

  export default {
    name: 'ComForms',
    components: {
    },
    props: {
      isDialog: { type: Boolean, default: false },
      isView: { type: Boolean, default: false },
      hideRequiredAsterisk: { type: Boolean, default: false },
      disabled: { type: Boolean },
      size: { type: String, default: 'small' },
      labelPosition: { type: String, default: 'left' },
      labelWidth: { type: String, default: '92px' },
      formStyle: { type: Object },
      rules: { type: Object },
      spanCount: { type: Number, default: 24 },
      forms: { type: Array }, // 表单组
      initialValues: { type: Object, default: () => { return {} } }, // 初始值
    },
    data() {
      return {
        form: {
          // houseType: {}
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      // 初始化
      init(obj) {
        const form = {}
        const forms = this.forms
        if (forms && forms.length > 0) {
          forms.forEach(item => {
            if (!item.prop || item.hidden) return
            if (
              ['checkboxList', 'checkbox', 'cascader', 'multi-input', 'newUpload', 'newUploadOss', 'attachmentTooltip', 'attachmentTooltipOss', 'close-tags'].includes(item.type) || (item.type === 'date' && (item.dateType === 'daterange' || item.dateType === 'datetimerange')) || (item.type === 'select' && item.multiple) || (item.type === 'treeselect' && item.multiple)
            ) {
              form[item.prop] = []
            } else if (item.type === 'tree') {
              this.$nextTick(() => {
                this.$refs.tree[0].setCheckedKeys([])
                const list = obj ? obj.resourceCode : []
                list.forEach(k => {
                  this.$refs.tree[0].setChecked(k, true)
                })
              })
            } else if (item.type === 'houseType') {
              form[item.prop] = {}
            } else if (item.type === 'buildingCode-select') {
              form[item.prop] = ''
              form[item.prop + '_start'] = ''
              form[item.prop + '_end'] = ''
              form[item.prop + '_check'] = false
            } else if (item.type === 'treeselect') { // treeselect 初始化赋值如果为''出现unknown
              form[item.prop] = null
            } else if (item.type === 'mulit-employee') {
              form[item.prop] = [{ memberType: item.prop }]
            } else {
              if (item.type === 'import') {
                this.$nextTick(() => {
                  this.$refs[item.prop][0].resetFile()
                })
              }
              form[item.prop] = ''
            }
          })
        }
        if (obj) {
          this.form = Object.assign(form, obj)
        } else {
          this.form = Object.assign({}, form)
        }

        if (this.initialValues) {
          this.form = Object.assign({}, this.form, this.initialValues)
        }
        if (this.$refs.form && this.$refs.form.clearValidate) {
          this.$refs.form.clearValidate()
        }
        // this.form.fileList = []
      },

      // 给部分字段赋值
      initFieldsObj(obj) {
        for (const key in obj) {
          this.$set(this.form, key, obj[key])
          // this.form[key] = obj[key]
        }
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        })
      },

      // 给部分字段赋值-备份，后期调整
      initFieldsObjBak(obj) {
        const { forms } = this
        for (var i = 0; i < forms.length; i++) {
          const { prop } = forms[i]
          if (typeof obj[prop] !== 'undefined') {
            this.$set(this.form, prop, obj[prop])
          }
        }
        this.$nextTick(() => {
          this.$refs.form.clearValidate()
        })
      },

      disableField(filedName, flag) {
        const field = this.forms.filter(item => item.prop === filedName)[0]
        this.$set(field, 'disabled', flag)
      },

      // 初始化单个值
      initField(fieldName, val) {
        this.$set(this.form, fieldName, val)
      },

      // 校验表单
      validate() {
        const { forms, form } = this
        const _form = JSON.parse(JSON.stringify(form))

        return new Promise((resolve, reject) => {
          this.$refs.form.validate((valid, obj) => {
            let _valid = true
            let errorMsg = ''
            let errField = null
            for (let i = 0; i < forms.length; i++) {
              let breakFori = false
              if (forms[i].customRules && !forms[i].hidden) {
                const customRules = forms[i].customRules
                for (let j = 0; j < customRules.length; j++) {
                  const rule = customRules[j]
                  if (
                    rule.type === 'max' &&
                    !this.$isNullOrEmpty(_form[rule.being]) &&
                    +_form[forms[i].prop] > +_form[rule.being]
                  ) {
                    _valid = false
                    errorMsg = rule.errorMsg
                    errField = forms[i]

                    breakFori = true
                    break
                  } else if (
                    rule.type === 'min' &&
                    !this.$isNullOrEmpty(_form[rule.being]) &&
                    +_form[forms[i].prop] < +_form[rule.being]
                  ) {
                    _valid = false
                    errorMsg = rule.errorMsg
                    errField = forms[i]
                    breakFori = true
                    break
                  }
                }
              }
              if (breakFori) {
                break
              }
            }

            if (valid && _valid) {
              // 树形
              if (this.$refs.tree) {
                const halfChecks = this.$refs.tree[0].getHalfCheckedKeys()
                const checks = this.$refs.tree[0].getCheckedKeys()
                const Ids = [...new Set(checks.concat(halfChecks))]
                this.form.resourceCode = Ids
              }
              resolve(this.form)
            } else {
              if (obj && JSON.stringify(obj) !== '{}') {
                for (const key in obj) {
                  this.$message.error(obj[key][0].message)
                  break
                }
              } else {
                if (errField) {
                  this.$message.error(errorMsg)
                }
              }
              reject('validErr')
            }
          })
        })
      },

      // 重置表单
      reset() {
        this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
        // this.form.houseType = {}
        // this.form.fileList = []
      },

      // 清除校验
      clearValidate(propArr) {
        if (this.$refs.form) this.$refs.form.clearValidate(propArr)
      },

      // 上传成功
      newUploadSuccess(e, item) {
        // console.log(this.form)
        // console.log(e)
        // console.log(item)
        // this.form[item.prop] = e
        this.$set(this.form, item.prop, e)
        console.log(this.form)
        if (item.handleUploadSuccess) item.handleUploadSuccess(e)
      },

      // 主动删除已上传文件
      handleDeleteUploadedFile(e, item, index) {
        console.log(e)
        // this.form[item.prop] = e.fileList
        this.$set(this.form, item.prop, e.fileList)

        console.log(this.form)
        if (item.handleDeleteUploadedFile) item.handleDeleteUploadedFile(e.deletedItem)
      },

      // 上传成功回调
      uploadSuccess(res) {
        if (res.ok) {
          this.form.employeeWeChat = Object.prototype.toString.call(res.data) === '[object Object]' ? (res.data.fileUrl || '') : (res.data || '')
          // res.data ? this.form.fileList.push({ url: res.data }) : false
        } else {
          this.$message.error(res.message)
        }
      },

      // 上传前回调
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传二维码图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      // removeHandle(d) {
      //     this.form.fileList.filter(i => {
      //         return i.url !== d.response.data
      //     })
      // }
    }
  }
</script>

<style lang="scss" scoped >
.el-col-8 {
  padding-right: 10px;
}
</style>
