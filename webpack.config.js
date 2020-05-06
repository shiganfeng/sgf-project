
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')

//启用热更新的第二步
const webpack=require('webpack')

//导入在内存中生成HTML页面的插件 （插件是webpack-html,命令行为npm i html-webpack-plugin -D）
//只要是插件 ，都一定要放到plugin节点中去
//这个插件的两个作用
//1.自动在内存中根据指定页面生成一个内存的页面
//2.自动把打包好的bundle.js 追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

//这个文件，其实就是一个JS文件，通过Node中的模块操作，向外暴露了一个配置对象
module.exports={
    mode:'development',
    entry:path.join(__dirname,'./src/main.js'),//入口文件
    output: {
        path: path.resolve(__dirname, 'dist'),//指定打包好的文件，输出到哪个目录中去
        filename: 'bundle.js'                 //指定输出文件的名称
    },
    devServer: {//这是配置 dev-server 命令参数的第二种形式，相对来说这种方式麻烦一些
        open: true,             //自动打开浏览器
        port: 3000,             //设置启动时候的运行端口
        //contentBase: 'src',     //指定托管的根目录
        hot: true               //启用热更新的第一步
    },
    plugins: [//配置插件的节点
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象，这是启用热更新的第三步
        new htmlWebpackPlugin({//创建一个在内存中生成HTML页面的插件
            template: path.join(__dirname,'./src/index.html'),//指定模板页面，将来会根据指定页面路径，
                                                                //  去生成内存中的页面
            filename: 'index.html' //指定生成的页面的名称
        })
    ],
    module: {//这个节点用于配置所有的第三方模块加载器
        rules: [//这是所有第三方模块的匹配规则
            {test: /\.css$/, use:['style-loader','css-loader'] },//配置处理 .css 文件的第三方loader规则,从右往左调用
            {test: /\.less$/, use:['style-loader','css-loader','less-loader'] },//配置处理 .less 文件的第三方loader规则,从右往左调用
            {test: /\.scss$/, use:['style-loader','css-loader','sass-loader'] },//配置处理 .scss 文件的第三方loader规则,从右往左调用
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=1803&name=[hash:8]-[name].[ext]' },
            //配置处理 .(jpg|png|gif|bmp|jpeg) 文件的第三方loader规则,从右往左调用
            //limit给定的值是图片的大小，单位是byte,如果我们引用的图片大于或等于给定的limit值，则不会被转为base64的字符串，
            //如果我们引用的图片小于给定的limit值，则会被转为base64的字符串，
            //name=[hash:8]-[name].[ext]表示与8倍的哈希值-之前的图片名字和后缀名一样
            {test: /\.(ttf|woff2|eot|svg|woff)$/,use: 'url-loader'},//处理字体文件的loader配置
            {test: /\.js$/,use: 'babel-loader', exclude: /node_modules/},//配置Babel来转换高级的ES语法
            {test: /\.vue$/,use: 'vue-loader'}//处理.vue文件的loader
        ]
    },
    resolve: {
        alias:{//修改vue被导入包的时候的路径
            //'vue$':'vue/dist/vue.js'
        }
    },
    node:{
        fs:"empty"
    },
    stats: { children: false }
}

//当我们在控制台，直接输入webpack的时候，webpack执行以下几步
//1，首先，webpack发现并没有通过命令的形式，给它指定入口和出口
//2，webpack就会去项目的根目录中，查找一个叫'webpack.config.js'的配置文件
//3.当找到这个配置文件后，webpack会去解析和执行这个配置文件，当解析执行完，
//就得到了配置文件中，导出的配置对象
//4.当webpack拿到配置对象后，就拿到了配置对象中指定的入口和出口，然后进行打包构建