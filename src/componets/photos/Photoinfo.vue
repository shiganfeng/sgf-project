<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
            <span>点击次数:{{photoinfo.click}}</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        <!-- <div class="thumbs">
            <img class="preview-img" v-for="(item,index) in list" :key="item.src" :src="item.src" height="100" 
            @click="$preview.open(index,list)">
        </div> -->

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content">

        </div>

        <!-- 评论子组件 -->
        <!-- <cmt-box :id="id"></cmt-box> -->
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            photoinfo:{},
            list:[],
            slide1: [],
        }
    },
    created(){
        this.getPhotoInfo()
        this.getThumbs()
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.photoinfo=result.body.message[0]
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                 if(result.body.status === 0){
                     result.body.message.forEach(item => {
                         item.w=600
                         item.h=400
                         item.msrc = item.src
                         item.alt= 'picture2'
                         item.title = 'Image Caption 2'
                     })
                    this.slide1=result.body.message
                 }
            })
        },
        handleClose () {
        console.log('close event')
      }
    },
    components:{
        'cmt-box':comment
    }
}
</script>
<style lang="scss" scoped>
    .photoinfo-container{
        padding: 3px;
        h3{
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin:15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content{
            font-size: 13px;
            line-height: 30px;
        }
        // .thumbs{
        //     img{
        //         margin: 10px;
        //         box-shadow: 0 0 8px #999;
        //     }
        // }
        .thumbs{
                display: flex;
                flex-wrap:wrap;//默认换行
                figure{
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 8px #999;
                        border-radius: 5px;
                    }
                }
            

        }
    }
</style>