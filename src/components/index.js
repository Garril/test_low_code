/* 
  require.context
    获取一个特定的上下文，用于实现自动化导入模块。(webpack的api)
const req = require.context('./', false, /[^.]+\.vue/)
const reqParser = require.context('./', false, /parser-[^.]+\.js/)

在vite，api变化了，如下：
import.meta.glob： 因为 import.meta.glob 获取到的文件就是懒加载的，
    避免了使用 import 语句， 所以打包后不会报错不存在动态引入了
import.meta.globEager：不使用 then 也能获取到文件全局上下文进行有需要的判断

const req = import.meta.globEager('./*.vue')
const reqParser = import.meta.globEager('./*.js')
*/
const req = require.context('./', false, /[^.]+\.vue/)
/* return一个函数
    ƒ webpackContext(req) {
      return __webpack_require__(webpackContextResolve(req));
    }  */
const componentsName = req.keys();
const components = componentsName.reduce((components, module) => {
  // 把组件捞出来，再做个回挂
  const mod = req(module)
  components[mod.default.name] = mod.default
  return components
}, {})

// parser-xxx代表每个组件的逻辑层 ---包了一层逻辑层，用组件去包的话，会多出一层dom
// 可以用于处理：需要对中间传参所做的参数
const reqParser = require.context('./', false, /parser-[^.]+\.js/)

const parsersName = reqParser.keys();
const parsers = parsersName.reduce((parsers, module) => {
  const mod = reqParser(module)
  parsers[mod.default.name] = mod.default
  return parsers
}, {})

export { components, parsers }

