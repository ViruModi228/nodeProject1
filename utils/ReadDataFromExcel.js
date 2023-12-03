const xlsx = require('xlsx');

const readFromExcel =(filePath) =>{
    const file = xlsx.readFile(filePath);

    var data=[];
    const sheets =file.SheetNames;

    for(let i = 0;i<sheets.length;i++){
        const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        temp.forEach((res)=>{
            data.push(res);
        }) 
   }
//    for(let i = 0;i<data.length;i++){
//         // console.log(data[i].password)
//         data[i].password = "wohoo"
//    }
//    console.log(data);
   return data;
}
// readFromExcel("C:/Users/Viral Modi/OneDrive/Desktop/Data1.xlsx");
module.exports = {readFromExcel}