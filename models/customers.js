var mongoose=require("mongoose");
var customerSchema=new mongoose.Schema({
    SNo:{
        type:Number
    },
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Balance:{
        type:Number
    }

});


const Customers=mongoose.model("Customers",customerSchema);


// Customers.insertMany([
//     {SNo:1,Name:"Vishal",Email:"vishal@gmail.com",Balance:43000},
//     {SNo:2,Name:"Arjun",Email:"arjun@gmail.com",Balance:400},
//     {SNo:3,Name:"Tara",Email:"tara@gmail.com",Balance:3400},
//     {SNo:4,Name:"Anirudh",Email:"anirudh@gmail.com",Balance:200000},
//     {SNo:5,Name:"Riya",Email:"riya@gmail.com",Balance:93210},
//     {SNo:6,Name:"Madhav",Email:"madhav@gmail.com",Balance:675400},
//     {SNo:7,Name:"Palak",Email:"palak@gmail.com",Balance:12300},
//     {SNo:8,Name:"Naina",Email:"naina@gmail.com",Balance:38700},
//     {SNo:9,Name:"Kaira",Email:"kaira@gmail.com",Balance:76400},
//     {SNo:10,Name:"Ranbir",Email:"ranbir@gmail.com",Balance:23000}
// ]).then(function(){ 
//     console.log("Data inserted")  // Success 
// }).catch(function(error){ 
//     console.log(error)      // Failure 
// }); 

module.exports=Customers;
