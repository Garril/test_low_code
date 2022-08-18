<script>
import { components } from '../config'
export default {
  name: 'configPanel',
  data() {
    return {
      _type: ''
    }
  },
  props: {
    curPickType: {
      type: String,
      default: 'cButton'
    }
  },
  components: {
    ...components
  },
  methods: {
    init() {
      this._type = this.curPickType
    },
    renderPanel(h, _type) {
      if(!_type) return null
      const components = this.$options.components // 拿到所有注册的config组件
      const config_vm = components[_type];
      if(!config_vm) return null
      return (
        config_vm.render.call(this, h)
      )
      
    }
  },
  render(h) {
    // 初始化参数,配置面板每次点击其他元素
    // 都需要整个的初始化，所以不放在created中
    this.init()
    // 渲染面板
    let _panel = this.renderPanel(h, this._type)

    return _panel
  }
}
</script>