import express from 'express'
import mysql from 'mysql'
import bcrypt from 'bcrypt'

//mysql://root:rnh1gHT4zhFuOCmOVOvz@containers-us-west-74.railway.app:5726/railway
/*
DATABASE railway
HOST containers-us-west-74.railway.app
PW rnh1gHT4zhFuOCmOVOvz
PORT 5726
USER root
URL mysql://${{ MYSQLUSER }}:${{ MYSQLPASSWORD }}@${{ MYSQLHOST }}:${{ MYSQLPORT }}/${{ MYSQLDATABASE }}
*/

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
    try {
        console.log("There was a POST request to /user to get the user info", req.body);
        getUserData = async () => {
            // Code here to get user data from database
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.send({ Auth: 'success', data: getUserData });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.send("Error");
    }
})

//To create users
app.put('/user', (req, res) => {
    try {
        console.log("There was a PUT request to /user to create an user ", req.body);
        createUser = async () => {
            const newUser = new User({
                // New user object
            });
            // Code here to save user to database
        }
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.send("Error");
    }
})

//To update users
app.put('/user/:user_id', (req, res) => {
    try {
        console.log("There was a PUT request to /user to update an user ", req.body);
        updateUser(req.params.user_id) = async (user) => {
            // Code here to update user data in database
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.send({ Success: true });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.send("Error");
    }
})

//To delete users
app.delete('/user', (req, res) => {
    try {
        console.log("There was a DELETE request to /user to delete an user ", req.body);
        deleteUser = async () => {
            // Code here to delete user from database
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.send("Error");
    }
})

//To get Prices
app.get('/prices', (req, res) => {

    // class tier {
    //     constructor(tier, minDistance, maxDistance, price) {
    //         this.tier = tier;
    //         this.minDistance = minDistance;
    //         this.maxDistance = maxDistance;
    //         this.price = price;
    //     }
    // }

    // const tiers = [
    //     new tier("S", 0, 5, 1),
    //     new tier("M", 5, 10, 0.97),
    //     new tier("L", 10, 15, 0.94),
    //     new tier("XL", 15, 20, 0.81),
    //     new tier("Ultra", 20, undefined, 0.81)
    // ]

    try {
        console.log("There was a GET request to /prices to get the prices ", req.body);
        getPrices = async () => {
            // Code here to get prices from database
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.send({ Auth: 'success', data: getPrices });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.send("Error");
    }
})

//Update prices
app.put('/prices', (req, res) => {
    //
})

app.delete('/prices', (req, res) => { })

//To add an address - Returns address id
app.post('/address', (req, res) => {
    res.send({ Success: true })
    //res.send({Success: false})
})

//To get an address
app.get('/address', (req, res) => {
    res.send({ Success: true })
    //res.send({Success: false})
})

//To add personal info - Returns info id
app.post('/info', (req, res) => {
    res.send({ Success: true })
    //res.send({Success: false})
})

//To get info 
app.get('/info', (req, res) => {
    res.send({ Success: true })
    //res.send({Success: false})
})

//To add orders
app.put('/orders', (req, res) => {
    res.send()
})

app.put('/orders/:order_id', (req, res) => { })

//To get orders from user
app.get('/orders/:user_id', (req, res) => {
    try {
        console.log("There was a GET request to /orders to get the orders from an user ", req.body);
        const user = req.params.user_id;
        getOrders(user) = async (user) => {
            // Code here to get orders from database
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.send({ Auth: 'success', data: getOrders });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.send("Error");
    }
})  

//Port forwarding
app.listen(port, () => {
    console.log(`SendIT Server running on port ${port}`)
})

