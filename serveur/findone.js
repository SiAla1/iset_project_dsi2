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



module.exports = UserNV;