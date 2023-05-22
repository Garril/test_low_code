import cButton from './cButton.vue'

export default {
  name: 'CButton',
  components: {
    cButton
  },
  render(h, section, children) {
    const _this = this;
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation();
          _this.$emit('pickType', 'cButton')
        }
      }
    }
    return (
      <cButton
        { ..._propsOn }
      ></cButton>
    )
  }
}