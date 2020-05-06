<template>
    <div class="goodsinfo-container">

        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- <swiper :lunbotuList="lunbotu"></swiper> -->
                    <mt-swipe :auto="4000">
                          <mt-swipe-item v-for="item in getLunbotulist" :key="item.sgfid">
               
                             <img :src="item.url" alt="" style="height:100%;">
                
                    </mt-swipe-item>

        </mt-swipe>
                </div>
                
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p class="price">
                       市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">
                           ￥{{goodsinfo.sell_price}}</span>
                   </p>
                   <p>购买数量:&nbsp;&nbsp;<numbox @getcount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox></p>
                   
                   <p>
                       <mt-button type="primary" size="small">立即购买</mt-button>
                       <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                   </p>
                </div>
            </div>
        </div>

        <!-- 商品信息区域 -->

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>

                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            lunbotu:[],//轮播图数据
            getLunbotulist:[{sgfid:1,url:'src/componets/goods/images/iphone xr.png'},
            {sgfid:2,url:'src/componets/goods/images/iphone8.png'},{sgfid:3,url:'src/componets/goods/images/iphone11.png'}],
            goodsinfo:{},//获取到的商品的信息
            ballFlag:false,//控制小球隐藏和显示的标识符
            selectedCount:1//保存用户选中的商品数量，默认一个
        }
    },
    mounted(){
        
    },
    created(){
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                if(result.body.status === 0){
                    //先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，只认识item.img，不认识item.src
                    result.body.message.forEach(item => {
                        item.img=item.src
                    })
                    this.lunbotu=result.body.message
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.goodsinfo=result.body.message[0]
                }
            })
        },
        goDesc(id){
            this.$router.push({name:'goodsdesc',params: {id} })
        },
        goComment(id){
            this.$router.push({name:'goodscomment',params: {id} })
        },
        addToShopCar(){
            this.ballFlag=!this.ballFlag
            //拼接一个要存储在store中的对象
            var goodsinfo={id:this.id, count:this.selectedCount, price:this.goodsinfo.sell_price, selected:true}
            //调用store中的mutatios来将商品加入购物车
            this.$store.commit('addToCar',goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el, done){
            el.offsetWidth
            const ballPosition=this.$refs.ball.getBoundingClientRect()
            const badgePosition=document.getElementById('badge').getBoundingClientRect()
            const xDist=badgePosition.left - ballPosition.left
            const yDist=badgePosition.top - ballPosition.top
            el.style.transform=`translate(${xDist}px, ${yDist}px)`
            el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)"
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag
        },
        getSelectCount(count){
            //当子组件把选中的数量传递给父组件时，把选中的值保存到data上
                this.selectedCount=count
               // console.log(this.selectedCount)
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
        .now_price{
            color: red;
            font-size:16px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin:15px 0;
            }
        }
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top:390px;
            left:146px;
        }
    }
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
            // &:nth-child(1){background-color: red;}
            // &:nth-child(2){background-color: blue;}
            // &:nth-child(3){background-color: yellow;}
            // &:nth-child(4){background-color: cyan;}
        }
    }
</style>