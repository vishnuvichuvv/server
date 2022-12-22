

// import dataservice file from service folder

const dataservice = require("./service/dataservice")

// import jsonwebtoken

const jwt = require('jsonwebtoken')


// import express
const express = require('express')

// create app

const app = express()


// for converting json
app.use(express.json())



// middlewares for verifying tokes

const jwtmiddleware = (req, res, next) => {
  console.log('........router specific middleware..............');
  try {
    const token = req.headers.accesstoken
    const data = jwt.verify(token, "secretkey123")
    console.log(data);
    next()
  }
  catch {
    res.status(401).json({
      statusCode: 401,
      status: false,
      message: "please login first"
    })
  }


}


// request
// ------------
// register

app.post('/register', (req, res) => {

  const result = dataservice.register(req.body.acno, req.body.uname, req.body.psw)

  res.status(result.statusCode).json(result)

})

// login

app.post('/login', (req, res) => {

  const result = dataservice.login(req.body.acno, req.body.psw)

  res.status(result.statusCode).json(result)

})
// deposit

app.post('/deposit', jwtmiddleware, (req, res) => {
  const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amount)

  res.status(result.statusCode).json(result)
})
// withdraw

app.post('/withdraw', jwtmiddleware, (req, res) => {
  const result = dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount)

  res.status(result.statusCode).json(result)
})

// transaction

app.post('/transaction', jwtmiddleware, (req, res) => {
  const result = dataservice.gettransaction(req.body.acno)

  res.status(result.statusCode).json(result)
})

// delete


// GET

// app.get('/',(req,res)=>{
//     res.send('get Method checking')
// })

// // POST
// app.post('/',(req,res)=>{
//     res.send('post Method checking')
// })
// // PUT
// app.put('/',(req,res)=>{
//     res.send('put Method checking')
// })
// // PATCH
// app.patch('/',(req,res)=>{
//     res.send('patch Method checking')
// })
// // DELETE
// app.delete('/',(req,res)=>{
//     res.send('delete Method checking')
// })




// set port
app.listen(3000, () => {
  console.log("server started at port number 3000");
})

