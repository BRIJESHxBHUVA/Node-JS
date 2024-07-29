
const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (req, res) {

    if(req.url === '/tutorial.html') {
        const filepath = path.join(__dirname, 'tutorial.html')

        fs.readFile(filepath, function (err, data) {
            if(err){
                res.writeHead(500, {'Content-Type' : 'text/plain'});
                res.write("Internal Server Error");
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.write(data)
                res.end()
            }
        })
    }
    else{
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write("Royal Challengers Bangalore &nbsp;");
        res.write(req.url);
        res.end();
    }

   
}).listen(8080, ()=> {
    console.log("Server is running on 8080 port")
})