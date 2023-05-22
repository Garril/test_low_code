const req = require.context('./', false, /[^.]+\.vue/)

const componentsName = req.keys()
const components = componentsName.reduce((components, module) => {
  const mod = req(module)

  components[mod.default.name] = mod.default
  return components
}, {})

export { components }
