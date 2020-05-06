const fs=require('fs')
const path=require('path')

function getFileByPath(fpath,callback){
    fs.readFile(fpath,'utf-8',(err,dataStr) => {
        if (err) return callback(err)
        //console.log(dataStr)
        callback(null,dataStr)
    })
}

getFileByPath(path.join(__dirname,'./111.txt'),(err,dataStr)=>{
    if(err) return console.log(err.message)

    console.log(dataStr)
})