const express = require('express')
const app = express()
const cors = require('cors')
const bp=require('body-parser');
const db=require('mongoose');
require('dotenv').config()

db.connect(process.env.LINK,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected"))
.catch(()=>console.log("error connecting"));

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
