import container from './container.vue'

export default {
  name: 'Container',
  components: {
    container
  },
  render (h, section, children) {
    const _this = this;
    // console.log(_this)
    
    // _prpos和_propsOn业务量大可能考虑再抽象
    // 从上到下
    const _props = {
      props: {
        jsonSchema: section
      }
    }
    // 从下到上
    const _propsOn = {
      on: {
    /* 因为parser文件不产生dom/vue实例(渲染器内用call调用这的render函数)
      所以this在外面用的时候，指向渲染引擎的this
      测试：上方打印的_this，可以看到$el为 div.root是renderEngineer渲染的
      最外层根节点，还可以看到renderEngineer内定义的renderComponent等方法*/
        dragover: _this.handleDragOver,
        drop: _this.handleDrog
      },
      nativeOn: {
        click: () => {
          _this.$emit('pickType','container')
        }
      }
    }
    return (
      <container
        { ..._props }
        { ..._propsOn }
      > { children } </container>
    )
  }
}
