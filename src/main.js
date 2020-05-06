//入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入时间插件moment.js
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
   return moment(dataStr).format(pattern)
})

import app from './App.vue'

// import { Header } from 'mint-ui'
// Vue.component(Header.name,Header)
// import { Swipe, SwipeItem,Button } from 'mint-ui'
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)

// //懒加载
// import { Lazyload } from 'mint-ui'
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置post时候的表单数据格式组织形式
Vue.http.options.emulateJSON = true

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入使用vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站，肯定回调应main.js，在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var mycar = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state:{//this.$store.state.***
    car:mycar//将购物车中的商品数据，用一个数组存储起来
  },
  mutations:{//this.$store.commit('方法名称','按需传递唯一的参数')
    addToCar(state,goodsinfo){
      //把商品信息保存早store上的car中
      var flag = false

      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count)
          flag=true
          return true
        }
      })
      
      if(!flag){
        state.car.push(goodsinfo)
      }

      //当更新car之后，把car数组，存储到本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中商品的数量值
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品的数量，把最新的购物车数据保存到本地存储中 
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormCar(state,id){
      //根据id从store中的购物车中删除
      state.car.some((item,i) => {
        if(item.id == id){
          state.car.splice(i, 1)
          return true
        }
      })
        //当更新car之后，把car数组，存储到本地的localStorage中
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info){
      state.car.some(item => {
        if(item.id == info.id){
          item.selected = info.selected
          return true
        }
      })
        //当更新car之后，把car数组，存储到本地的localStorage中
        localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters:{//this.$store.getters.***
            //相当于计算属性，也相当于过滤器
            getAllCount(state){
              var c=0
              state.car.forEach(item => {
                c+=item.count
              })
              return c
            },
            getGoodsCount(state){
              var obj1 = {}
              state.car.forEach(item => {
                obj1[item.id]=item.count
              })
              return obj1
            },
            getGoodsSelected(state){
              var obj2 = {}
              state.car.forEach(item => {
                obj2[item.id] = item.selected
              })
              return obj2
            },
            getGoodsCountAndAmount(state){
              var obj3= {count: 0,amount: 0}//勾选的数量和总价
              state.car.forEach(item => {
                if(item.selected){
                  obj3.count += item.count
                  obj3.amount += item.price * item.count
                }
              })
              return obj3
            }

  }
})


import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import router from  './router.js'
import { stat } from 'fs'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,//挂载路由对象在vm实例上
    store//将vuex创建的store挂载到vm实例上
})