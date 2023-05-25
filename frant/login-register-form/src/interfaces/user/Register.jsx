import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = (props) => {
    const navigate = useNavigate();

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [ddn, setDdn] = useState('');
    const [numCartEtu, setNumCartEtu] = useState('');
    const [role, setRole] = useState('');
    const [departement, setDepartement] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {

        let errorStatus = ''
        const url = "http://localhost:3100/api/register"

        e.preventDefault();
        console.log(email);
        const data = {
            nom: nom,
            prenom: prenom,
            ddn: ddn,
            numCartCIN: numCartEtu,
            role: role,
            departement: departement,
            valider: "F",
            login: email,
            mot_de_passe: pass
        }
        axios.post(url, data).then(res => {
            console.log("res data", res.data)
            navigate("/")
        }).catch(error => {
            if (!error.response) {
                // network error
                errorStatus = 'Error: Network Error';
            } else {
                errorStatus = error.response.data.message;

            }
        })
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit} >

                <label htmlFor="nom">nom</label>
                <input value={nom} name="nom" onChange={(e) => setNom(e.target.value)} id="Nom" placeholder="Nom" />

                <label htmlFor="name">prenom</label>
                <input value={prenom} name="prenom" onChange={(e) => setPrenom(e.target.value)} id="prenom" placeholder="Prenom" />

                <label htmlFor="ddn">Date de naissance</label>
                <input value={ddn} name="ddn" onChange={(e) => setDdn(e.target.value)} id="ddn" placeholder="Date de naissance" type="date" />

                <label htmlFor="numCartEtu">Numéro  CIN</label>
                <input value={numCartEtu} name="numCartEtu" onChange={(e) => setNumCartEtu(e.target.value)} id="numCartEtu" placeholder="numero carte etudiant" type="text" />


                <label htmlFor="role">Role </label>
                <select onChange={(e) => setRole(e.target.value)}>
                    <option >----------------</option>
                    <option value="1">chef departement</option>
                    <option value="2">etudiant</option>
                </select>

                <label htmlFor="departement">departement </label>
                <select onChange={(e) => setDepartement(e.target.value)}>
                    <option >----------------</option>
                    <option value="1">informatique</option>
                    <option value="2">geni electrique</option>
                    <option value="3">geni mecanique</option>
                    <option value="4">management</option>
                    <option value="5">geni procedure</option>
                </select>

                {/* <input value={nomClass} name="nomClass" onChange={(e) => setNomClass(e.target.value)} id="nomClass" placeholder="nom de la classe" type="text" /> */}


                <label htmlFor="email">login</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********************************************" id="password" name="password" />

                <button type="submit">Log In</button>
            </form>
            <Link className="link-btn" to={"/"}>Already have an account? Login here.</Link>
        </div>
    )
}
