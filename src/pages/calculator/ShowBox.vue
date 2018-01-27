<template>
	<div class="showbox">
		计算结果: {{ result }}
	</div>
</template>
<script>

import {mapGetters} from 'vuex'

export default{
	name: 'ShowBox',
	computed: {
		...mapGetters({
			result: "getResultNum"
		})
	}
}
</script>
<style>
	.showbox{
		text-align: center;
		padding: 30px;
	}
</style>