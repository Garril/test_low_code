import cInput from './cInput.vue'

export default {
  name: 'CInput',
  components: {
    cInput
  },
  render(h, section, children) {
    const _this = this;
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation();
          _this.$emit('pickType', 'cInput')
        }
      },
      on: {
        viewMounted: e => {
          // 拿到对应的input节点，用_uid来索引
          this.$store.dispatch("addConfigPos",{
            id: e._uid,
            pos: e.value
          }).then(res => {
            console.log(res)
          })
        }
      }
    }
    return (
      <cInput
        { ..._propsOn }
      ></cInput>
    )
  }
}
