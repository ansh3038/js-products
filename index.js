const http = require('http')
const fs = require('fs')

function listener(req,res){
    // console.log(req);
    if(req.url === "/"){
        fs.readFile("index.html",(err,data) =>{
            if(data){
                res.writeHead(201,{
                    "Content-type" : 'text/html'
                })
            }
            // console.log(res);
            res.end(data);

        })
    }
    else if(req.url.includes(".html")){
        fs.readFile(`.${req.url}`,(err,data) =>{
            if(data){
                res.writeHead(201,{
                    "Content-type" : 'text/html'
                })
            }
            res.end(data);
        })
    }
    else if(req.url.includes(".js")){
        fs.readFile(`.${req.url}`,(err,data) =>{
            if(data){
                res.writeHead(201,{
                    "Content-type" : 'text/javascript'
                })
            }
            res.end(data);
        })
    }
    else if(req.url.includes(".css")){
        fs.readFile(`.${req.url}`,(err,data) =>{
            if(data){
                res.writeHead(201,{
                    "Content-type" : 'text/css'
                })
            }
            res.end(data);
        })
    }
    else if(req.url.includes(".jpg")){
        fs.readFile(`.${req.url}`,(err,data) =>{
            if(data){
                res.writeHead(201,{
                    "Content-type" : 'text/jpg'
                })
            }
            res.end(data);
        })
    }
    else{
        res.writeHead(404);
        res.end('{error:"Not Found"}');
    }
}

const httpServer = http.createServer(listener);
httpServer.listen(3000,"",()=>{
    console.log("Listening on port 3000");
})