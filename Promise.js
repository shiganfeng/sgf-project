const fs=require('fs')
const path=require('path')

// var promise = new Promise(function(){
//     fs.readFile(path.join('./222.txt'),'utf-8',(err,dataStr)=>{
//         if(err) throw err
//         console.log(dataStr)
//     })
// })

function getFileByPath(fpath){
    var promise = new Promise(function(resolve,reject){
        fs.readFile(fpath,'utf-8',(err,dataStr)=>{
            if(err) return reject(err)
            resolve(dataStr)
        })
    })

    return promise
}

//前面失败但不影响后面的
// getFileByPath('./111.txt')
//  .then(function(data){
//     console.log(data)
//     return getFileByPath('./222.txt')
// },function(err){
//     console(err.message)
//     return getFileByPath('./222.txt')
// })
// .then(function(data){
//     console.log(data)
//     return getFileByPath('./333.txt')
// },function(err){
//     console(err.message)
//     return getFileByPath('./333.txt')
// })
// .then(function(data){
//     console.log(data)
// })

//前面失败，后面的不执行
getFileByPath('./111.txt')
 .then(function(data){
    console.log(data)
    return getFileByPath('./222.txt')
})
.then(function(data){
    console.log(data)
    return getFileByPath('./333.txt')
},function(err){
    console(err.message)
    return getFileByPath('./333.txt')
})
.then(function(data){
    console.log(data)
})
.catch(function(err){
    console.log(err.message)
})