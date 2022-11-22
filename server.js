import express from 'express'
import bcrypt from 'bcrypt'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// const salt = await bcrypt.genSalt(10);
//     // now we set user password to hashed password
//     user.password = await bcrypt.hash(user.password, salt);
// const validPassword = await bcrypt.compare(body.password, user.password);

//For Login - Returns user data
app.post('/user', (req, res) => {
    res.send({Auth : 'success'})
    //res.send({Auth : 'failed'})
})

//To create users
app.put('/user', (req, res) => {
    res.send({Success : true})
    //res.send({Success: false})
})

//To update users
app.put('/user/:user_id', (req, res) => {
    res.send({Success : true})
    //res.send({Success: false})
})

//To delete users
app.delete('/user', (req, res) => {
    res.send({Success: true})
    //res.send({Success: false})
})

//To get Prices
app.get('/prices', (req, res) => {
    const prices = [
        {'Tier' : 'S', 'minDistance' : 0, 'maxDistance' : 5, 'Price' : 1}
    ]
    res.send(prices)
})

//Update prices
app.put('/prices', (req, res) => {
    //
})

app.delete('/prices', (req, res) => {})

//To add an address - Returns address id
app.post('/address', (req, res) => {
    res.send({Success : true})
    //res.send({Success: false})
})

//To get an address
app.get('/address', (req, res) => {
    res.send({Success : true})
    //res.send({Success: false})
})

//To add personal info - Returns info id
app.post('/info', (req, res) => {
    res.send({Success : true})
    //res.send({Success: false})
})

//To get info 
app.get('/info', (req, res) => {
    res.send({Success : true})
    //res.send({Success: false})
})

//To add orders
app.put('/orders', (req, res) => {
    res.send()
})

app.put('/orders/:order_id', (req, res) => {})

//To get orders from user
app.get('/orders/:user_id', (req, res) => {
    //
})

//Port forwarding
app.listen(port, () => {
  console.log(`SendIT Server running on port ${port}`)
})

