import { createStore, createLogger } from 'vuex'
import date_util from "../utility/date_util.js"
import misc_util from "../utility/misc_util.js"
import api_util from "../utility/api_util.js"

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    state() {
        return {
            authInfo: {
                loggedIn: false,
                authTkn: "",
                pending: true,
                expireDate: null
            },
            showWarning: false,
            warning: "",
        }
    },
    getters: {
        token: (state) => state.authInfo.authTkn,
    },
    mutations: {
        setAuthInfo(state, info) {
            state.authInfo = info;
        },
        logout(state, info) {
            state.authInfo = {
                loggedIn: false,
                authTkn: "",
                pending: false
            }
            document.cookie = `authTkn= ; expires=${new Date()}`;
        },
        setWarning(state, payload) {
            state.warning = payload.warning;
            state.showWarning = payload.showWarning;
        }
    },
    actions: {
        tryCookieLogin({ commit }) {
            if (
                document.cookie.split(";").some((c) => c.trim().startsWith("authTkn="))
            ) {
                const authTkn = document.cookie
                    .split(";")
                    .find((row) => row.trim().startsWith("authTkn="))
                    .split("=")[1];
                if (authTkn.length > 0) {
                    api_util.checkAuthToken(authTkn, (res) => {
                        if (res.success && res.authenticated) {
                            const info = {
                                loggedIn: true,
                                authTkn,
                                pending: false,
                                expireDate: null // could get it from cookie, but the only use of it is to update the cookie so doesn't really matter here
                            }
                            commit('setAuthInfo', info);
                        } else {
                            commit('logout');
                        }
                    });
                } else {
                    commit('logout')
                }
            } else {
                commit('logout')
            }
        },
        createUser({ dispatch, commit }, payload) {
            api_util.createAccount(payload.username, payload.hpw, (res) => {

                //   console.log(res.data);
                if (res.data.success) {
                    // console.log("success, logggin in");
                    dispatch('login', payload)
                } else if (res.data.error !== undefined) {
                    console.log(res.data);
                    const warobj = {
                        warning: res.data.error,
                        showWarning: true
                    }
                    commit('setWarning', warobj)
                } else {
                    const warobj = {
                        warning: "Unknown error, failed to create account",
                        showWarning: true
                    }
                    commit('setWarning', warobj)
                }
            })
        },
        login({ commit }, payload) {
            api_util.login(payload.username, payload.hpw, (res) => {
                if (res.data.success) {
                    // console.log(res.data);
                    let expireDate = new Date();
                    if (payload.stayin) expireDate = new Date(res.data.expireDate);
                    const info = {
                        loggedIn: true,
                        auth_token: res.data.auth_token,
                        pending: false,
                        expireDate,
                    }
                    commit('setAuthInfo', info)
                } else {
                    commit('setWarning', {
                        warning: "username or password incorrect",
                        showWarning: true,
                    })
                }

            })
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})