<template>
  <div class="hello">
    <el-button></el-button>
    <div class="header">
      顶栏
    </div>

    <div class="main-content">
      <el-row>
        
        <el-col :span="4">
          <!-- 物料堆 -->
          <div class="cpn-stack block">
            <div class="cpn-title">物料堆</div>
            <ul>
              <li v-for="(item,index) in stacks" :key="index"
                class="cpn-item"
                :draggable="true" @drag="handleDrag(item)">
                {{ item }}
              </li>
            </ul>
          </div>
        </el-col>

        <el-col :span="16">
          <!-- 主舞台 -->
          <div class="stage block"
              @dragover.prevent 
              @drop="handleDrop"
          >
          <!-- bug：别drop.stop 让事件往下传 -->
            <render-engine ref="engine" 
              :jsonSchema="currentJson"
              :addNode="selectedType"
            ></render-engine>

            <!-- <li v-for="(item, index) in components" :key="index">
              {{ item }}
              <component :is="item"></component>
            </li> -->
          </div>
        </el-col>

        <el-col :span="4">
          <!-- 配置面板 -->
          <div class="config-panel block">
            <div class="cpn-title">
              配置面板
            </div>
          </div>
        </el-col>

      </el-row>
    </div>


  </div>

</template>

<script>
import { components } from '../components'
import engine from '../fragments/renderEngine.vue'
/* 
  可以考虑把渲染引擎、物料堆 都抽象到一个单独的库
  配置面板是一个库 --- 配置面板长时间不需要改动
*/
export default {
  name: "mainPage",
  data() {
    return {
      // 需要加到配置系统中的组件
      stacks: ['CButton','CInput','Container'],
      components: [],
      // 数据库拿到的协议 --- mock数据
      jsonSchema: {
        page: {
          type: 'Container',
          // children: [{
          //   type: 'CButton'
          // }, {
          //   type: 'Container',
          //   children: [{
          //     type: 'CInput'
          //   }, {
          //     type: 'CButton'
          //   }]
          // }]
        }
      },
      // 当前操作的数组
      currentJson: {},
      // 当前拾取的类型
      selectedType: ''
    }
  },
  components: {
    ...components,
    renderEngine: engine
  },
  methods: {
    // 拾取被配置节点
    handleDrag(item) {
      this.selectedType = item
    },
    handleDrop() {
      const _type = this.selectedType
      this.components.push(_type)
    }

  },
  created() {
    this.currentJson = this.jsonSchema
  }
}
</script>

<style scoped>
  .block {
    border: 1px solid var(--mainLine);
    height: 100vh;
  }
  .header {
    padding: 10px;
  }
  /* 物料堆 */
  .cpn-title {
    padding: 10px;
  }
  div.cpn-title + ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cpn-item {
    border: 1px solid var(--lightBg);
    margin: 2px 5px;
    padding: 10px 0;
    border-radius: 18px;
    width: 50%;
  }
</style>
