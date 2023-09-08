const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({
  extended:true
}))
app.get("/",(req,res)=>{
  res.send("HELLO WORLD")
})
app.get('/bfhl', (req, res) => {
 const response = {
  "operation_code":1
 }
  res.status(200).send(response)
})

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

app.post('/bfhl', (req, res) => {
  const response = {
    "is_success":true,
    "user_id":"eshan_singh_24092002",
    "email":"es9879@srmist.edu.in",
    "roll_number":"RA2011026010184",
    "numbers":[],
    "alphabets":[],
    "highest_alphabet":[]
  }
try{
  const {data} = req.body
  let max = "A"
  for(let i =0;i <data.length;i++){
    if(isLetter(data[i])){
      let c = data[i]
      c = c.toUpperCase()
      if(c.charCodeAt(0) > max.charCodeAt(0)){
        max = c;
      }
      response.alphabets.push(c)
      continue;
    }
    if(response.alphabets.length > 0){
      response.highest_alphabet.push(max)
    }
    response.numbers.push(data[i])
  }

  res.send(response)
}catch(err){
  response.is_success = false
  res.send(response)
}
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
