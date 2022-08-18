import {
  SET_CONFIG_POS
} from './mutation-types.js'

export default {
  [SET_CONFIG_POS](state,payload) {
    const _pos = {}
    _pos[payload.id] = payload.pos

    state.pos = {
      ...state.pos,
      ..._pos
    }
  }
}