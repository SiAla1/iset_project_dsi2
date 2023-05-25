import React, { useState } from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import InterfaceAdmin from "./interfaces/admin/admin_interface";
import User from "./interfaces/user/user_interface";
import AdminHome from "./interfaces/admin/adminHome";
import { Login } from "./interfaces/user/Login"
import { Register } from "./interfaces/user/Register";
import Home from './interfaces/user/pageHome';
import AllNV from "./interfaces/admin/allUserNV";
import ReadNV from "./interfaces/admin/readNV"
import Informatique from "./interfaces/user/Informatique";
import Electrique from "./interfaces/user/Electrique";
import Mecanique from "./interfaces/user/meacnique";
import Management from "./interfaces/user/managment";
import Upload from "./interfaces/admin/upload";

function App() {

  return (
    <div className="App">

      <Routes>

        <Route path='/' element={<User />} >
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path='/info' element={<Informatique />} />
          <Route path='/elect' element={<Electrique />} />
          <Route path='/meac' element={<Mecanique />} />
          <Route path='/manage' element={<Management />} />
        </Route>

        <Route path='/adminInterface' element={<InterfaceAdmin />} >
          <Route index element={<AdminHome />} />
          <Route path='/adminInterface/allUserNV' element={<AllNV />} />
          <Route path='/adminInterface/allUserNV/:id' element={< ReadNV />} />
          <Route path='/adminInterface/upload' element={<Upload />} />
        </Route>

      </Routes>

    </div>
  );
}

export default App;
