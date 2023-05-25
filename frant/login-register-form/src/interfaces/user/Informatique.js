import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
function Informatique() {
    const params = useParams()
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3100/api/image/info`)
            .then(res => {

                console.log(res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    return (
        <div >
            <h1>page Informatique</h1>

            {users.map((user, index) => (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td >{user.image}</td>
                </tr>

            ))}

        </div>
    );
}
export default Informatique;