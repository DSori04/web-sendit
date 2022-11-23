import express from 'express'
import mysql from 'mysql'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const app = express()
const port = 3170
const cnx = mysql.createConnection(process.env.FULL_URL)
app.use(express.json())

cnx.connect();

//For Login - Returns user data
app.post('/user', async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    try {
        let { email, password } = req.body;
        const dbpassword = await bcrypt.hash("123", salt);
        const sql = 'SELECT * FROM USERS WHERE email = ?';
        const resp = cnx.query(sql, [email]);
        console.log(rows, fields);
        res.send(rows);
        if (rows.length > 0) {
            res.send(rows);
            password = await bcrypt.hash(password, salt);
            if (await bcrypt.compare(password, rows[0].password)) {
                res.send({
                    success: true,
                    message: 'User logged in successfully',
                    user_id: rows[0].user_id,
                    email: rows[0].email,
                    name: rows[0].name,
                    surname: rows[0].surname,
                });
            } else {
                res.status(404).send({ success: false, message: "Incorrect password" });
            }
        } else {
            res.send("No user found");
        }
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

//To create users
app.put('/user', async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    try {
        let { name, surname, mail, password } = req.body;
        const sql1 = 'SELECT * FROM USERS WHERE email = ?';
        const hashedpw = await bcrypt.hash(password, salt);
        cnx.query(sql1, [mail], (err, rows) => {
            if (err) {
                res.status(404).send({ error: err.message });
            } else {
                if (rows.length > 0) {
                    res.status(404).send({ success: false, message: "User already exists" });
                    return
                } else {
                    const sql2 = 'INSERT INTO USERS (name, surname, email, password) VALUES (?, ?, ?, ?)';
                    cnx.query(sql2, [name, surname, mail, hashedpw], (err, result) => {
                        if (err) throw err;
                        res.send({
                            name: name,
                            surname: surname,
                            mail: mail,
                            success: true,
                            message: 'User created'
                        })
                    });
                }
            }
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

//To update users
app.put('/user/:user_id', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        let { name, surname, email, password } = req.body;
        const hashedpw = await bcrypt.hash(password, salt);
        const sql = "SELECT * FROM USERS WHERE email = ? AND user_id != ?";
        cnx.query(sql, [email, req.params.user_id], async (err, rows) => {
            if (err) {
                res.status(404).send({ error: err.message });
            } else {
                if (rows.length > 0) {
                    res.status(404).send({ success: false, message: "User already exists" });
                    return 0;
                } else {
                    const sql1 = 'SELECT * FROM USERS WHERE user_id = ?';
                    cnx.query(sql1, [req.params.user_id], async (err, rows2) => {
                        if (err) { 
                            res.status(404).send({ error: err.message });
                        } else {
                            if (await bcrypt.compare(password, rows2[0].password)){                                
                                const sql2 = 'UPDATE USERS SET name = ?, surname = ?, email = ? WHERE user_id = ?';
                                cnx.query(sql2, [name, surname, email, req.params.user_id], (err, result) => {
                                    if (err) throw err;
                                    res.send({
                                        name: name,
                                        surname: surname,
                                        email: email,
                                        success: true,
                                        message: 'User updated'
                                    })
                                });
                            } else{
                                res.send({success: false, message: "Password is different"});
                            }
                        }
                    });
                }
            }
        });
        
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

//To delete users
app.delete('/user/:user_id', (req, res) => {
    try {
        const sql1 = 'SELECT * FROM USERS WHERE user_id = ?';
        const { password } = req.body;
        cnx.query(sql1, [req.params.user_id], async (err, rows) => {
            if (err) {
                res.status(404).send({ error: err.message });
            } else {
                if (rows.length > 0) {
                    if (await bcrypt.compare(password, rows[0].password)) {

                        const sql = 'DELETE FROM USERS WHERE user_id = ?';
                        cnx.query(sql, [req.params.user_id], (err, result) => {
                            if (err) throw err;
                            res.send({
                                success: true,
                                message: 'User deleted'
                            })
                        });
                    } else {
                        res.send({ success: false, message: "Wrong Password" });
                    }
                } else {
                    res.status(404).send({ success: false, message: "User does not exist" });
                }
            }
        });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

app.get('/prices', async (req, res) => {
    try {
        const sql = 'SELECT * FROM TIERS';
        cnx.query(sql, (err, rows) => {
            if (err) throw err;
            res.send(rows);
        });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

//Update prices
app.put('/prices', (req, res) => {
    try {
        const { tier_id, min_distance, max_distance, price} = req.body;
        const sql1 = "SELECT * FROM TIERS WHERE tier_id = ?";
        cnx.query(sql1, [tier_id], (err, rows) => {
            if (err) throw (err);
            if (rows.length > 0) {
                const sql = 'UPDATE TIERS SET min_distance = ?, max_distance = ?, price = ? WHERE tier_id = ?';
                cnx.query(sql, [min_distance, max_distance, price, tier_id], (err, result) => {
                    if (err) throw err;
                    res.send({
                        success: true,
                        message: 'Price updated'
                    })
                }
                );
            } else {
                const sql2 = 'INSERT INTO TIERS (tier_id, min_distance, max_distance, price) VALUES (?, ?, ?, ?)';
                cnx.query(sql2, [tier_id, min_distance, max_distance, price], (err, result) => {
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
        res.status(404).send({ error: error.message });
    }
})

app.delete('/prices/:tier_id', (req, res) => { 
    try{
        const sql = "SELECT * FROM TIERS WHERE tier_id = ?";
        cnx.query(sql, [req.params.tier_id], (err, rows) => {
            if (err) throw (err);
            if (rows.length > 0) {
                const sql1 = 'DELETE FROM TIERS WHERE tier_id = ?';
                cnx.query(sql1, [req.params.tier_id], (err, result) => {
                    if (err) throw err;
                    res.send({
                        success: true,
                        message: 'Price deleted'
                    })
                }
                );
            } else {
                res.send({ success: false, message: "Tier does not exist" });
            }
        });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

//To add an address - Returns address id
app.post('/address', (req, res) => {
    try {
        const { CP, city, street, other } = req.body;
        const sql = 'INSERT INTO ADDRESSES (CP, city, street, other) VALUES (?, ?, ?, ?)';
        cnx.query(sql, [CP, city, street, other], (err, result) => {
            if (err) throw err;
            res.send({
                address_id: result.insertId,
                success: true,
                message: 'Address created'
            })
        });
    } catch (error) {
        res.status(404).send({ error: error.message });
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
            if (req.body[param] != undefined) {
                valid_params.push(req.body[param]);
                if (i == 0) {
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
        res.status(404).send({ error: error.message });
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
        res.status(404).send({ error: error.message });
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
        res.status(404).send({ error: error.message });
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
            if (req.body[param] != undefined) {
                valid_params.push(req.body[param]);
                if (i == 0) {
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
        res.status(404).send({ error: error.message });
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
        res.status(404).send({ error: error.message });
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
        res.status(404).send({ error: error.message });
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
        res.status(404).send({ error: error.message });
    }
})

//To get order by order_id
app.get('/orders', (req, res) => {
    try {
        const { order_id, user_id } = req.body;
    const params = ['order_id', 'user_id'];
    //const sql = 'SELECT * FROM ORDERS WHERE order_id = ? OR user_id = ?';
    let sql = 'SELECT * FROM ORDERS WHERE ';
    let i = 0;
    let valid_params = []
    params.forEach(param => {
        if (req.body[param] != undefined) {
            valid_params.push(req.body[param]);
            if (i == 0) {
                sql += param + ' = ?';
            } else {
                sql += ' AND ' + param + ' = ?';
            }
            i++;
        }
    });
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})
    


//Port forwarding
app.listen(port, () => {
    console.log(`SendIT Server running on port ${port}`)
})
