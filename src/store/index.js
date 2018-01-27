/**
*主要入口文件，引入其他四个js
*/
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

//引入actions、mutations、getters
import actions from "./actions.js"
import mutations from "./mutations.js"
import getters from "./getters.js"

const state = {
	token: '',
	count: 0,
	name: 'tanbiao',
	resultNum: 0
}

const store = new Vuex.Store({
	state,
    mutations,
    actions,
    getters
})

export default store;