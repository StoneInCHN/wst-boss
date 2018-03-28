const mutations = {
	increment(state, payload){
		state.count++;
	},
	setResultNum(state, resultNum){
		state.resultNum = resultNum;
	},
	setWorker(state, worker){
		state.worker = worker;
	}
}

export default mutations;