//这是node中向外暴露成员的方式
//module.exports = {}

//在ES6中也通过规范的形式，规定了ES6中如何导入和导出模块
//ES6中导入模块，使用import 模块名称 from '模块标识符'   import '表示路径'

//在ES6中使用 export default 和 export 向外暴露成员
export default {
    name:'sgf',
    age:21
}

//export default 向外暴露的成员可以使用任何变量来接收
//在一个模块中，export default 只允许向外暴露一次
//在一个模块中，可以同时使用export defult和export 向外暴露成员

export var title = '小行星'
export var content = '地球'
//使用export向外暴露的成员只能使用{}的形式来接收，这种形式叫做【按需导出】
//export 可以向外暴露多个成员，同时如果某些成员，我们在import的时候不需要，则可以，不在{}中定义
//使用export导入的成员，必须按照导出时候的名称，来使用{}按需接收,如果换名称，可以用as起别名


//在Node 中使用var 名称 = require('模块标识符') 来导入
//module.exports 和 exports 来暴露