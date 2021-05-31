// import { createStore, createLogger } from 'vuex'
import misc_util from "../utility/misc_util.js"
import api_util from "../utility/api_util.js"
import date_util from "../utility/date_util.js"

// const debug = process.env.NODE_ENV !== 'production'

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


export default {
    state() {
        return {
            loadingItems: true,
            todoItems: exampleTodoItems || [], //Includes items to be completed and items that were completed today
            pastItems: examplePastItems || [], // Includes items that were completed yesterday or earlier
            streakInfo: {
                todayGood: false,
                len: 0
            },
        }
    },
    getters: {
        numTodoItems(state) {
            return state.todoItems.length
        },
        defaultItem(state) {
            //TODO should return an item with id already set to non-conflicting value
            const item = {
                text: "",
                isDone: false,
                dueDate: date_util.getTomorrow()
            }
            item.id = misc_util.getUniqueItemId(state.todoItems.concat(state.pastItems))
            return item
        }
    },
    mutations: {
        updateItem(state, item) {
            state.todoItems[state.todoItems.findIndex(i => i.id === item.id)] = { ...item };
            api_util.pushItemToServer(state.token, item);
        },
        deleteItem(state, id) {
            state.todoItems.splice(state.todoItems.findIndex(i => i.id === id), 1);
            api_util.deleteItem(state.token, id);
        },
        addItem(state, item) {
            item.id = misc_util.getUniqueItemId(state.todoItems)
            state.todoItems.push(item)
            api_util.pushItemToServer(state.token, item);
        },
        setItems(state, items) {
            state.todoItems = items;
        },
        setPastItems(state, items) {
            state.pastItems = items;
        },
    },
    actions: {
        refreshItems({ rootState, commit }) {
            console.log(rootState, rootState.auth)
            api_util.getItems(rootState.auth.authInfo.authTkn).then((items) => {
                console.log("got items", items)
                commit('setItems', items)
            })
        },
        refreshPastItems({ rootState, commit }) {
            api_util.getPastItems(rootState.auth.authInfo.authTkn).then((items) => {
                commit('setPastItems', items)
            })
        },
    },
    namespaced: true
}