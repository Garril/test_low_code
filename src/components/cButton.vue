<template>
  <el-button>{{ btn }}</el-button>
</template>

<script>
// 默认按钮组件
export default {
  name: 'cButton',
  data () {
    return {
      btn: '我是按钮'
    }
  }
}
</script>
