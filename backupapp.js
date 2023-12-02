// //javascript --> client side...
// //nodejs --> server side...
// // const users = require("./users");
// // console.log("Hello World");
// // console.log(users);
// // console.log(users.userAge);
// // console.log(users.userName);
// // // console.log(users.sendUSerData);
// // users.sendUSerData();

// const {sendUSerData,userName,userAge} = require("./users");
// console.log("Hello World");
// console.log(userAge);
// console.log(userName);
// // console.log(users.sendUSerData);
// sendUSerData();


// //MERN --> MongoDB, Express, React, NodeJS
// //Create API --> apache tomcat --> builtin server
// //http module
// //express module

// // var http = require("http");


// // //create server using HTTP MODULE

// // var server = http.createServer((req, res) => {
// //     console.log("server created");
// // })

// // server.listen(8000,()=>{
// //     console.log("server is running 8000");
// // });
// var user = {
//     id:1,
//     name:"raj"
// }


// var users =[
//     {
//         name:"raj"
//     },
//     {
//         name:"pankaj"
//     }
// ]
// app.get("/user",(req,res)=>{
//     console.log("user api called");
//     //res.send("user api called");
//     res.status(200).json({
//         message:"user api called",
//         user:user
//     })
// })

// app.post("/employee",(req,res)=>{

//     console.log("employee api called");
//     console.log(req);
//     //form data
    
//     res.send("employee api called");

// })

// app.get("/user/:id",(req,res)=>{

//     const id = req.params.id;
//     const query = req.query;
//     console.log(query);
//     console.log("user api called");
//     res.json({
//         message:"user api called",
//         user:users,
//         id:id
//     })

// })



const employeeModel = require("./models/EmployeeModel");

app.get("/employee", async (req, res) => {
  ////db.employees.f
  const employees = await employeeModel.find();
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

  // res.status(200).json({
  //     employees:employees,
  //     message:"suceess"
  // })
});

app.get("/employee/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const employee = await employeeModel.findById(id);
    if ((employee && employee != null) || employee != undefined) {
      res.status(200).json({
        employee: employee,
        message: "success",
      });
    } else {
      res.status(200).json({
        employee: {},
        message: "No employee found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});