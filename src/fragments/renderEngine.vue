<script>
import { components, parsers } from '../components'
export default {
  name: 'renderEngine',
  props: {
    // 配置协议
    jsonSchema: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 新增，被拖入舞台的节点
    addNode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: undefined
    }
  },
  components: {
    ...components,
    ...parsers
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 提取页面参数（单次--初始化）
      this.page = this.jsonSchema.page || {}
    },
    // 渲染根节点
    renderRoot(h) {
      let _page = this.page;
      // 丰富全局配置逻辑入口
      return (
        <div class="root">
          { this.renderComponent(h, _page) }
        </div>
      )
    },
    // 渲染组件
    renderComponent(h, section) {
      // 组件通用逻辑处理入口

      // 是否有子节点
      let _children = null;
      if( section.children ) {
        // 层级渲染
        _children = this.renderChildren(h, section)
      }
      return this.startRender(h, section, _children)
    },
    // 渲染兄弟节点 和 子节点 ---为了处理兄弟节点之间的通信问题，不写递归
    renderChildren(h, section) {
      let _nodeArray = section.children || [].concat(section)
      // 后期拓展兄弟节点之间的通信
      return _nodeArray.map((node, index) => {
        return this.renderComponent(h, node, index);
      })
      // debug记录：这tm的箭头函数记得加return
    },
    // 开始渲染
    startRender(h, section, _children) {
      const _type = section.type
      const renderMod = parsers[_type]
      // console.log(renderMod)
      
      // 直接渲染
      if(renderMod) {
        return renderMod.render.call(this, h, section, _children)
      }
      console.log('startRender error: ',_type)
      return null
    },
    // 以下为配置系统统一化处理逻辑
    // 拖拽组件经过触发
    handleDragOver() {
      console.log("renderdragover")
    },
    // 拖拽组件松手
    handleDrag(event, vm) {
      const _json = vm.jsonSchema
      if(_json && _json.type === 'Container') {
        // 没有孩子节点
        if(!_json.children) {
          this.$set(_json, 'children', [])
        }
        _json.children.push({
          type: this.addNode
        })
      } else {
        console.log("renderEngineer type log: ", _json.type)
      }
    }

  },
  render(h) {
    let _vode = this.renderRoot(h)
    return _vode
  }
}
</script>