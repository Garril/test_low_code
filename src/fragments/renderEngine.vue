<script>
import { components, parsers } from '../components'
export default {
  name: 'renderEngine',
  data() {
    return {
      page: undefined
    }
  },
  components: {
    ...components,
    ...parsers
  },
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
      // 拿到转译过后的对应组件
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
      // console.log("renderdragover")
    },
    // 拖拽组件松手 ---之后重新触发render函数
    handleDrog(event, vm) {
      // console.log(event, vm)
      // console.log("handleDrog")
      const _json = vm.jsonSchema // _json为当前组件被拖拽入的容器
      if(_json && _json.type === 'Container') {
        // 可以找到当前容器的父亲 console.log(vm.$parent) 
        // 没有孩子节点undefined,初始化为[]
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
    /* console.log("h: ",h)
      ƒ (a, b, c, d) { return createElement$1(vm, a, b, c, d, true); } */
    let _vode = this.renderRoot(h)
    /* console.log("_vode: ",_vode)
      VNode {tag: 'div', data: {…}, children: Array(1), text: undefined, elm: undefined, …} */
    console.log("run render!");
    return _vode
  }
}
</script>