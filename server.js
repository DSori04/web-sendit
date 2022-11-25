import express from 'express'
import mysql from 'mysql'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

// Import stripe with secret key
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PORT = 3170

// Express + cors (All data is sent as json)
const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
))

// Database connection
const cnx = mysql.createConnection(process.env.FULL_URL)
try {
    // Connects to the database
    cnx.connect();
} catch (error) {
    // If the connection fails, the server will not start
    console.log(error);
    // Exit the process
    process.exit(1);
}


/**
 * To get the user data
 * 
 * Body format: {email: String, password: String}
 * 
 * Response: 
 * {success: true, 
 * message: 'User logged in successfully', 
 * user_id: num, 
 * email: String, 
 * name: String, 
 * surname: String}
 */
app.post('/user', async (req, res) => {
    const salt = await bcrypt.genSalt(10);


    try {
        // Gets the mail and password from the request body
        let { email, password } = req.body;
        console.log(email, password)

        // Gets from db all users with the same email from the request
        const sql = 'SELECT * FROM USERS WHERE email = ?';
        cnx.query(sql, [email], async (err, rows) => {
            // If an user does exist
            if (rows.length > 0) { //? It should be rows.length == 1; thre can't be more than one user with the same email
                //password = await bcrypt.hash(password, salt);
                console.log(password, await bcrypt.compare(password, rows[0].password))
                // If the password from user matches the databese password
                if (await bcrypt.compare(password, rows[0].password)) {

                    // If they match, return the user data
                    res.send({
                        success: true,
                        message: 'User logged in successfully',
                        user_id: rows[0].user_id,
                        email: rows[0].email,
                        name: rows[0].name,
                        surname: rows[0].surname,
                    });

                } else {
                    // If they don't match, return an error
                    res.status(401).send({ success: false, message: "Incorrect password" });

                }
            } else {
                // In case users don't exist (rows.length <= 0) return an error
                res.status(404).send({ success: false, message: "No user found" });

            }
        });

    }

    catch (error) {
        res.status(500).send({ error: error.message });
    }

});


/**
 * To create a new user
 * 
 * Body format: 
 * {name: String, 
 * surname: String, 
 * mail: String,
 * password: String}
 *
 * Response: 
 * {name: String,
 * surname: String,
 * mail: String, 
 * success: true,
 * message: 'User created'}
 */
