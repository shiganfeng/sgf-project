<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id="" cols="5" rows="3" placeholder="请输入内容" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <div class="cmt-list" v-for="(item,i) in comments" :key="item.add_time">
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === 'underfined' ? '此用户很懒':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
        <!-- <mt-button type="danger" size="large" plain @click="childmethod1">子组件调用父组件方法</mt-button> -->

    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data() {
        return {
            pageIndex:1,
            comments:[],
            msg:''
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                console.log(result)
                if(result.body.status === 0){
                    this.comments=this.comments.concat(result.body.msg)
                }else{
                    Toast('获取评论失败');
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments()
        },
        postComments(){
            if(this.msg.trim().length===0){
                return Toast("评论不能为空")
            }
            this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.msg.trim()})
            .then(function(result){
                if(result.body.status===0){
                    var cmt={user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()}
                    this.comments.unshift(cmt)
                    this.msg=""
                }
            })
        },
        childmethod1(){
            this.$parent.fathermethod1()
        },
        childmethod2(e){
            console.log(e)
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin:5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body{
                     line-height: 35px;
                     text-indent: 2em;
                }
            }
        }
    }
</style>