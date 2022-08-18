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
      }
    }
    return (
      <cInput
        { ..._propsOn }
      ></cInput>
    )
  }
}
