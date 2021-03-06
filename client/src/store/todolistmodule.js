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
            currentList: "active"
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
                dueDateMode: "endofday",
                createdDate: new Date(),
                repeats: false,
                repeatInfo: {
                    repeatMode: "everyx",
                    everyx: {
                        frequency: 1,
                        unit: "days"
                    },
                    xweekday: {
                        x: "1st",
                        weekday: "Monday"
                    },
                    end: {
                        endMode: "endafterx",
                        endafterx: 10,
                        endon: date_util.plusOneMonth(date_util.getToday())
                    },
                    show: {
                        showMode: "xunits",
                        xunits: {
                            x: 1,
                            unit: "days"
                        },
                        weekday: "Monday"
                    }
                },
                snoozedOnDate: null,
            }
            // console.log("returning default item ", item)
            return item
        }
    },
    mutations: {
        updateItemLocal(state, item) {
            console.log("uil: ", item)
            const sidx = state.todoItems.findIndex(i => i._id === item._id);
            const si = state.todoItems[sidx]
            console.log("uil: ", si)

            for (const key in item) {
                if (!(["_id", "repeatUpdateType"].includes(key))) {
                    si[key] = item[key]
                }
            }
            // state.todoItems[sidx] = {
            //     ...si,
            //     ...item
            // }
            // state.todoItems[state.todoItems.findIndex(i => i._id === item._id)] = { ...item };
        },
        updateItemsLocal(state, items) {
            items.forEach(item => {
                // state.todoItems[state.todoItems.findIndex(i => i._id === item._id)] = { ...item };
                const si = state.todoItems[state.todoItems.findIndex(i => i._id === item._id)]

                for (const key in item) {
                    if (!(["_id", "repeatUpdateType"].includes(key))) {
                        si[key] = item[key]
                    }
                }
                // state.todoItems[state.todoItems.findIndex(i => i._id === item._id)] = {
                //     ...si,
                //     ...item
                // }
            })
        },
        updateItemOrdersLocal(state, items) {
            items.forEach(item => {
                state.todoItems[state.todoItems.findIndex(i => i._id === item._id)].displayOrder = item.displayOrder;
            })
        },
        deleteItemLocal(state, id) {
            // console.log(state.todoItems)
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
        },
        setStreakInfo(state, payload) {
            state.streakInfo = { ...payload };
        },
        setCurrentList(state, payload) {
            state.currentList = payload;
        }
    },
    actions: {
        refreshItems({ rootState, commit }) {
            api_util.getItems(rootState.auth.authInfo.authTkn).then((items) => {
                // console.log("got items", items.data)
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
        refreshCurrentList({ dispatch, state }) {
            switch (state.currentList) {
                case "active":
                    dispatch('refreshItems');
                    return;
                case "past":
                    dispatch('refreshPastItems');
                    return;
                case "upcoming":
                    dispatch('refreshUpcomingItems');
                    return;
            }
        },
        loadAndSetCurrentList({ dispatch, commit }, payload) {
            commit('setCurrentList', payload);
            dispatch('refreshCurrentList')
        },
        refreshStreakInfo({ rootState, commit }) {
            api_util.getStreakInfo(rootState.auth.authInfo.authTkn).then((info) => {
                commit('setStreakInfo', info.data)
            })
        },
        addItem({ commit, rootState, dispatch }, item) {
            // item.id = misc_util.getUniqueItemId(state.todoItems)
            // state.todoItems.push(item)
            api_util.pushItemToServer(rootState.auth.authInfo.authTkn, item).then((res) => {
                if (res.data.singleId) {
                    item._id = res.data.id;
                } else {
                    item._id = res.data.ids[0];
                }
                commit('addItemLocal', item)
                if (!res.data.singleId)
                    dispatch('refreshCurrentList')
                dispatch('refreshStreakInfo')
            }
            );
        },
        updateItem({ commit, rootState, dispatch }, update) {
            api_util.pushUpdateToServer(rootState.auth.authInfo.authTkn, update).then(() => {
                commit('updateItemLocal', update)
                dispatch('refreshCurrentList')
                dispatch('refreshStreakInfo')
            });
        },
        async updateItems({ commit, rootState, dispatch }, items) {
            for (let i = 0; i < items.length; i++) {
                await api_util.pushItemToServer(rootState.auth.authInfo.authTkn, items[i]);
            }
            commit('updateItemsLocal', items)
            dispatch('refreshCurrentList')
            dispatch('refreshStreakInfo')
        },
        async updateItemDisplayOrders({ commit, rootState }, items) {
            for (let i = 0; i < items.length; i++) {
                api_util.updateItemOrder(rootState.auth.authInfo.authTkn, items[i]);
            }
            commit('updateItemOrdersLocal', items)
        },
        deleteItem({ commit, rootState, dispatch }, id) {
            api_util.deleteItem(rootState.auth.authInfo.authTkn, id).then(() => {
                commit('deleteItemLocal', id)
                dispatch('refreshStreakInfo')
            });
        }
    },
    namespaced: true
}