import { createStore, createLogger } from 'vuex'
import date_util from "../utility/date_util.js"
import misc_util from "../utility/misc_util.js"
import api_util from "../utility/api_util.js"
// import { Vue } from "vue"

const debug = process.env.NODE_ENV !== 'production'

const exampleTodoItems = [{
    id: 0,
    text: "item 1",
    isDone: false,
    dueDate: new Date(2021, 4, 29, 17),
}, {
    id: 1,
    text: "item 2",
    isDone: false,
    dueDate: new Date(2021, 4, 30, 17),
}];
const examplePastItems = undefined;


export default createStore({
    state() {
        return {
            authInfo: {
                loggedIn: false,
                authTkn: "",
                pending: true
            },
            todoItems: exampleTodoItems || [], //Includes items to be completed and items that were completed today
            pastItems: examplePastItems || [], // Includes items that were completed yesterday or earlier
            streakInfo: {
                todayGood: false,
                len: 0
            },
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
        updateItem(state, item) {
            state.todoItems[state.todoItems.findIndex(i => i.id === item.id)] = { ...item };
        },
        deleteItem(state, id) {
            state.todoItems.splice(state.todoItems.findIndex(i => i.id === id), 1);
        },
        addItem(state, item) {
            item.id = misc_util.getUniqueItemId(state.todoItems)
            state.todoItems.push(item)
        },
        setItems(state, items) {
            state.todoItems = items;
        },
        setPastItems(state, items) {
            state.pastItems = items;
        },
        setAuthInfo(state, info) {
            state.authInfo = info;
        },
        logout(state, info) {
            state.authInfo = info;
            //   this.authInfo.authTkn = "";
            //   document.cookie = `authTkn= ; expires=${new Date()}`;
            //   this.authInfo.loggedIn = false;
            //   this.authInfo.pending = false;

        }
    },
    actions: {
        refreshItems({ commit }) {
            api_util.getItems().then((items) => {
                commit('setItems', items)
            })
        },
        refreshPastItems({ commit }) {
            api_util.getPastItems().then((items) => {
                commit('setPastItems', items)
            })
        },
        checkAuthToken({ commit }) {
            api_util.checkAuthToken().then((r) =>
                commit('setAuthInfo', r)

                // document.cookie = `authTkn=${
                //   this.authInfo.authTkn
                // } ; expires=${tknInfo.expireDate.toUTCString()}`;
            )
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})