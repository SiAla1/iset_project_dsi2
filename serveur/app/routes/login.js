module.exports = (app) => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');
    const mysql = require('mysql');
    const bcrypt = require('bcryptjs');
    const sql = require("../models/db");
    app.post('/api/login', async (req, res) => {

        const { login, password } = req.body;
        console.log("login:", login)
        console.log("password:", password)

        //const passwordNonCrypte
        //const sk = 'SELECT * FROM utilisateur_nv WHERE login = ?';
        await sql.execute('SELECT * FROM `utilisateur_nv ` WHERE` login` = ?', login, (err, result) => {
            console.log("err:", err);
            if (err) {
                res.status(500).send('Error logging in');
            }
            else if (result.length == 0) {
                res.status(401).send('Invalid login or password');
                //console.log(res.status(401).send('Invalid login or password'))
            } else {
                const user = result[0];

                if (password == user.password) {
                    const conn = true
                    const token = jwt.sign({ login }, 'secret-key');
                    res.status(200).send({ token, conn });
                    // res.status(200).send({ "conn": true });

                } else {
                    res.status(401).send('Invalid  password');
                }
            }
        })
    });

};
