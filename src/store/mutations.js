const mutations = {
	increment(state, payload){
		state.count++
	},
	setResultNum(state, resultNum){
		state.resultNum = resultNum
	}
}

export default mutations;