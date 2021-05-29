import { createStore, createLogger } from 'vuex'
import date_util from "../utility/date_util.js"

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    state() {
        return {
            authInfo: {
                loggedIn: false,
                authTkn: ""
            },
            todoItems: [], //Includes items to be completed and items that were completed today
            doneEarlierItems: [], // Includes items that were completed yesterday or earlier
            streakInfo: {
                todayGood: false,
                len: 0
            }
        }
    },
    getters: {
        todayCompleted(state) {
            return state.todoItems.filter(v => v.isDone)
        },
        todayTodo(state) {
            return state.todoItems.filter(v => (!v.isDone) && v.dueDate.getTime() < date_util.getTomorrow().getTime())
        }
    },
    mutations: {
        updateItem(state, { item }) { },
        deleteItem(state, { id }) { },
        addItem(state, { item }) { },
    },
    actions: {
        refreshItems({ commit }) { },
        refreshEarlierItems({ commit }) { },
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})