// import { createStore, createLogger } from 'vuex'
// import misc_util from "../utility/misc_util.js"
import api_util from "../utility/api_util.js"
import date_util from "../utility/date_util.js"

// const debug = process.env.NODE_ENV !== 'production'

// const exampleTodoItems = [{
//     id: 0,
//     text: "item 1",
//     isDone: false,
//     dueDate: new Date(2021, 4, 29, 17),
// }, {
//     id: 1,
//     text: "item 2",
//     isDone: false,
//     dueDate: new Date(2021, 4, 30, 17),
// }];
// const examplePastItems = undefined;


export default {
    state() {
        return {
            loadingItems: true,
            loadingPastItems: false,
            loadingUpcomingItems: false,
            // todoItems: exampleTodoItems || [], //Includes items to be completed and items that were completed today
            // pastItems: examplePastItems || [], // Includes items that were completed yesterday or earlier
            todoItems: [], //Includes items to be completed and items that were completed today
            pastItems: [], // Includes items that were completed yesterday or earlier
            upcomingItems: [], // Includes items that were completed yesterday or earlier
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
        generateDefaultItem: () => () => {
            const item = {
                text: "",
                isDone: false,
                dueDate: date_util.getTomorrow(),
                displayDate: date_util.getToday(),
                doneDate: null,
                createdDate: new Date(),
                repeats: false,
                repeatInfo: {},
                snoozedOnDate: null,
            }
            console.log("returning default item ", item)
            return item
        }
    },
    mutations: {
        updateItemLocal(state, item) {
            state.todoItems[state.todoItems.findIndex(i => i._id === item._id)] = { ...item };
        },
        deleteItemLocal(state, id) {
            console.log(state.todoItems)
            state.todoItems.splice(state.todoItems.findIndex(i => i._id === id), 1);
        },
        addItemLocal(state, item) {
            state.todoItems.push(item)
        },
        setItems(state, items) {
            state.todoItems = items;
        },
        setPastItems(state, items) {
            state.pastItems = items;
        },
        setUpcomingItems(state, items) {
            state.upcomingItems = items;
        },
        setLoadingStatus(state, payload) {
            if (payload.loadingItems !== undefined)
                state.loadingItems = payload.loadingItems;
            if (payload.loadingPastItems !== undefined)
                state.loadingPastItems = payload.loadingPastItems;
            if (payload.loadingUpcomingItems !== undefined)
                state.loadingUpcomingItems = payload.loadingUpcomingItems;
        }
    },
    actions: {
        refreshItems({ rootState, commit }) {
            api_util.getItems(rootState.auth.authInfo.authTkn).then((items) => {
                console.log("got items", items.data)
                // console.log(typeof items.data.dueDate)
                commit('setItems', items.data)
                commit('setLoadingStatus', { loadingItems: false })
            })
        },
        refreshPastItems({ rootState, commit }) {
            api_util.getPastItems(rootState.auth.authInfo.authTkn).then((items) => {
                commit('setPastItems', items.data)
                commit('setLoadingStatus', { loadingPastItems: false })
            })
        },
        refreshUpcomingItems({ rootState, commit }) {
            api_util.getUpcomingItems(rootState.auth.authInfo.authTkn).then((items) => {
                commit('setUpcomingItems', items.data)
                commit('setLoadingStatus', { loadingUpcomingItems: false })
            })
        },
        addItem({ commit, rootState }, item) {
            // item.id = misc_util.getUniqueItemId(state.todoItems)
            // state.todoItems.push(item)
            api_util.pushItemToServer(rootState.auth.authInfo.authTkn, item).then((res) => {
                item._id = res.data.id;
                commit('addItemLocal', item)
            }
            );
        },
        updateItem({ commit, rootState }, item) {
            api_util.pushItemToServer(rootState.auth.authInfo.authTkn, item).then(() => {
                commit('updateItemLocal', item)
            });
        },
        deleteItem({ commit, rootState }, id) {
            api_util.deleteItem(rootState.auth.authInfo.authTkn, id).then(() => {
                commit('deleteItemLocal', id)
            });


        }
    },
    namespaced: true
}