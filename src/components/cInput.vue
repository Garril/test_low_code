<template>
  <el-input></el-input>
</template>

<script>
// 默认输入组件
export default {
  name: 'cInput',
  data () {
    return {
      value: 'test_input_value'
    }
  },
  mounted() {
    // 保证视图渲染完成后，往上抛事件
    this.$nextTick(() => {
      this.$emit('viewMounted',this)
    })
  },

}
</script>
