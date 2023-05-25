const sql = require("./db.js");

// constructor
const UserV = function (user) {
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.ddn = user.ddn;
    this.numCartCIN = user.numCartCIN;
    this.role = user.role;
    this.departement = user.departement;
    this.login = user.login;
    this.mot_de_passe = user.mot_de_passe;
    //this.valider = user.valider;
};

UserV.getAll = ([], result) => {
    let query = "SELECT * FROM utilisateur_v ORDER BY id";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("utilisateu non valider : ", res);
        result(null, res);
    });
};

UserV.create = (newUserV, result) => {
    sql.query("INSERT INTO utilisateur_v SET ?", newUserV, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created utilisateur: ", { id: res.insertId, ...newUserV });
        result(null, { id: res.insertId, ...newUserV });
    });
};

UserV.findById = (id, result) => {
    sql.query(`SELECT * FROM utilisateur_v WHERE id = ${id}`, (err, res) => {
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

// UserV.updateById = (id, author, result) => {
//     sql.query(
//         "UPDATE utilisateur_v " +
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

UserV.remove = (id, result) => {
    sql.query("DELETE FROM utilisateur_v WHERE id = ?", id, (err, res) => {
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

module.exports = UserV;
