<template>
  <div class="container"
    @dragover.prevent 
    @drop.stop="handleDrop">
    <slot></slot>
  </div>
</template>

<script>
// 默认输入组件
export default {
  name: 'container',
  props: {
    jsonSchema: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 组件被放入container回调
    handleDrop(e) {
      console.log("container drop")
      this.$emit('drop', e, this)
    }
  }
}
</script>

<style scoped>
.container {
  border: 1px solid var(--mainLine);
  background-color: var(--mainBg);
  min-height: 300px;
  width: 100%;
}
</style>