const actions = {
	increment({commit}){
		commit("increment")
	},
	setResultNum({commit}, resultNum){
		console.info(resultNum)
		commit("setResultNum", resultNum)
	}
}

export default actions;