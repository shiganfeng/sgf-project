const fs=require('fs')
const path=require('path')

function getFileByPath(fpath,succCb,errCb){
    fs.readFile(fpath,'utf-8',(err,dataStr) => {
        if (err) return errCb(err)
        //console.log(dataStr)
        succCb(dataStr)
    })
}

// getFileByPath(path.join(__dirname,'./111.txt'),function(data){
// console.log(data)

// },function(err){
// console.log(err.message)
// })


//回调地狱
//使用ES6中的 Promise 来解决回调地狱问题

getFileByPath(path.join(__dirname,'./111.txt'),function(data){
console.log(data)
    getFileByPath(path.join(__dirname,'./222.txt'),function(data){
        console.log(data)
        getFileByPath(path.join(__dirname,'./333.txt'),function(data){
            console.log(data)
         })
    })
})
