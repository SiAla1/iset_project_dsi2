import React, { useState } from 'react';
import axios from 'axios';
// import './App.css';
function Upload() {
    const [departement, setDepartement] = useState('');

    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const handleInputChange = (event) => {
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });
    }
    const [isSucces, setSuccess] = useState(null);
    const submit = async () => {
        const formdata = new FormData();
        formdata.append('avatar', userInfo.file);
        formdata.append('departement', departement); // Add the 'departement' to the form data

        axios.post("http://localhost:3100/imageupload", formdata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(res => {
                console.warn(res);
                if (res.data.success === 1) {
                    setSuccess("Image uploaded successfully");
                }
            })
            .catch(error => {
                console.error(error);
                // Handle error cases if needed
            });
    };

    return (
        <div className="container mr-60">
            <label htmlFor="departement">departement </label>
            <select onChange={(e) => setDepartement(e.target.value)}>
                <option >----------------</option>
                <option value="1">informatique</option>
                <option value="2">geni electrique</option>
                <option value="3">geni mecanique</option>
                <option value="4">management</option>
                <option value="5">geni procedure</option>
            </select>
            {/* <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> codeat21.com </span> </h3> */}

            <div className="formdesign">
                {isSucces !== null ? <h4> {isSucces} </h4> : null}
                <div className="form-row">
                    <label className="text-white">Select Image :</label>
                    <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <button type="submit" className="btn btn-dark" onClick={() => submit()}> Save </button>
                </div>
            </div>

            {userInfo.filepreview !== null ?
                <img
                    //  className="previewimg"
                    src={userInfo.filepreview} alt="UploadImage" />
                : null}
        </div>
    )
}
export default Upload;