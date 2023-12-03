const employeeModel = require("../models/EmployeeModel");
const encryptPassword = require("../utils/PasswordEncrypt");
const tokenUtil = require("../utils/TokenUtil")
const authModel = require("../models/AuthModel");
const AuthModel = require("../models/AuthModel");
const readDataFromExcel = require("../utils/ReadDataFromExcel");
const multer = require("multer");
const path = require("path");

// const employeeModel = require(EmployeeModel);

// jsut like as of spring hame yaha pr methods banani hai!
const getAllEmployees = async (req, res) => {
    var id = req.params.id;
    console.log(id)
    const employees = await employeeModel.find();
    // Updating employee's number of counts
    const loginEmployee = await employeeModel.findById(id);
    const employee={
      name:loginEmployee.name,
      age:loginEmployee.age,
      password:loginEmployee.password,
      email:loginEmployee.email,
      count:loginEmployee.count - 1
    }

    if(loginEmployee){
      const flag = await employeeModel.findByIdAndUpdate(id,employee)
      console.log(flag.count)
    }
    //

    console.log(employees);

    if (employees && employees.length !== 0) {
        res.status(200).json({
            employees: employees,
            message: "success",
        });
    } else {
        res.status(200).json({
            employees: [],
            message: "No employee found",
        });
    }
};

// post method

const addEmployee = async (req, res) => {
    console.log("req body", req.body)

    const empData = {
      name:req.body.name,
      email:req.body.email,
      age:req.body.age,
      password:encryptPassword.encryptPassword(req.body.password),
      count:5
    }
    const employee = new employeeModel(empData);
    try {
        const flag = await employee.save();
        if (flag) {
            res.status(200).json({
                employee: employee,
                message: "success"
            })
        }
        else {
            if (flag) {
                res.status(200).json({
                    employee: {},
                    message: "failed"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            employee: {},
            message: err.message
        })
    }
}

const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        const flag = await employeeModel.findByIdAndDelete(id);
        console.log(flag);
        if (flag) {
            res.status(204).json({
                message: "success",
            });
        } else {
            res.status(200).json({
                message: "failed",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const employeeBody = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password:req.body.password
    };
    try {
        const flag = await employeeModel.findByIdAndUpdate(id, employeeBody);
        if (flag) {
          res.status(200).json({
            message: "success",
            employee: flag,
          });
        } else {
          res.status(200).json({
            message: "failed",
          });
        }
      } catch (err) {
        res.status(500).json({
          message: err.message,
        });
      }
}

const getEmployeeById = async (req, res) => {
    try {
      const flag = await employeeModel.findById(req.params.id);
      if (flag) {
        res.status(200).json({
          message: "success",
          employee: flag,
        });
      } else {
        res.status(404).json({
          message: "record not found",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

const filterEmployee = async(req,res)=>{
    console.log(req.query);
    const query = req.query;

    const data = await employeeModel.find({...query});
    if(data){
        res.status(200).json({
            message:"success",
            data:data 
        })
    }
    else{
        res.status(404).json({
            message:"failed",
            data:[]
        })
    }
    console.log(query);
}
const loginEmployee = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password)
    const employee = await employeeModel.findOne({email:email});
    console.log("employee",employee);
    console.log(employee.password)
    
    console.log(employee.id)
    
    if(employee){
      const flag = encryptPassword.comparePassword(password,employee.password);
      console.log(flag);
      if(flag){
        // generating token
        const token = tokenUtil.generateToken(employee.toObject())
        console.log(token)
        // saving token to database for security purpose

        const saveToken = {
          token:token,
          employee:employee.id
        }

        const dbtoken = new AuthModel(saveToken);
        await dbtoken.save();

        //Sending response
        res.status(200).json({
          message:"Login success",
          token:token
        })
      }
      else{
        res.status(404).json({
          message:"Login failed",
          data:[]
        })
      }

    }
    else{

      res.status(404).json({
        message:"Register first",
        data:[]
      })

    }
}

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("file");

const addBulkEmployee = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      console.log(req.file.path);
      const data = readDataFromExcel.readFromExcel(req.file.path);

      if(data.length>0){

        for(let i = 0;i<data.length;i++){
          console.log(data[i].password)
          data[i].password = encryptPassword.encryptPassword(data[i].password);
     }

        const flag = await employeeModel.insertMany(data);
        if (flag) {
          res.status(200).json({
            message: "success",
            data: flag,
          });
        } else {
          res.status(200).json({
            message: "failed",
          });
        }
      }
      else{
        res.status(200).json({
            message:"no data found in excel file"
        })
      }
    }
  });
};
module.exports={
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    filterEmployee,
    getEmployeeById,
    loginEmployee,
    addBulkEmployee
}