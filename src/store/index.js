import {createLogger, createStore} from 'vuex'

// import app from "./modules/app.js"
import user from "./modules/user.js"
import permission from "./modules/async-router.js"
// dynamic router permission control (Experimental)

import getters from './getters.js'

const debug =  process.env.NODE_ENV !== 'production';

export default createStore({
  modules:{
    // app,
    user,
    permission
  },
  getters,
  strict:debug,
  plugins: debug ? [createLogger()] : []
})
