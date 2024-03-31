const express = require('express')
const app = express()
const cors = require('cors')
const bp=require('body-parser');
const db=require('mongoose');
require('dotenv').config()

db.connect("mongodb+srv://anas:123@cluster0.xbj37rr.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected"))
.catch(()=>console.log("error connecting"));
let exerciseSchema=new db.Schema({
  description:{
    type:String,
      default:""
  } ,
  duration: {
    type:Number,
      default:0},
  date:{
    type:String,
      default:""
  } 
})
let userSchema=new db.Schema({
  username:{
    type:String,
    default:""
    
  },
  log:{
    type:[exerciseSchema],
    default:[],
    required:true
  }
})
let exerciseModel=new db.model("exercise",exerciseSchema);
let userModel=new db.model("tempuser",userSchema);

app.use(bp.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/users',async(req,res)=>{
  let username=req.body.username;
  if(username){
    //un defined and correct
    let newUser=await new userModel({username:username})
    .then((d)=>console.log("user object added"))
    .catch(()=>console.log("error creating user object"))
   await  newUser.save()
    .then((d)=>console.log("user saved added"))
    .catch(()=>console.log("error saving user object"))
  }
  let user=await userModel.findOne({username:username})
  .then((d)=>d)
  .catch(()=>console.log("error getting user from db"))
  
  
  
})





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
