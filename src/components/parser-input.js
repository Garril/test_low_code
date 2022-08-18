import cInput from './cInput.vue'

export default {
  name: 'CInput',
  components: {
    cInput
  },
  render(h, section, children) {
    const _this = this;
    const _propsOn = {
      
    }
    return (
      <cInput
        { ..._propsOn }
      ></cInput>
    )
  }
}
