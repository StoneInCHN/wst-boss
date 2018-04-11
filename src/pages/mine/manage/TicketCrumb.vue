<template>
	<div>
		  	<div class="goods">
		  		<div class="goods_checkbox" v-if="editable">
		  			<Checkbox  v-model="checked"/>
		  		</div>
		  		
		  		<div class="goods_thumb">
		  			<img :src="ticket.goodsUrl" width="90" height="90">
		  			<div class="goods_status">
		  				<span class="valid">上架</span>
		  			</div>
		  		</div> 
		  		<div class="goods_content">
		  			<div class="goods_row">		  				
		  				<div class="goods_title">{{ticket.goodsName}}</div>
		  			</div> 
		  			<div class="goods_row">
		  					<div class="goods_price">{{formatPrice(ticket.salePrice)}}
		  						<span v-if="ticket.price != null">{{formatPrice(ticket.price)}}</span>
		  					</div> 
		  			</div>
		  			<div class="goods_row">		  				
		  				<div class="goods_ticket">{{ticket.ticketInfo}}</div>
		  			</div> 
		  		</div>
		  	</div>
	</div>
</template>

<script>
import { Icon, Toast, Checkbox } from 'vant'
export default{
	name: "TicketCrumb",
	components: { Icon, Toast, Checkbox },
	props: {
        ticket: Object,
        editable: Boolean
    },
    data () {
		return {			
			checked: true
		}
	},
	methods: {
	    formatPrice(num){
	    	if(num){
				return "￥"+num.toFixed(2);
	    	}else{
	    		return "";
	    	}	    	
	    }

    }
}
</script>

<style scoped>
	.goods, .goods_thumb, .goods_checkbox, .goods_row {
	    display: flex;
	}
	.goods_content {
	    width: 100%;
	}
	.goods {
	    color: #333;
	    height: 120px;
	    font-size: 16px;
	    background: #fafafa;
	    position: relative;
	    box-sizing: border-box;
	    padding: 15px 15px 5px 130px;
	}
	.goods_checkbox {
	    top: 40px;
	    left: 6px;
	    position: absolute;
	}
	.goods_thumb {
	    top: 15px;
	    left: 30px;
	    width: 90px;
	    height: 90px;
	    position: absolute;
	    border: 1px solid #eee;
	    border-radius: 5px;
	}
	.goods_thumb {
	    align-items: center;
	    justify-content: center;
	}
	.goods_title {
	    max-height: 40px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.goods_price {
	    color: #666;
	    font-size: 12px;
	    max-height: 20px;
	    margin-top:18px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.goods_price span{
		padding-left: 5px;
		text-decoration: line-through;
	}
	.goods_ticket{
		color: #3F91D2;
	    font-size: 14px;
	    max-height: 18px;
	    margin-top:15px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.goods_status span{
		left: 60%;
	    top: -10px;
	    position: absolute;
	    box-sizing: border-box;
	    padding:2px 6px;
	    border-radius: 2px;
	    font-size: 12px;
	    color: #fff;
	}
	.valid {
	    background-color: #B6DF6E;
	}
</style>
