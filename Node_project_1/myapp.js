
// This code for creating file with sync function 

const fs = require('fs');

fs.writeFileSync("test.txt", "this file created with syncs");

// This code for creating file with Async await function  

const ff = require("fs").promises

async function CreatFile() {

    try{
       await ff.writeFile("Async-await.html", "This file is created with Async / Await")
       console.log("File is created...");
    }
    catch(err){
        console.log(err.message)
    }
}

  
  CreatFile()