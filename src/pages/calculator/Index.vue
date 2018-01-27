<template>
	<div>
		<show-box/>
		<cal-input/>
	</div>
</template>
<script>
import ShowBox from "./ShowBox"
import CalInput from "./CalInput"

export default{
	name: "Index",
	components: {
		ShowBox,
		CalInput
	}
}
</script>