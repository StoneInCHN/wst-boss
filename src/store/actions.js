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
	},
	setCheckedOrders({commit}, checkedOrders){
		commit("setCheckedOrders", checkedOrders)
	}
}

export default actions;