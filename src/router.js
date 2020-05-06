//下载路由 cnpm i vue-router -S
//1.导入 vue-router 包
import VueRouter from 'vue-router'
import HomeContainer from './componets/tabbar/HomeContainer.vue'
import MemberContainer from './componets/tabbar/MemberContainer.vue'
import ShopcarContainer from './componets/tabbar/ShopcarContainer.vue'
import SearchContainer from './componets/tabbar/SearchContainer.vue'
import NewsList from './componets/news/NewList.vue'
import Newsinfo from './componets/news/Newsinfo.vue'
import PhotoList from './componets/photos/PhotoList.vue'
import Photoinfo from './componets/photos/Photoinfo.vue'
import GoodsList from './componets/goods/GoodsList.vue'
import Goodsinfo from './componets/goods/Goodsinfo.vue'
import GoodsDesc from './componets/goods/GoodsDesc.vue'
import GoodsComment from './componets/goods/GoodsComment.vue'
//3.创建路由对象
var router= new VueRouter({
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer},
        { path: '/shopcar', component: ShopcarContainer},
        { path: '/search', component: SearchContainer},
        { path: '/home/newslist', component: NewsList},
        { path: '/home/newsinfo/:id', component: Newsinfo},
        { path: '/home/photolist', component: PhotoList},
        { path: '/home/photoinfo:id', component: Photoinfo},
        { path: '/home/goodslist', component: GoodsList},
        { path: '/home/goodsinfo/:id', component: Goodsinfo, name:'goodsinfo'},
        { path: '/home/goodsdesc/:id', component: GoodsDesc, name:'goodsdesc'},
        { path: '/home/goodscomment/:id', component: GoodsComment, name:'goodscomment'},
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由的高亮的类，默认的类叫做router-link-active
})
//把路由对象暴露出去
export default router