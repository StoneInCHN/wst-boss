const actions = {
	increment({commit}){
		commit("increment")
	},
	setResultNum({commit}, resultNum){
		console.info(resultNum)
		commit("setResultNum", resultNum)
	},
	setWorker({commit}, worker){
		commit("setWorker", worker)
	}
}

export default actions;