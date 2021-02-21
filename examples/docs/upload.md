## Upload

### 基础用法

:::demo 使用

```html
<el-button type="text" @click="handleUploadBtn">点击上传</el-button>
<com-upload
  ref="uploadFile"
  :accept="fileAccept"
  :http-request="handleUpload"
  :limit="1"
/>
<script>
  export default {
    data() {
      return {
        fileAccept: 'image/jpeg,image/jpg,image/png',
      };
    },
    methods: {
      handleUploadBtn() {
        this.$refs.uploadFile.btnClick()
      },
      handleUpload(options) {
        console.log(options)
        this.$refs.uploadFile.clearFiles()
        },
    }
  };
</script>
```
:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<eui-row>
  <eui-button disabled>默认按钮</eui-button>
  <eui-button type="primary" disabled>主要按钮</eui-button>
  <eui-button type="success" disabled>成功按钮</eui-button>
  <eui-button type="info" disabled>信息按钮</eui-button>
  <eui-button type="warning" disabled>警告按钮</eui-button>
  <eui-button type="danger" disabled>危险按钮</eui-button>
</eui-row>

<eui-row>
  <eui-button plain disabled>朴素按钮</eui-button>
  <eui-button type="primary" plain disabled>主要按钮</eui-button>
  <eui-button type="success" plain disabled>成功按钮</eui-button>
  <eui-button type="info" plain disabled>信息按钮</eui-button>
  <eui-button type="warning" plain disabled>警告按钮</eui-button>
  <eui-button type="danger" plain disabled>危险按钮</eui-button>
</eui-row>
```
:::

### 文字按钮

没有边框和背景色的按钮。

:::demo
```html
<eui-button type="text">文字按钮</eui-button>
<eui-button type="text" disabled>文字按钮</eui-button>
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<eui-button type="primary" icon="el-icon-edit"></eui-button>
<eui-button type="primary" icon="el-icon-share"></eui-button>
<eui-button type="primary" icon="el-icon-delete"></eui-button>
<eui-button type="primary" icon="el-icon-search">搜索</eui-button>
<eui-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></eui-button>
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<eui-button-group>`标签来嵌套你的按钮。

```html
<eui-button-group>
  <eui-button type="primary" icon="el-icon-arrow-left">上一页</eui-button>
  <eui-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></eui-button>
</eui-button-group>
<eui-button-group>
  <eui-button type="primary" icon="el-icon-edit"></eui-button>
  <eui-button type="primary" icon="el-icon-share"></eui-button>
  <eui-button type="primary" icon="el-icon-delete"></eui-button>
</eui-button-group>
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<eui-button type="primary" :loading="true">加载中</eui-button>
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

```html
<eui-row>
  <eui-button>默认按钮</eui-button>
  <eui-button size="medium">中等按钮</eui-button>
  <eui-button size="small">小型按钮</eui-button>
  <eui-button size="mini">超小按钮</eui-button>
</eui-row>
<eui-row>
  <eui-button round>默认按钮</eui-button>
  <eui-button size="medium" round>中等按钮</eui-button>
  <eui-button size="small" round>小型按钮</eui-button>
  <eui-button size="mini" round>超小按钮</eui-button>
</eui-row>
```
:::

### Attributes
| 参数        | 说明           | 类型    | 可选值                                             | 默认值 |
| ----------- | -------------- | ------- | -------------------------------------------------- | ------ |
| size        | 尺寸           | string  | medium / small / mini                              | —      |
| type        | 类型           | string  | primary / success / warning / danger / info / text | —      |
| plain       | 是否朴素按钮   | boolean | —                                                  | false  |
| round       | 是否圆角按钮   | boolean | —                                                  | false  |
| circle      | 是否圆形按钮   | boolean | —                                                  | false  |
| loading     | 是否加载中状态 | boolean | —                                                  | false  |
| disabled    | 是否禁用状态   | boolean | —                                                  | false  |
| icon        | 图标类名       | string  | —                                                  | —      |
| autofocus   | 是否默认聚焦   | boolean | —                                                  | false  |
| native-type | 原生 type 属性 | string  | button / submit / reset                            | button |