app.put('/user', async (req, res) => {
    // Salt generation
    const salt = await bcrypt.genSalt(10);

    try {
        // Gets the mail, surname, mail and password from the request body
        let { name, surname, mail, password } = req.body;
        const sql1 = 'SELECT * FROM USERS WHERE email = ?';
        console.log(name, surname, mail, password)
        // Encrypts the password with a salt
        const hashedpw = await bcrypt.hash(password, salt);

        // Gets from db all users with the same email from the request
        cnx.query(sql1, [mail], (err, rows) => {

            // If there's an SQL error, return it
            if (err) throw err;

            // If an user does already exist with the same email, return an error
            if (rows.length > 0) {
                res.status(400).send({ success: false, message: "User already exists" });

            } else {
                // If the user doesn't exist, create it

                // Query to insert the user in the database
                const sql2 = 'INSERT INTO USERS (name, surname, email, password) VALUES (?, ?, ?, ?)';

                // Inserts the user in the db
                cnx.query(sql2, [name, surname, mail, hashedpw], (err, rows) => {

                    // If there's an SQL error, return it
                    if (err) throw err;

                    // If the user is created, return the user data
                    res.send({
                        name: name,
                        surname: surname,
                        mail: mail,
                        success: true,
                        message: 'User created'
                    })
                });
            }

        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To update users
app.put('/user/:user_id', async (req, res) => {
    // Salt generation
    const salt = await bcrypt.genSalt(10);

    try {
        // Gets the mail, surname, mail and password from the request body
        let {name, surname, email, password} = req.body;
        const hashedPasswd = await bcrypt.hash(password, salt); //! hashedPasswd isn't used anywhere

        // Query to get user data from the database
        const sql1 = "SELECT * FROM USERS WHERE email = ? AND user_id <> ?";

        cnx.query(sql1, [email, req.params.user_id], async (err, rows) => {

            // If there's an SQL error, throw it
            if (err) throw err;

            // If an user does already exist with the same email, return an error (can't update the user with the same email)
            if (rows.length > 0) {
                res.status(400).send({ success: false, message: "User already exists" });
            } else {

                const sql2 = 'SELECT * FROM USERS WHERE user_id = ?';
                cnx.query(sql2, [req.params.user_id], async (err, rows2) => {
                    // If there's an SQL error, throw it
                    if (err) throw err;

                    // If the password from the db is the same as the one from the request body, update the data
                    if (await bcrypt.compare(password, rows2[0].password)) {

                        // Query to update the user in the database
                        const sql2 = 'UPDATE USERS SET name = ?, surname = ?, email = ? WHERE user_id = ?';

                        // Updates the user in the db
                        cnx.query(sql2, [name, surname, email, req.params.user_id], (err, rows) => {

                            // If there's an SQL error, return it
                            if (err) throw err;

                            // If the user is updated, return the user data
                            res.send({
                                name: name,
                                surname: surname,
                                email: email,
                                success: true,
                                message: 'User updated'
                            })
                        });

                    } else {
                        // If the password from the db is different from the one from the request body, return an error
                        res.status(400).send({ success: false, message: "Password is different" });

                    }

                });
            }
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

//To delete users
app.delete('/user/:user_id', (req, res) => {
    try {
        // Query to select the user from the database
        const sql1 = 'SELECT * FROM USERS WHERE user_id = ?';

        // Gets the password from the request body
        const { password } = req.body;

        // Selects the user from the db
        cnx.query(sql1, [req.params.user_id], async (err, rows) => {

            // If there's an SQL error, throw it
            if (err) throw err;

            // If the user exists
            if (rows.length > 0) {

                // If the password from the db is the same as the one from the request body
                if (await bcrypt.compare(password, rows[0].password)) {

                    // Query to delete the user from the database
                    const sql = 'DELETE FROM USERS WHERE user_id = ?';

                    // Deletes the user from the db
                    cnx.query(sql, [req.params.user_id], (err, rows) => {

                        // If there's an SQL error, throw it
                        if (err) throw err;

                        // If the user is deleted, return a success message
                        res.send({
                            success: true,
                            message: 'User deleted'
                        })
                    });
                } else {
                    // If the password from the db is different from the one from the request body, return an error
                    res.status(400).send({ success: false, message: "Wrong Password" });
                }
            } else {
                res.status(404).send({ success: false, message: "User does not exist" });
            }

        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To get all tiers
app.get('/prices', async (req, res) => {
    try {
        // Query to get all tiers from the database
        const sql = 'SELECT * FROM TIERS';
        // Gets all tiers from the db
        cnx.query(sql, (err, rows) => {

            // If there's an SQL error, throw it
            if (err) throw err;

            if (rows.length > 0) {
                // If there are tiers, return them
                res.send(rows);
            } else {
                // If there aren't tiers, return an error
                res.status(404).send({ success: false, message: "No tiers found" });
            }
        });
    } catch (error) {
        // If there's an error, return it
        res.status(500).send({ error: error.message });
    }
})

//Update prices
app.put('/prices', (req, res) => {
    try {
        const { tier_id, min_distance, max_distance, price } = req.body;
        const sql1 = "SELECT * FROM TIERS WHERE tier_id = ?";
        cnx.query(sql1, [tier_id], (err, rows) => {
            if (err) throw (err);
            if (rows.length > 0) {
                const sql = 'UPDATE TIERS SET min_distance = ?, max_distance = ?, price = ? WHERE tier_id = ?';
                cnx.query(sql, [min_distance, max_distance, price, tier_id], (err, rows) => {
                        if (err) throw err;
                        res.send({
                            success: true,
                            message: 'Price updated'
                        })
                    }
                );
            } else {
                const sql2 = 'INSERT INTO TIERS (tier_id, min_distance, max_distance, price) VALUES (?, ?, ?, ?)';
                cnx.query(sql2, [tier_id, min_distance, max_distance, price], (err, rows) => {
                        if (err) throw err;
                        res.send({
                            success: true,
                            message: 'Price created'
                        })
                    }
                );
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// To delete prices
app.delete('/prices/:tier_id', (req, res) => {
    try {
        // Query to get the tier from the database
        const sql1 = "SELECT * FROM TIERS WHERE tier_id = ?";
        // Gets the tier from the db
        cnx.query(sql1, [req.params.tier_id], (err, rows) => {

            // If there's an SQL error, throw it
            if (err) throw (err);

            // If that tier exists
            if (rows.length > 0) {

                // Query to delete the tier from the datsqlabase
                const sql2 = 'DELETE FROM TIERS WHERE tier_id = ?';
                // Deletes the tier from the db
                cnx.query(sql2, [req.params.tier_id], (err, rows) => {

                    // If there's an SQL error, throw it
                    if (err) throw err;

                    // If the tier is deleted, return a success message
                    res.send({
                        success: true,
                        message: 'Price deleted'
                    })
                });

            } else {
                // If the tier does not exist, return an error
                res.status(404).send({ success: false, message: "Tier does not exist" });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To add an address - Returns address id
app.post('/address', (req, res) => {
    try {
        // Gets the address from the request body
        const {CP, city, street, other, lat, lng} = req.body;

        // Query to insert the address into the database
        const sql = 'INSERT INTO ADDRESS (CP, city, street, other, lat, lng) VALUES (?, ?, ?, ?, ?, ?)';
        // Inserts the address into the db
        cnx.query(sql, [CP, city, street, other, lat, lng], (err, result) => {

            // If there's an SQL error, throw it
            if (err) throw err;

            // If the address is inserted, return a success message
            res.send({
                address_id: result.insertId,
                success: true,
                message: 'Address created'
            })
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To get an address
app.get('/address', (req, res) => {
    try {
        const { address_id, CP, city, street, other } = req.body;
        const params = ['address_id', 'CP', 'city', 'street', 'other'];
        //const sql = 'SELECT * FROM ADDRESS WHERE address_id = ? OR CP = ? OR city = ? OR street = ? OR other = ?';
        let sql = 'SELECT * FROM ADDRESS WHERE ';
        let i = 0;
        let valid_params = []
        params.forEach(param => {
            if (req.body[param] !== undefined) {
                valid_params.push(req.body[param]);
                if (i === 0) {
                    sql += param + ' = ?';
                } else {
                    sql += ' AND ' + param + ' = ?';
                }
                i++;
            }
        });

        cnx.query(sql, valid_params, (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
        );
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To delete an address
app.delete('/address/:address_id', (req, res) => {
    try {
        const sql = 'DELETE FROM ADDRESSES WHERE address_id = ?';
        cnx.query(sql, [req.params.address_id], (err, result) => {
            if (err) throw err;
            res.send({
                success: true,
                message: 'Address deleted'
            })
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To add personal info - Returns info id
app.post('/info', (req, res) => {
    try {
        const { name, surname, phone, email } = req.body;
        const sql = 'INSERT INTO PERSONAL_INFO (name, surname, phone, email) VALUES (?, ?, ?, ?)';
        cnx.query(sql, [name, surname, phone, email], (err, result) => {
            if (err) throw err;
            res.send({
                info_id: result.insertId,
                success: true,
                message: 'Info created'
            })
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To get info 
app.get('/info', (req, res) => {
    try {
        const { info_id, name, surname, phone, email } = req.body;
        const params = ['info_id', 'name', 'surname', 'phone', 'email'];
        //const sql = 'SELECT * FROM PERSONAL_INFO WHERE info_id = ? OR name = ? OR surname = ? OR phone = ? OR email = ?';
        let sql = 'SELECT * FROM PERSONAL_INFO WHERE ';
        let i = 0;
        let valid_params = []
        params.forEach(param => {
            if (req.body[param] !== undefined) {
                valid_params.push(req.body[param]);
                if (i === 0) {
                    sql += param + ' = ?';
                } else {
                    sql += ' AND ' + param + ' = ?';
                }
                i++;
            }
        });
        cnx.query(sql, valid_params, (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
        );
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To add orders
app.put('/orders', (req, res) => {
    try {
        const { user_id, origin_info_id, destiny_info_id, tier_id, date_creation, date_arrival, order_status, comments } = req.body;
        const sql = 'INSERT INTO ORDERS (user_id, origin_info_id, destiny_info_id, tier_id, date_creation, date_arrival, order_status, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        cnx.query(sql, [user_id, origin_info_id, destiny_info_id, tier_id, date_creation, date_arrival, order_status, comments], (err, result) => {
            if (err) throw err;
            res.send({
                order_id: result.insertId,
                success: true,
                message: 'Order created'
            })
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To update orders
app.put('/orders/:order_id', (req, res) => {

    try {
        const { user_id, origin_info_id, destiny_info_id, tier_id, date_creation, date_arrival, order_status, comments } = req.body;
        const sql = 'UPDATE ORDERS SET user_id = ?, origin_info_id = ?, destiny_info_id = ?, tier_id = ?, date_creation = ?, date_arrival = ?, order_status = ?, comments = ? WHERE order_id = ?';
        cnx.query(sql, [user_id, origin_info_id, destiny_info_id, tier_id, date_creation, date_arrival, order_status, comments, req.params.order_id], (err, result) => {
            if (err) throw err;
            res.send({
                success: true,
                message: 'Order updated'
            })
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To get orders from user -- Replace user_id with param + create new one with order_id
app.get('/orders/:user_id', (req, res) => {
    try {
        const sql = 'SELECT * FROM ORDERS WHERE user_id = ?';
        cnx.query(sql, [req.params.user_id], (err, rows) => {
            if (err) throw err;
            res.send(rows);
        }
        );
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/**
 * To get the info of an order
 * 
 * Body format: {order_id: num | undefined, user_id: num | undefined}
 * 
 * Response: De momento nada 
 */
app.get('/orders', (req, res) => {
    try {
        const { order_id, user_id } = req.body;
        const params = ['order_id', 'user_id'];
        // const sql = 'SELECT * FROM ORDERS WHERE order_id = ? OR user_id = ?';
        let sql = 'SELECT * FROM ORDERS WHERE ';
        let i = 0;
        let valid_params = []
        params.forEach(param => {
            if (req.body[param] !== undefined) {
                valid_params.push(req.body[param]);
                if (i === 0) {
                    sql += param + ' = ?';
                } else {
                    sql += ' AND ' + param + ' = ?';
                }
                // TODO TERMINAR ESTO carlos
                i++;
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// To get the cost of the order 
/*
app.post('/getOrderCost', async (req, res) => {

    try {

        //!* Step 2: Save destination (POST /addresses) ⇒ returns destination_addressId
        await axios({
            method: "POST",
            url: `localhost:${PORT}/addresses`,
            contentType: "application/json",
            data: {
                // TODO Add the data here
            }
        }).then((response) => {
            destination_addressId = response.address_id;
        }).catch((error) => {
            console.log(error);
        });

        //!* Step 3: Save origin_info (POST /info) ⇒ returns origin_infoId
        await axios({
            method: "POST",
            url: `localhost:${PORT}/info`,
            contentType: "application/json",
            data: {
                // TODO Add the data here
            }
        }).then((response) => {
            origin_infoId = response.info_id;
        }).catch((error) => {
            console.log(error);
        });

        //!* Step 4: Save destination_info (POST /info) ⇒ returns destination_infoId
        await axios({
            method: "POST",
            url: `localhost:${PORT}/info`,
            contentType: "application/json",
            data: {
                // TODO Add the data here
            }
        }).then((response) => {
            destination_infoId = response.info_id;
        }).catch((error) => {
            console.log(error);
        });


        //!* Step 5: Get distance between origin and dest ⇒ returns distanceKm
        // TODO Create ENDPOINT
        distanceKm = 26; // TODO Delete this, this is just for testing

        //!*  Step 6: Get tier based on distance and calculate price ⇒ returns tierData
        /!**
         * 1. Gets the tier with max_distance = null, which is the highest tier
         * 2. Once it has found it, checks if the distance is
         * higher than the min_distance of that top tier
         * 3. If it is, returns tierData with the info from that tier
         * 4. If it isn't, it searches for the right tier
         * 5. Once it has found it, returns tierData with the info from that tier
         *
         * tierData format:
         * { tier_id: num, tier_name: string, min_distance: num, max_distance: num, totalCost: num}
         *!/
        try {

            // Query to get from the database the row with max_distance = null
            const sql = 'SELECT * FROM TIERS WHERE ISNULL(max_distance)';

            cnx.query(sql, (err, rows) => {
                if (err) throw err;

                // If any tier has no max distance, then it is the default one
                // If any tier without max distance is not found, throw an error
                if (rows.length > 0) {

                    // If there is a tier with no max distance, then we just return the one where max is null
                    if (distanceKm > rows[0].min_distance) {
                        tierData = {
                            tier_id: rows[0].tier_id,
                            min_distance: rows[0].min_distance,
                            max_distance: rows[0].max_distance,
                            totalCost: rows[0].price * distanceKm
                        }

                    } else {
                        // If the distance is not greater than the highest min distance do this

                        // Query to get from the database with the correct distance
                        const sql2 = 'SELECT * FROM TIERS WHERE ? BETWEEN min_distance AND max_distance';
                        // Gets the tier with the correct distance
                        cnx.query(sql2, [distanceKm], (err, rows) => {

                            // If there's an SQL error, throw it
                            if (err) throw err;

                            // If there's no tier found, throw an error
                            if (rows.length > 0) {
                                tierData = {
                                    tier_id: rows[0].tier_id,
                                    min_distance: rows[0].min_distance,
                                    max_distance: rows[0].max_distance,
                                    totalCost: rows[0].price * distanceKm
                                }
                            } else {
                                res.status(500).send({
                                    success: false,
                                    message: 'No tier found'
                                })
                            }
                        });
                    }
                } else {
                    res.status(500).send({
                        success: false,
                        message: 'No tier found'
                    })
                }

            });

        } catch (error) {
            res.status(500).send({error: error.message});
        }

        //!* Step 7: Save order and distance in db ⇒ return orderId
        await axios({
            method: 'PUT',
            url: 'localhost:${PORT}/orders',
            contentType: "application/json",
            data: {
                // TODO Add the data here
            }
        }).then((response) => {
            console.log(response);
            orderId = response.data.order_id;
        }).catch((error) => {
            console.log(error);
        });


        //!* Step 8: Send order_id, price, distance and tier to client

        res.status(200).send({
            success: true,
            message: 'Order created successfully',
            data: {
                order_id: orderId,
                price: tierData.totalCost,
                distance: distanceKm,
                tier: tierData.tier_name
            }
        });


    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})
*/


/**
 * To get the payment link
 * 
 * Body format: {price: num, tier: "String"}
 * 
 * Response: {sucess: true, url: String}
 * 
 * ! This endpoint MUST NOT be used by the client, only by the server
 */
app.post('/pay', async (req, res) => {

    try {
        // Gets the price from the request body
        let clientPrice = req.body.price;
        const tier = req.body.tier;

        // If there isn't a price, return an error
        if (!clientPrice) {
            return res.status(400).send({
                error: 'Price is required'
            });
        }

        // If price is lower than 0, return an error
        if (clientPrice < 0) {
            return res.status(400).send({
                error: 'Price must be greater than 0'
            });
        }

        // If price is lower than 50, make it 50 (minimum price required by stripe)
        if (clientPrice < 50) {
            clientPrice = 50;
        }


        // Creates a new product with the price
        const product = await stripe.products.create({
            name: 'Envio estandar',
            description: `El precio viene definido por el peso y la distancia, por lo que puede variar en función de la zona de destino. | El precio de este envío es de \n${clientPrice / 100}€ | Tier: ${tier}`
        });

        // Creates a new price with the product
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: clientPrice,
            currency: 'eur',
        });

        // Create a checkout session with the product and its price
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'sepa_debit'],
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        // Send the session id to the client
        res.status(200).send({
            success: true,
            url: session.url
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

});

//Port forwarding
app.listen(PORT, () => {
    console.log(`SendIT Server running on port ${PORT}`)
})
