<template>
	<div>
<!-- 		<NavBar title="云水站" left-text="" left-arrow @click-left="back">
		  <Icon name="home" slot="right" />
		</NavBar> -->
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
