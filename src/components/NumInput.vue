<template>
	<div>
		<NumberKeyboard
		  :show="show"
		  theme="custom"
		  :extra-key="extraKey"
		  close-button-text="完成"
		  @blur="onBlur"
		  @input="onInput"
		  @delete="onDelete"
		/>
	</div>
</template>

<script>
import { NumberKeyboard } from 'vant'
export default{
	name: "NumInput",
	components: { NumberKeyboard },
	props: {
        show:Boolean,
        input:String,
        extraKey:String
    },
    data () {
		return {			
			keyWordObj:[]
		}
	},
	computed:{
            key: {
			    get: function () {
			      return this.keyWordObj.join('');
			    },
			    set: function () {
			    }
			}
    },
	methods: {
		onBlur(){
			this.keyWordObj = [];
			this.$emit('hide');
		},
		onInput(value){
			this.keyWordObj.push(value);
			this.$emit('input', this.key);
		},
		onDelete(){
			this.keyWordObj.pop();
			this.$emit('input', this.key);
		},
    }
}
</script>

<style scoped>

</style>
