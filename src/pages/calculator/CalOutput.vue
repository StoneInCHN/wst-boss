<template>
	<div>
		<p>计算结果: {{resultNum}}</p>
		<p>计算次数: {{count}}</p>
	</div>
</template>
<script>
export default{
	name: 'CalOutput',
	computed: {
		resultNum(){
			return this.$store.state.resultNum
		},
		count(){
			return this.$store.state.count
		}
	}
}
</script>