<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotulist" :key="item.url">
               
                <img :src="item.img" alt="" style="width:100%;">
                
            </mt-swipe-item>

        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:['lunbotulist']
}
</script>
<style lang="scss" scoped>
        .mint-swipe{
        height: 200px;
        .mint-swipe-item{
             &:nth-child(1){background-color: red;}
             &:nth-child(2){background-color: blue;}
             &:nth-child(3){background-color: yellow;}
             &:nth-child(4){background-color: cyan;}
        }
    }
</style>