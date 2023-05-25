import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.length === 0 || pass.length === 0) {
            setError('Email and password cannot be empty.');
            return;
        }

        const url = "http://localhost:3100/api/login";
        const data = {
            login: email,
            password: pass
        };

        axios.post(url, data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                console.log(res.data.user.departement);

                switch (res.data.user.departement) {
                    case 1:
                        return navigate("/info");
                    case 2:
                        return navigate("/elect");
                    case 3:
                        return navigate("/meca")
                    case 4:
                        return navigate("/manage")
                    default:
                        return null
                };

                // navigate("/home")
                // localStorage.setItem('conn', res.data.conn);


            })
            .catch(error => {
                if (!error.response) {
                    setError('Error: Network Error');
                } else {
                    setError(error.response.data.message);
                }
            });
    };
    // if (localStorage.getItem("token")) {
    //     // return <></>
    //     navigate("/home")

    // } else {
    //     return <></>
    // }
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="*********************************************"
                    id="password"
                    name="password"
                />
                {error && <label className="err">{error}</label>}
                <button type="submit">Log In</button>
            </form>
            <Link className="link-btn" to={"/register"}>
                Don't have an account? Register here.
            </Link>
        </div>
    );
};
