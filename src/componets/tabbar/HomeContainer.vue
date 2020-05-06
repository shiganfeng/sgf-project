<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in getLunbotulist" :key="item.sgfid">
               
                <img :src="item.url" alt="" style="width:100%;">
                
            </mt-swipe-item>

        </mt-swipe>

        <!-- 九宫格->六宫格改造区域 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-order"></span>
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <span class="mui-icon mui-icon-image"></span>
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-videocam"></span>
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            getLunbotulist:[{sgfid:1,url:'src/componets/tabbar/images/1.jpg'},
            {sgfid:2,url:'src/componets/tabbar/images/2.jpg'},{sgfid:3,url:'src/componets/tabbar/images/3.jpg'}],
            lunbotulist:[]
        }
    },
    created(){
        this.getLunbotu()
    },
    methods: {
        getLunbotu(){//获取轮播图数据的方法
            this.$http.get('api/getlunbo').then(result => {
                if(result.body.status === 0){
                    this.lunbotulist=result.body.message
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            // &:nth-child(1){background-color: red;}
            // &:nth-child(2){background-color: blue;}
            // &:nth-child(3){background-color: yellow;}
            // &:nth-child(4){background-color: cyan;}
        }
    }

    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
        .mui-media-body{
            font-size: 13px;   
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
</style>