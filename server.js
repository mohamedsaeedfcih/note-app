// setup server
const express =require('express')
const cors =require('cors')
const bodyParser =require('body-parser')
const noteRoute = require('./route/noteRoute')
const app =express();

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) 

// parse application/json
app.use(bodyParser.json()) 

app.get('/',(req,res)=>{
    res.send('server ok?')

})
app.use('/api/v1', noteRoute)

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })