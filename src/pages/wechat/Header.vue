<template>
	<div>
		<NavBar title="物易达" left-text="返回" left-arrow @click-left="back">
		  <Icon name="home" slot="right" />
		</NavBar>
	</div>
</template>

<script>
import { NavBar, Icon } from 'vant';
export default{
	name: "Header",
	components: { NavBar, Icon },
	props: ['backUrl'],
	data () {
		return {

		}
	},
	methods: {
        back () {
            //console.info(this.backUrl)
            this.$router.push({path:this.backUrl});
        }
    }
}
</script>

<style scoped>

</style>
