const { Admin, Login } = require("../Model/Model");
const fs = require("fs");
const path = require("path");

module.exports.login = (req, res) => {
  try {
    res.render("Login");
  } catch (err) {
    console.log("Login Page Rendering Error..", err);
  }
};

module.exports.adminlogin = async (req, res) => {
  try {
    const Data = await Login.findOne({ email: req.body.email });
    console.log(Data);
    if (Data) {
      if (Data.password == req.body.password) {
        res.redirect("/dashboard");
      } else {
        res.redirect("/");
      }
    } else {
      console.log("User Not Found.");
      res.redirect("/");
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

module.exports.logout = async (req, res) => {
  res.redirect("/");
};

module.exports.dashboard = (req, res) => {
  try {
    res.render("Dashboard");
  } catch (error) {
    console.log("Dashboard Rendering Error ", error);
  }
};

module.exports.form = (req, res) => {
  try {
    res.render("Form", { editdata: null });
  } catch (error) {
    console.log("Form Rendering Error ", error);
  }
};

module.exports.insert = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    await Admin.create(req.body);
    res.redirect("/table");
  } catch (error) {
    console.log("Insert Data Error", error);
  }
};

module.exports.table = async (req, res) => {
  try {
    const data = await Admin.find({});
    data ? res.render("Table", { data }) : res.write("Data not found");
  } catch (error) {
    console.log("Table Rendering Error ", error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const productimg = await Admin.findById(req.query.id);
    if (productimg.image) {
      const oldImage = path.join(__dirname, "../images/", productimg.image);
      if(fs.existsSync(oldImage)){
        fs.unlinkSync(oldImage);
      }
    }
    const deleteproduct = await Admin.findByIdAndDelete(req.query.id);
    deleteproduct ? res.redirect("/table") : console.log("Deleting Error.");
  } catch (error) {
    console.log("Data is not deleted.");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const editdata = await Admin.findById(req.query.id);
    editdata
      ? res.render("Form", { editdata })
      : console.log("Data is not available.");
    console.log(editdata);
  } catch (error) {
    console.log("Data is not go for edit process.");
  }
};

module.exports.editedproduct = async (req, res) => {
  try {
    const editimage = await Admin.findById(req.query.id);
    if (req.file) {
      const Image = path.join(__dirname, "../images/", editimage.image);
      if(fs.existsSync(Image)){
          fs.unlinkSync(Image);
      }
      req.body.image = req.file.filename;
    } else {
      req.body.image = editimage.image;
    }

    const editeddata = await Admin.findByIdAndUpdate(req.query.id, req.body);
    editeddata ? res.redirect("/table") : console.log("Data Not Update.");
  } catch (error) {
    console.log("Data is not edited.");
  }
};
