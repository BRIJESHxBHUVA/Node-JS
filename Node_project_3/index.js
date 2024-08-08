const express = require('express')

const app = express()
app.use(express.urlencoded());

app.set("view engine","ejs")

let StudentData = [
    {
        taskid: 1,
        taskname: "ayan"
    },
    {
        taskid: 2,
        taskname: "raj"
    },
    {
        taskid: 3,
        taskname: "om"
    }
]

app.get("/", function(req, res){
    res.render("tutorial",{
        students: StudentData
    })
})

app.post("/AddData", function (req, res) { 
    const {id, name} = req.body
    let NewData = {
        taskid: id,
        taskname: name
    }
    StudentData.push(NewData)

    res.render("tutorial",{
        students: StudentData
    })

 })

 app.get("/DeteteData", function(req, res) {
    const id = req.query.userid
    let NewStudentData = StudentData.filter((el, i)=>{
        return el.taskid != id
    })
    StudentData = NewStudentData
    res.redirect('/')
 })


app.get("/EditData", function (req, res) {
    const id = req.query.userid;
    const studentToEdit = StudentData.find((el) => el.taskid == id);
    res.render("edit", {
        student: studentToEdit
    });
});

app.post("/EditData", function (req, res) {
    const id = req.query.userid;
    StudentData = StudentData.map((el) => {
        if (el.taskid == id) {
            el.taskname = req.body.name;
        }
        return el;
    });
    res.redirect("/");
});

app.listen(2000, ()=> {
    console.log("Server is running on port 2000")
    console.log(StudentData)
})