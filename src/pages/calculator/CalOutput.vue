<template>
	<div>
		计算结果: {{resultNum}}
	</div>
</template>
<script>
export default{
	name: 'CalOutput',
	computed: {
		resultNum(){
			return this.$store.state.resultNum
		}
	}
}
</script>