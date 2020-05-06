<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
            <span>点击:{{newsinfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content">
            
        </div>

        <comment-box id="this.id" ref="mycomment"></comment-box>
        <!-- <mt-button type="danger" size="large" plain @click="fathermethod2">父组件调用子组件方法</mt-button> -->
    </div>
</template>

<script>
import {Toast} from "mint-ui"
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,//将url地址中传递过来的id值，挂载到data上，方便以后调用
            newsinfo:{}
        }
    },
    created(){
        this.getNewsinfo();
    },
    methods:{
        getNewsinfo(){//获取新闻详情
            this.$http.get('api/getnew/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.newsinfo=result.body.message[0]
                }else{
                    Toast('获取新闻详情失败');
                }
            })
        },
        fathermethod1(){
            console.log('父亲方法')
        },
        fathermethod2(){
            this.$refs.mycomment.childmethod2("父组件调用子组件方法")
        }
    },
    components:{
        'comment-box':comment
    }
}
</script>

<style lang="scss">
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color:blue;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>