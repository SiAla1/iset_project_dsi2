const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require("cors");
// const express = require('express')
// const app = express();
const path = require('path');
// const cors = require('cors');
const multer = require('multer');


// Create a MySQL connection pool
const pool = mysql.createPool({
    // connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_iset'
});

// Create a new Express application
const app = express();

var corsOptions = {
    // origin: "http://localhost:4200",
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Define a login endpoint
app.post('/api/register', (req, res) => {
    const { nom, prenom, ddn, numCartCIN, role, departement, login, mot_de_passe } = req.body;
    console.log(mot_de_passe);
    const hashedPassword = bcrypt.hashSync(mot_de_passe, 10);
    console.log(hashedPassword);
    const sql = 'INSERT INTO utilisateur_nv (nom, prenom,ddn,numCartCIN,role,departement,login,mot_de_passe) VALUES (?,?,?,?,?,?,?,?)';
    pool.query(sql, [nom, prenom, ddn, numCartCIN, role, departement, login, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error registering user');
        } else {
            const token = jwt.sign({ login }, 'secret-key');
            res.status(200).send({ token });
        }
    });
});

app.get('/api/etudiant', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'secret-key', (err, decoded) => {
            if (err) {
                res.status(401).send('Invalid token');
            } else {
                pool.query("SELECT * FROM utilisateur_nv", function (err, result, fields) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send(result)
                    }
                });
            }

        });
    }
});

app.get('/api/getAllUser', (req, res) => {
    let query = "SELECT * FROM utilisateur_nv ORDER BY id";

    pool.query(query, (err, data) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        } else {
            console.log("Liste des utilisateurs : ", data);
            res.send(data);
        }
    });
});

app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;
    const sql = 'SELECT * FROM utilisateur_nv WHERE login = ?';
    await pool.query(sql, [login], (err, result) => {
        console.log(result);
        if (err) {
            res.status(500).send('Error logging in');
        }
        else if (result.length == 0) {
            res.status(401).send('Invalid login or password');
        } else {
            const user = result[0];
            console.log(user.mot_de_passe)
            console.log(password)

            if (bcrypt.compareSync(password, user.mot_de_passe)) {
                const conn = true
                const token = jwt.sign({ login }, 'secret-key');
                res.status(200).send({ token, user });
                // res.status(200).send(user)

            } else {
                res.status(401).send('Invalid  password');
            }
        }
    })
});


app.get("/api/UserNV/:id", (req, res) => {
    const { id } = req.params; // Access the id from req.params instead of req.body

    pool.query(`SELECT * FROM utilisateur_nv WHERE id = ${id}`, (err, result) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: "Error retrieving user with id " + id,
            });
            return;
        }

        if (result.length) {
            console.log("found user: ", result[0]);
            res.send(result[0]);
            return;
        }

        // Not found user with the id
        res.status(404).send({
            message: `Not found user with id ${id}.`,
        });
    });
});

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public_html/', 'uploads'),
    filename: function (req, file, cb) {
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname)
    }
})

app.post('/imageupload', async (req, res) => {

    try {

        // 'avatar' is the name of our file input field in the HTML form
        let upload = multer({ storage: storage }).single('avatar');

        upload(req, res, function (err) {
            // const classifiedsadd = {
            //     image: req.file.filename,
            //     departement: req.body.departement // Add 'departement' from the request body
            // };
            // req.file contains information of uploaded file
            // req.body contains information of text fields

            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            const classifiedsadd = {
                image: req.file.filename,
                departement: req.body.departement
            };

            const sql = "INSERT INTO users SET ?";
            pool.query(sql, classifiedsadd, (err, results) => {
                if (err) throw err;
                res.json({ success: 1 })

            });
        });
    } catch (err) { console.log(err) }
});

app.get("/api/image/info", (req, res) => {
    // const { departement } = req.params; // Access the id from req.params instead of req.body

    pool.query(`SELECT * FROM users WHERE departement =1`, (err, result) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: "Error retrieving user with departement 1",
            });
            return;
        }

        if (result.length) {
            console.log("found user: ", result);
            res.send(result);
            return;
        }

        // Not found user with the id
        res.status(404).send({
            message: `Not found user with id 1.`,
        });
    });
});


// Start the server
app.listen(3100, () => {
    console.log('Server started on port 3100');
});