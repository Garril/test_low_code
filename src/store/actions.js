import {
  SET_CONFIG_POS
} from './mutation-types.js'

export default {
  addConfigPos(context,payload) {
    return new Promise((resolve,reject) => {
      context.commit(SET_CONFIG_POS,payload);
      resolve('add success!')
    })
  }
}