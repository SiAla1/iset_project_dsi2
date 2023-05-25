import React from 'react';
import { Link } from 'react-router-dom';

function AdminHome() {
    return (
        <div className='admin' >
            <h1>admin page home</h1>
            <div>
                <Link to={"/adminInterface/allUserNV"}>
                    <button>
                        liste des utilisateur non valider
                    </button>
                </Link>
                <br />
                <br />
                <br />
                <Link to={"/allUserV"}>
                    <button>
                        liste des utilisateur valider
                    </button>
                </Link>
                <br />
                <br />
                <br />
                <Link to={"/adminInterface/upload"}>
                    <button>
                        Uploading file
                    </button>
                </Link>
            </div>
        </div>
    );
}
export default AdminHome;