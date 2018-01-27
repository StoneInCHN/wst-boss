const actions = {
	increment({commit}){
		commit("increment")
	},
	setResultNum({commit}, payload){
		commit("setResultNum", payload)
	}
}

export default actions;