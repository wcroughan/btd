import { createStore, createLogger } from 'vuex'
import date_util from "../utility/date_util.js"
import misc_util from "../utility/misc_util.js"
import api_util from "../utility/api_util.js"

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
        }
    },
    mutations: {
        updateItem(state, item) {
            state.todoItems[state.todoItems.findIndex(i => i.id === item.id)] = { ...item };
            api_util.pushItemToServer(item);
        },
        deleteItem(state, id) {
            state.todoItems.splice(state.todoItems.findIndex(i => i.id === id), 1);
            api_util.deleteItem(id);
        },
        addItem(state, item) {
            item.id = misc_util.getUniqueItemId(state.todoItems)
            state.todoItems.push(item)
            api_util.pushItemToServer(item);
        },
        setItems(state, items) {
            state.todoItems = items;
        },
        setPastItems(state, items) {
            state.pastItems = items;
        },
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
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})