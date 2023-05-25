import React, { useState, useEffect } from "react";
import axios from "axios";
import './allUserNV.css'
import { Link } from "react-router-dom";


function ReadNV() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3100/api/getAllUser')
            .then(res => {

                console.log(res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    return (
        <div>
            <h1>Liste des utilisateur non valilider </h1>
            <div >
                <table >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>nom </th>
                            <th>prenom</th>
                            <th>action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td >{user.nom}</td>
                                <td >{user.prenom}</td>
                                <td>
                                    <Link className="btn btn-sm btn-warning" to={`/adminInterface/allUserNV/${user.id}`}> <button >Read more</button></Link>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default ReadNV;