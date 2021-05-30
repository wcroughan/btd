import { createStore, createLogger } from 'vuex'
import auth from "./authmodule.js"
import todolist from "./todolistmodule.js"

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        auth,
        todolist
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})