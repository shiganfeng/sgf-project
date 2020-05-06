<template>
<div class="shopcar-container">
        <div class="good-list">
            <!-- 商品列表区域 -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，
                         总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
				</div>
			</div>
		</div>

        <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data() {
        return {
            
            goodslist:[]//购物车中所有商品的数据
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            //获取到store中所有商品的id，然后拼接出一个用逗号分隔的字符串
            var idArr=[]
            this.$store.state.car.forEach(item => idArr.push(item.id))
            //如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length<=0){
                return
            }
            //获取购物车商品列表

            this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result => {
                if(result.body.status === 0){
                    this.goodslist = result.body.message
                }
            })
        },
        remove(id, index){
            //点击删除，把商品从store中根据传递的id删除，同时，把当前组件中的goodlist中要删除的商品，使用index删除
            this.goodslist.splice(index, 1)
            this.$store.commit('removeFormCar',id)
        },
        selectedChanged(id, val){
            //每当点击开关，把最新的开关状态同步到store中
            this.$store.commit('updateGoodsSelected',{id,selected:val})
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .good-list{
            .mui-card-content-inner{
                display: flex;
                align-items: center;
            }
            img{
                width: 60px;
                height: 60px;

            }
            h1{
                font-size: 13px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .price{
                    color: red;
                    font-weight: bold;
                }
            }
        }

        .jiesuan{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>