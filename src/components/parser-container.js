import container from './container.vue'

export default {
  name: 'Container',
  components: {
    container
  },
  render (h, section, children) {
    const _this = this;
    // 从上到下
    const props = {
      props: {
        jsonSchema: section
      }
    }
    // 从下到上
    const _propsOn = {
      on: {
        // 因为parser文件不产生dom/vue实例
        // 所以this在外面用的时候，指向渲染引擎的this
        dragover: _this.handleDragOver,
        drop: _this.handleDrag
      },
      nativeOn: {
        
      }
    }
    return (
      <container
        { ...props }
        { ..._propsOn }
      > { children } </container>
    )
  }
}
