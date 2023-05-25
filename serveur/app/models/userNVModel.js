const sql = require("./db.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// constructor
const UserNV = function (userNV) {
    this.nom = userNV.nom;
    this.prenom = userNV.prenom;
    this.ddn = userNV.ddn;
    this.numCartCIN = userNV.numCartCIN;
    this.role = userNV.role;
    this.departement = userNV.departement;
    this.login = userNV.login;
    this.mot_de_passe = userNV.mot_de_passe;
    this.valider = userNV.valider;
};

UserNV.getAll = ([], result) => {
    let query = "SELECT * FROM utilisateur_nv ORDER BY id";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("liste de utilisateu non valider : ", res);
        result(null, res);
    });
};

UserNV.create = async (newUserNV, result) => {
    let userNV = newUserNV;
    console.log(userNV);
    const hashedPassword = await bcrypt.hashSync(userNV.mot_de_passe, 10);
    console.log(hashedPassword);


    sql.query("INSERT INTO utilisateur_nv SET ?", newUserNV, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {

            sql.query("select id fom utilisateur_nv where login=?", userNV.login, (err, res) => {
                if (!err) {
                    console.log(res.id)
                    // const token = jwt.sign({ email: login, id: res }, 'secret-key');
                    // res.status(200).send({ token });
                } else throw err

            }
            )

            console.log("created utilisateur: ", { id: res.insertId, ...newUserNV });
            result(null, { id: res.insertId, ...newUserNV });
        }
    });
};

UserNV.findById = (id, result) => {
    sql.query(`SELECT * FROM utilisateur_nv WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found author with the id
        result({ kind: "not_found" }, null);
    });
};

// UserNV.updateById = (id, author, result) => {
//     sql.query(
//         "UPDATE authors " +
//         "SET authorName = ?, birthDate = ?, deathDate = ?, isInspector = ? " +
//         "WHERE id = ?",
//         [
//             author.authorName,
//             author.birthDate,
//             author.deathDate,
//             author.isInspector,
//             id,
//         ],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found author with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated author: ", { id: id, ...author });
//             result(null, { id: id, ...author });
//         }
//     );
// };

UserNV.remove = (id, result) => {
    sql.query("DELETE FROM utilisateur_nv WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found author with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};





module.exports = UserNV;
