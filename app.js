const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));


// database connection


// router

const employeeRoutes = require("./routes/EmployeeRoutes");
const departmentRoutes = require("./routes/DepartmentRoutes");
const userRoutes = require("./routes/UserRoutes");
const roleRoutes = require("./routes/RoleRoutes");
const fileUploadRoutes = require("./routes/FileUploadRoutes");

app.use("/api",employeeRoutes);
app.use("/api",departmentRoutes)
app.use("/api",roleRoutes)
app.use("/api",userRoutes)
app.use("/api",fileUploadRoutes)

//mongodb package  mongoose
const db = mongoose.connect("mongodb+srv://viralmodi228:root@cluster0.qdkcrg3.mongodb.net/club5", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err)
})
// creating server using express module
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server running on ",PORT)
})